import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ResultList from '../../Components/result-list/Result-list';
import '@testing-library/jest-dom';

describe('ResultList', () => {
  const TestProduct = {
    id: 'test',
    climate: 'test',
    created: 'test',
    diameter: 'test',
    edited: 'test',
    films: ['test', 'test'],
    gravity: 'test',
    name: 'test',
    orbital_period: 'test',
    population: 'test',
    residents: ['test', 'test'],
    rotation_period: 'test',
    surface_water: 'test',
    terrain: 'test',
    url: '',
  };

  const TestProduct1 = {
    ...TestProduct,
    url: '/api/planets/1/',
  };
  const TestProduct2 = {
    ...TestProduct,
    url: '/api/planets/2/',
  };

  const mockState = {
    searchValue: '',
    page: 1,
    isLoad: false,
    maxPage: 1,
    data: [TestProduct1, TestProduct2],
  };

  const mockStateProductNoUrl = {
    ...mockState,
    data: [TestProduct1, TestProduct],
  };

  const mockStateNull = {
    ...mockState,
    data: null,
  };

  const mockSearchParams = new URLSearchParams({
    q: 'test',
    page: '1',
  });

  const mockSearchParamsWithoutParam = new URLSearchParams({
    q: '',
    page: '',
  });

  const mockSetIsDetailedVisible = jest.fn();

  it('renders loader when state is loading', () => {
    const { container } = render(
      <ResultList
        state={{ isLoad: true, searchValue: '', page: 1, maxPage: 1, data: [] }}
        searchParams={mockSearchParams}
        isDetailedVisible={false}
        setIsDetailedVisible={jest.fn()}
      />,
    );

    expect(container.querySelector('.loader')).toBeInTheDocument();
  });

  it('renders list items when state data is present', () => {
    render(
      <BrowserRouter>
        <ResultList
          state={mockState}
          searchParams={mockSearchParams}
          isDetailedVisible={false}
          setIsDetailedVisible={jest.fn()}
        />
      </BrowserRouter>,
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockState.data.length);

    const navLinks = screen.getAllByRole('link');
    expect(navLinks).toHaveLength(mockState.data.length);
    navLinks.forEach((link, index) => {
      const expectedTo = `/planets/${index + 1}?q=test&page=1`;
      expect(link.getAttribute('href')).toBe(expectedTo);
    });
  });

  it('renders NavLink with correct "to" attribute', () => {
    render(
      <BrowserRouter>
        <ResultList
          state={mockStateProductNoUrl}
          searchParams={mockSearchParamsWithoutParam}
          isDetailedVisible={false}
          setIsDetailedVisible={mockSetIsDetailedVisible}
        />
      </BrowserRouter>,
    );

    const items = screen.getAllByRole('link');
    expect(items.length).toBe(2);

    expect(items[0]).toHaveAttribute('href', '/planets/1?q=&page=1');
    expect(items[1]).toHaveAttribute('href', '/planets/?q=&page=1');
  });

  it('renders list with correct class when isDetailedVisible is true', () => {
    render(
      <BrowserRouter>
        <ResultList
          state={mockState}
          searchParams={mockSearchParams}
          isDetailedVisible
          setIsDetailedVisible={mockSetIsDetailedVisible}
        />
      </BrowserRouter>,
    );

    const list = screen.getByRole('list');
    expect(list).toHaveClass('list_column');
  });

  it('renders "No results" when state data is empty', () => {
    render(
      <ResultList
        state={mockStateNull}
        searchParams={mockSearchParams}
        isDetailedVisible={false}
        setIsDetailedVisible={jest.fn()}
      />,
    );

    const noResultsText = screen.getByRole('heading', { name: /no results/i });
    expect(noResultsText).toBeInTheDocument();
  });

  it('calls setIsDetailedVisible on item click', () => {
    render(
      <BrowserRouter>
        <ResultList
          state={mockState}
          searchParams={mockSearchParams}
          isDetailedVisible={false}
          setIsDetailedVisible={mockSetIsDetailedVisible}
        />
      </BrowserRouter>,
    );

    const navLinks = screen.getAllByText('test').map((link) => link.closest('a'));

    if (navLinks[0]) {
      fireEvent.click(navLinks[0]);
    }

    expect(mockSetIsDetailedVisible).toHaveBeenCalledWith(true);
  });
});
