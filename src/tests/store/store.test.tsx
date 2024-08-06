// import { render, screen, waitFor } from '@testing-library/react';
// import type { ReactNode } from 'react';
// import { Provider } from 'react-redux';
// import '@testing-library/jest-dom';

// import { useGetPlanetsQuery, useGetPlanetQuery, apiSlice } from '../../store/apiSlice';

// import { configureStore, Store, UnknownAction } from '@reduxjs/toolkit';
// import mockStore from 'mock/mockStore';
// import store, { wrapper } from '@/store/store';

// // Пример тестового компонента
// const TestComponent = () => {
//   // Здесь должен быть компонент, который использует Redux store
//   return <div>Planets loaded: test</div>;
// };

// describe('Redux Store', () => {
//   it('should render with the Redux store', async () => {
//     render(
//       <Provider store={store as unknown as Store<unknown, UnknownAction, unknown>}>
//         <TestComponent />
//       </Provider>,
//     );

//     await waitFor(() => expect(screen.getByText('Planets loaded: test')).toBeInTheDocument());
//   });
// });

// // interface IWrapperProps {
// //   children: ReactNode;
// // }

// // const wrapper: React.FC<IWrapperProps> = ({ children }) => (
// //   <Provider store={store as unknown as Store<unknown, UnknownAction, unknown>}>{children}</Provider>
// // );

// // const TestComponent = (): ReactNode => {
// //   const { data: planetsData } = useGetPlanetsQuery({ searchValue: '', pageNumber: 1 });
// //   // const { data: planetData } = useGetPlanetQuery('1');

// //   return (
// //     <div>
// //       {planetsData && <div>Planets loaded: {planetsData.results[0].name}</div>}
// //       {/* {planetData && <div>Planet loaded: {planetData.name}</div>} */}
// //     </div>
// //   );
// // };

// // describe('Redux Store', () => {
// //   it('should fetch and display planets', async () => {
// //     render(<TestComponent />, { wrapper });

// //     await waitFor(() => expect(screen.getByText('Planets loaded: test')).toBeInTheDocument());
// //   });

// //   it('should fetch and display a single planet', async () => {
// //     render(<TestComponent />, { wrapper });

// //     await waitFor(() => expect(screen.getByText('Planet loaded: Tatooine')).toBeInTheDocument());
// //   });
// // });
