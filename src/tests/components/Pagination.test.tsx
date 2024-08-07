// import { fireEvent, render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

// import PaginationBlock from '@/components/result-list/Pagination';
// import createMockRouter from 'mock/createMockRouter';

// import styles from '../../components/result-list/_Result-list.module.scss';

// jest.mock('../../hooks', () => ({
//   useSearchUrl: jest.fn().mockReturnValue({ q: 'test', page: 1 }),
// }));

// describe('PaginationBlock', () => {
//   const mockState = { currentPage: 1, maxPage: 2 };

//   const mockSetState = jest.fn();

//   const mockHandleClickVisible = jest.fn();

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   const setup = () =>
//     render(
//       <RouterContext.Provider value={createMockRouter({})}>
//         <PaginationBlock state={mockState} setState={mockSetState} handleClickVisible={mockHandleClickVisible} />
//       </RouterContext.Provider>,
//     );

//   it('renders correct number of pagination links', () => {
//     setup();

//     const paginationLinks = screen.getAllByRole('link');

//     expect(paginationLinks).toHaveLength(mockState.maxPage);

//     paginationLinks.forEach((link, index) => {
//       expect(link).toHaveTextContent(`${index + 1}`);
//     });
//   });

//   it('generates correct NavLink URLs', () => {
//     setup();

//     const paginationLinks = screen.getAllByRole('link');

//     paginationLinks.forEach((link, index) => {
//       expect(link).toHaveAttribute('href', `/?q=test&page=${index + 1}`);
//     });
//   });

//   it('calls handleStateLoader and handleClickVisible on NavLink click', () => {
//     setup();

//     const paginationLink = screen.getAllByRole('link')[0];

//     fireEvent.click(paginationLink);

//     expect(mockSetState).toHaveBeenCalled();

//     expect(mockHandleClickVisible).toHaveBeenCalled();

//     expect(paginationLink).toHaveAttribute('href', `/?q=test&page=${paginationLink.textContent}`);
//   });

//   it('generates classname for nav link', () => {
//     setup();

//     const paginationLink = screen.getAllByRole('link')[0];
//     const paginationLink2 = screen.getAllByRole('link')[1];
//     expect(paginationLink).toHaveClass(`${styles.pagination_btn} ${styles.active}`);
//     expect(paginationLink2).toHaveClass(styles.pagination_btn);
//   });
// });
