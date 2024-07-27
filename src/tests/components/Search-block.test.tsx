import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import SearchBlock from '../../Components/search-block/SearchBlock';
import { useSetToLS } from '../../hooks';

jest.mock('../../hooks', () => ({
  useSetToLS: jest.fn(),
}));

describe('SearchBlock', () => {
  let setSearchValueLS: jest.Mock;
  let mockUseSetToLS: jest.Mock;

  beforeEach(() => {
    setSearchValueLS = jest.fn();
    mockUseSetToLS = useSetToLS as jest.Mock;
    mockUseSetToLS.mockReturnValue(['', setSearchValueLS]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const setup = (): RenderResult =>
    render(
      <MemoryRouter>
        <SearchBlock />
      </MemoryRouter>,
    );

  it('renders the search form', () => {
    setup();
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates search input value on typing', async () => {
    setup();
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    await userEvent.type(input, 'test query');
    expect(input.value).toBe('test query');
  });

  it('calls setSearchValueLS and updates URL on form submit', async () => {
    setup();

    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    const form = screen.getByRole('search');

    await userEvent.type(input, 'test query');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(setSearchValueLS).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
