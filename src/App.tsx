import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import DetailedBlock from './Components/detailed-block/Detailed-block';
// import detailedLoader from './Components/detailed-block/Detailed-block-helpers';
import ErrorPage from './Components/ErrorBoundary/ErrorPage';
import { ThemeProvider } from './context/index';
import NotFoundPage from './routes/not-found-page/NotFoundPage';
import Root from './routes/root/root';
import store from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'planets/:productId',
        element: <DetailedBlock />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

const App = (): ReactNode => (
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);

export default App;
