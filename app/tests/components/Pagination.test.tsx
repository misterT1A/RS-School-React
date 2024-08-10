import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';

import styles from '../../Components/result-list/_Result-list.module.scss';
import PaginationBlock from '../../Components/result-list/Pagination';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
  useSearchParams: jest.fn().mockReturnValue([new URLSearchParams({ query: 'test', page: '1' })]),
}));

describe('PaginationBlock', () => {
  const navigate = useNavigate();

  const setup = (): RenderResult => render(<PaginationBlock maxPage={2} />);

  it('renders correct number of pagination links', () => {
    setup();

    const paginationLinks = screen.getAllByRole('link');

    expect(paginationLinks).toHaveLength(2);

    paginationLinks.forEach((link, index) => {
      expect(link).toHaveTextContent(`${index + 1}`);
    });
  });

  it('calls handleStateLoader and handleClickVisible on NavLink click', () => {
    setup();

    const paginationLink = screen.getAllByRole('link')[0];

    fireEvent.click(paginationLink);

    expect(navigate).toHaveBeenCalled();
  });

  it('generates classname for nav link', () => {
    setup();

    const paginationLink = screen.getAllByRole('link')[0];
    const paginationLink2 = screen.getAllByRole('link')[1];
    expect(paginationLink).toHaveClass(`${styles.pagination_btn} ${styles.active}`);
    expect(paginationLink2).toHaveClass(styles.pagination_btn);
  });
});
