// import { render, screen, waitFor } from '@testing-library/react';
// import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
// import { type ReactNode } from 'react';
// import '@testing-library/jest-dom';
// import { Provider } from 'react-redux';

// import createMockRouter from 'mock/createMockRouter';
// import mockStore from 'mock/mockStore';

// import { useGetCurrentPlanet } from '../../hooks';

// const TestComponent = (): ReactNode => {
//   const [data, isLoading] = useGetCurrentPlanet('1');

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div>
//       <div>{data?.name}</div>
//     </div>
//   );
// };

// describe('useGetPlanets', () => {
//   it('fetches and displays data', async () => {
//     render(
//       <RouterContext.Provider value={createMockRouter({})}>
//         <Provider store={mockStore}>
//           <TestComponent />
//         </Provider>
//       </RouterContext.Provider>,
//     );

//     expect(screen.getByText('Loading...')).toBeInTheDocument();
//     await waitFor(() => expect(screen.getByText('Tatooine')).toBeInTheDocument());
//   });
// });
