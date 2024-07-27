import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import styles from '../../Components/result-list/_Result-list.module.scss';
import PaginationBlock from '../../Components/result-list/Pagination';

describe('PaginationBlock', () => {
  const mockState = { currentPage: 1, maxPage: 2 };

  const mockSetState = jest.fn();
  const mockSearchParams = new URLSearchParams('?q=test&page=1');
  const mockHandleClickVisible = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correct number of pagination links', () => {
    render(
      <MemoryRouter>
        <PaginationBlock
          state={mockState}
          setState={mockSetState}
          searchParams={mockSearchParams}
          handleClickVisible={mockHandleClickVisible}
        />
      </MemoryRouter>,
    );

    const paginationLinks = screen.getAllByRole('link');

    expect(paginationLinks).toHaveLength(mockState.maxPage);

    paginationLinks.forEach((link, index) => {
      expect(link).toHaveTextContent(`${index + 1}`);
    });
  });

  it('generates correct NavLink URLs', () => {
    render(
      <MemoryRouter>
        <PaginationBlock
          state={mockState}
          setState={mockSetState}
          searchParams={mockSearchParams}
          handleClickVisible={mockHandleClickVisible}
        />
      </MemoryRouter>,
    );

    const paginationLinks = screen.getAllByRole('link');

    paginationLinks.forEach((link, index) => {
      expect(link).toHaveAttribute('href', `/?q=${mockSearchParams.get('q')}&page=${index + 1}`);
    });
  });

  it('calls handleStateLoader and handleClickVisible on NavLink click', () => {
    render(
      <MemoryRouter>
        <PaginationBlock
          state={mockState}
          setState={mockSetState}
          searchParams={mockSearchParams}
          handleClickVisible={mockHandleClickVisible}
        />
      </MemoryRouter>,
    );

    const paginationLink = screen.getAllByRole('link')[0];

    fireEvent.click(paginationLink);

    expect(mockSetState).toHaveBeenCalled();

    expect(mockHandleClickVisible).toHaveBeenCalled();

    expect(paginationLink).toHaveAttribute(
      'href',
      `/?q=${mockSearchParams.get('q')}&page=${paginationLink.textContent}`,
    );
  });

  it('generates classname for nav link', () => {
    render(
      <MemoryRouter>
        <PaginationBlock
          state={mockState}
          setState={mockSetState}
          searchParams={mockSearchParams}
          handleClickVisible={mockHandleClickVisible}
        />
      </MemoryRouter>,
    );

    const paginationLink = screen.getAllByRole('link')[0];
    const paginationLink2 = screen.getAllByRole('link')[1];
    expect(paginationLink).toHaveClass(`${styles.pagination_btn} ${styles.active}`);
    expect(paginationLink2).toHaveClass(styles.pagination_btn);
  });
});
