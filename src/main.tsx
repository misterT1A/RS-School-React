import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './Components/ErrorBoundary/ErrorPage';
import Layout from './Components/layout/Layout';
import Controlled from './routes/controlled/Controlled';
import NotFoundPage from './routes/not-found-page/NotFoundPage';
import Root from './routes/root/root';
import store from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/controlled',
        element: <Controlled />,
        errorElement: <ErrorPage />,
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
