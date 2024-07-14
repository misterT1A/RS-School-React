import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import SearchBlock from '../../Components/search-block/SearchBlock';

describe('SearchBlock', () => {
  const setup = (): {
    searchParams: URLSearchParams;
    setSearchParams: jest.Mock;
    setValueLS: jest.Mock;
  } => {
    const searchParams = new URLSearchParams();
    const setSearchParams = jest.fn();
    const setValueLS = jest.fn();

    render(
      <MemoryRouter>
        <SearchBlock searchParams={searchParams} setSearchParams={setSearchParams} setValueLS={setValueLS} />
      </MemoryRouter>,
    );

    return {
      searchParams,
      setSearchParams,
      setValueLS,
    };
  };

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

  it('calls setSearchParams and setValueLS on form submit and saves the entered value to the local storage', async () => {
    const { setSearchParams, setValueLS } = setup();
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    const form = screen.getByRole('search');

    await userEvent.type(input, 'test query');
    fireEvent.submit(form);

    expect(setValueLS).toHaveBeenCalledWith(expect.any(Function));
    expect(setSearchParams).toHaveBeenCalledTimes(1);
  });
});
