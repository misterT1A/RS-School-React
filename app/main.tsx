// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.scss';
// import { Provider } from 'react-redux';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import DetailedBlock from './Components/detailed-block/Detailed-block';
// import ErrorPage from './Components/ErrorBoundary/ErrorPage';
// import { ThemeProvider } from './context';
// import NotFoundPage from './routes/not-found-page/NotFoundPage';
// import Root from './routes/root/root';
// import store from './store/store';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: 'planets/:productId',
//         element: <DetailedBlock />,
//       },
//     ],
//   },
//   {
//     path: '*',
//     element: <NotFoundPage />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <ThemeProvider>
//         <RouterProvider router={router} />
//       </ThemeProvider>
//     </Provider>
//   </React.StrictMode>,
// );
