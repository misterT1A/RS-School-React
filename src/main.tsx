import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import DetailedBlock from './Components/detailed-block/Detailed-block';
import detailedLoader from './Components/detailed-block/Detailed-block-helpers';
import ErrorPage from './Components/ErrorBoundary/ErrorPage';
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
