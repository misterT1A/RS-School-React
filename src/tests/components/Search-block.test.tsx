import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import SearchBlock from '@/components/search-block/SearchBlock';

import { useSetToLS } from '../../hooks';

jest.mock('../../hooks', () => ({
  useSetToLS: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ replace: jest.fn() }),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams({ query: 'ta', page: '1' })),
}));

describe('SearchBlock', () => {
  let setSearchValueLS: jest.Mock;
  let mockUseSetToLS: jest.Mock;

  beforeEach(() => {
    setSearchValueLS = jest.fn();
    mockUseSetToLS = useSetToLS as jest.Mock;
    mockUseSetToLS.mockReturnValue(['', setSearchValueLS]);
  });

  const setup = (): RenderResult => render(<SearchBlock />);

  it('renders the search form', () => {
    setup();
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates search input value on typing', async () => {
    setup();
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    await userEvent.type(input, 'test');
    expect(input.value).toBe('tatest');
  });

  it('calls setSearchValueLS and updates URL on form submit', async () => {
    setup();

    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    const form = screen.getByRole('search');

    await userEvent.type(input, 'test');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(setSearchValueLS).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('not calls setSearchValueLS and not updates URL on form submit', async () => {
    setup();

    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    const form = screen.getByRole('search');

    fireEvent.change(input, { target: { value: 'ta' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(setSearchValueLS).toHaveBeenCalledTimes(0);
    });
  });
});
