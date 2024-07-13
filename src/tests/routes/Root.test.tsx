// // Root.test.tsx

// // import React from 'react';

// import '@testing-library/jest-dom';

// // import PaginationBlock from '../../Components/result-list/Pagination';
// // import ResultList from '../../Components/result-list/Result-list';
// // import SearchBlock from '../../Components/search-block/SearchBlock';
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';

// import Root from '../../routes/root';
// // // import { fetchDataService } from '../../services/fetchDataService';
// // import Loader from '../../utils/loader/loader';

// // Mock SearchBlock component
// jest.mock('../../Components/search-block/SearchBlock', () => ({
//   __esModule: true,
//   default: jest.fn(() => <div data-testid="mockedSearchBlock">Mocked Search Block</div>),
// }));

// // Mock ResultList component
// jest.mock('../../Components/result-list/Result-list', () => ({
//   __esModule: true,
//   default: jest.fn(() => <div data-testid="mockedResultList">Mocked Result List</div>),
// }));

// // Mock PaginationBlock component
// jest.mock('../../Components/result-list/Pagination', () => ({
//   __esModule: true,
//   default: jest.fn(() => <div data-testid="mockedPaginationBlock">Mocked Pagination Block</div>),
// }));

// // Mock Loader component
// jest.mock('../../utils/loader/loader', () => ({
//   __esModule: true,
//   default: jest.fn(() => <div data-testid="mockedLoader">Mocked Loader</div>),
// }));

// // Mock useSetToLS hook
// jest.mock('../../hooks/useSetToLS', () => ({
//   __esModule: true,
//   default: jest.fn(() => ['', jest.fn()]),
// }));

// // Mock fetchDataService function
// jest.mock('../../services/fetchDataService', () => ({
//   __esModule: true,
//   fetchDataService: jest.fn(() => Promise.resolve({ results: [], count: 0 })),
// }));

// const mockUsedNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: (): jest.Mock => mockUsedNavigate,
//   //   useSearchParams: (): jest.Mock => jest.fn(),
// }));

// describe('Root component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders SearchBlock, ResultList, PaginationBlock, and Loader components', () => {
//     render(
//       <MemoryRouter initialEntries={['/']}>
//         <Root />
//       </MemoryRouter>,
//     );

//     // Ждем, пока данные загрузятся

//     // Проверка наличия SearchBlock
//     expect(screen.getByTestId('searchBlock')).toBeInTheDocument();

//     // Проверка наличия ResultList
//     expect(screen.getByTestId('resultList')).toBeInTheDocument();

//     // Проверка наличия PaginationBlock (или его отсутствия в случае загрузки)
//     if (screen.queryByTestId('paginationBlock')) {
//       expect(screen.getByTestId('paginationBlock')).toBeInTheDocument();
//     }

//     // Проверка наличия Loader при загрузке данных
//     expect(screen.getByTestId('loader')).toBeInTheDocument();
//   });

//   //   test('renders SearchBlock, ResultList, PaginationBlock, and Loader components', () => {
//   //     render(
//   //       <MemoryRouter initialEntries={['/']}>
//   //         <Routes>
//   //           <Route path="/" element={<Root />} />
//   //         </Routes>
//   //       </MemoryRouter>,
//   //     );

//   // expect(SearchBlock).toHaveBeenCalled();
//   // expect(ResultList).toHaveBeenCalled();
//   // expect(PaginationBlock).toHaveBeenCalled();
//   // expect(Loader).toHaveBeenCalled();
//   //   });

//   //   test('fetches data on mount', () => {
//   //     render(<Root />);

//   //     expect(fetchDataService).toHaveBeenCalled();
//   //   });

//   // Add more tests as needed
// });
