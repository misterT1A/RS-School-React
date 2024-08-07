// import { act, render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Router from 'next/router';

// import Wrapper from '@/store/pages/wrapper';

// jest.mock('next/router', () => ({
//   events: {
//     on: jest.fn(),
//     off: jest.fn(),
//   },
// }));

// jest.mock('../../UI/loader/loader.tsx', () => () => <div data-testid="loader">Loader</div>);

// describe('Wrapper', () => {
//   it('should show Loader when route is changing', async () => {
//     const { events } = Router;
//     render(
//       <Wrapper>
//         <div>Child Component</div>
//       </Wrapper>,
//     );
//     expect(screen.queryByText('Child Component')).toBeInTheDocument();
//     expect(screen.queryByText('Loader')).not.toBeInTheDocument();

//     await act(async () => {
//       (events.on as jest.Mock).mock.calls.forEach(([event, callback]) => {
//         if (event === 'routeChangeStart') {
//           callback('http://localhost/new-route');
//         }
//       });
//     });

//     expect(screen.getByText('Loader')).toBeInTheDocument();

//     await act(async () => {
//       (events.on as jest.Mock).mock.calls.forEach(([event, callback]) => {
//         if (event === 'routeChangeComplete') {
//           callback();
//         }
//       });
//     });

//     expect(screen.queryByText('Loader')).not.toBeInTheDocument();
//     expect(screen.getByText('Child Component')).toBeInTheDocument();
//   });
// });
