// import type { RenderResult } from '@testing-library/react';
// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
// import { Provider } from 'react-redux';

// import '@testing-library/jest-dom';
// import DetailedBlock from '@/components/detailed-block/Detailed-block';
// import createMockRouter from 'mock/createMockRouter';
// import mockStore from 'mock/mockStore';

// import { mockPlanet } from '../../../mock/handlers';
// import { ThemeProvider } from '../../context';
// import { addFavorite } from '../../store/favoriteSlice';
// import type { IPlanet } from '../../types/rootTypes';

// jest.mock('next/router', () => ({
//   useRouter: jest.fn().mockImplementation(() => ({
//     query: { details: '1' },
//     replace: jest.fn(),
//     push: jest.fn(),
//   })),
// }));

// describe('DetailedBlock Component', () => {
//   const handler = jest.fn();
//   const setup = (): RenderResult =>
//     render(
//       <RouterContext.Provider value={createMockRouter({})}>
//         <ThemeProvider>
//           <Provider store={mockStore}>
//             <DetailedBlock handleClickVisible={handler} />
//           </Provider>
//         </ThemeProvider>
//       </RouterContext.Provider>,
//     );

//   it('should display loading indicator', () => {
//     setup();
//     expect(screen.getByTestId('loader')).toBeInTheDocument();
//   });

//   it('should render the component', async () => {
//     setup();
//     await waitFor(() => expect(screen.getByText('name: ------Tatooine')).toBeInTheDocument());
//   });

//   it('renders product details correctly', async () => {
//     setup();
//     const productKeys = Object.keys(mockPlanet).filter((key) => !['residents', 'films', 'url'].includes(key));
//     await waitFor(() =>
//       productKeys.forEach((key) => {
//         const valueElement = screen.getByText(new RegExp(`${key}: ------${mockPlanet[key as keyof IPlanet]}`, 'i'));
//         expect(valueElement).toBeInTheDocument();
//       }),
//     );
//   });

//   it('should add planet to favorites', async () => {
//     setup();
//     await waitFor(() => expect(screen.getByText('name: ------Tatooine')));
//     const favoriteButton = screen.getByRole('button', { name: '☆' });
//     fireEvent.click(favoriteButton);
//     await waitFor(() => expect(favoriteButton).toHaveTextContent('★'));
//   });

//   it('should remove planet from favorites', async () => {
//     mockStore.dispatch(addFavorite(mockPlanet));
//     setup();
//     await waitFor(() => expect(screen.getByText('name: ------Tatooine')));
//     const favoriteButton = screen.getByRole('button', { name: '★' });
//     fireEvent.click(favoriteButton);
//     await waitFor(() => expect(favoriteButton).toHaveTextContent('☆'));
//   });

//   it('should call handleClickVisible on close button click', async () => {
//     setup();
//     await waitFor(() => expect(screen.getByText('name: ------Tatooine')));
//     const closeButton = screen.getByRole('button', { name: 'Close' });
//     fireEvent.click(closeButton);
//     expect(handler).toHaveBeenCalled();
//   });
// });
