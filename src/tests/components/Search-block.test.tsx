// import type { RenderResult } from '@testing-library/react';
// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
// import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

// import SearchBlock from '@/components/search-block/SearchBlock';
// import createMockRouter from 'mock/createMockRouter';

// import { useSearchUrl, useSetToLS } from '../../hooks';

// jest.mock('../../hooks', () => ({
//   useSetToLS: jest.fn(),
//   useSearchUrl: jest.fn(),
// }));

// describe('SearchBlock', () => {
//   let setSearchValueLS: jest.Mock;
//   let mockUseSetToLS: jest.Mock;
//   let mockUseSearchUrl: jest.Mock;

//   beforeEach(() => {
//     setSearchValueLS = jest.fn();
//     mockUseSetToLS = useSetToLS as jest.Mock;
//     mockUseSearchUrl = useSearchUrl as jest.Mock;
//     mockUseSetToLS.mockReturnValue(['', setSearchValueLS]);
//     mockUseSearchUrl.mockReturnValue({ q: 'test', page: 1 });
//   });

//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   const setup = (): RenderResult =>
//     render(
//       <RouterContext.Provider value={createMockRouter({})}>
//         <SearchBlock />
//       </RouterContext.Provider>,
//     );

//   it('renders the search form', () => {
//     setup();
//     expect(screen.getByRole('search')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
//   });

//   it('updates search input value on typing', async () => {
//     setup();
//     const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
//     await userEvent.type(input, 'test');
//     expect(input.value).toBe('testtest');
//   });

//   it('calls setSearchValueLS and updates URL on form submit', async () => {
//     setup();

//     const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
//     const form = screen.getByRole('search');

//     await userEvent.type(input, 'test');
//     fireEvent.submit(form);

//     await waitFor(() => {
//       expect(setSearchValueLS).toHaveBeenCalledWith(expect.any(Function));
//     });
//   });
// });
