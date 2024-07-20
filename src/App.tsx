import type { ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import DetailedBlock from './Components/detailed-block/Detailed-block';
import detailedLoader from './Components/detailed-block/Detailed-block-helpers';
import ErrorPage from './Components/ErrorBoundary/ErrorPage';
import { ThemeProvider } from './context/index';
import NotFoundPage from './routes/not-found-page/NotFoundPage';
import Root from './routes/root/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'planets/:productId',
        element: <DetailedBlock />,
        loader: detailedLoader,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

const App = (): ReactNode => (
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);

export default App;
