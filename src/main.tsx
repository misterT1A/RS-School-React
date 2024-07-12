import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import DetailedBlock from './Components/detailed-block/Detailed-block';
import detailedLoader from './Components/detailed-block/Detailed-block-helpers';
import Root from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <h2>Something went wrong</h2>,
    children: [
      {
        path: 'planets/:productId',
        element: <DetailedBlock />,
        loader: detailedLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
