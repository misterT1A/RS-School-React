// import type { AppProps } from 'next/app';

// import '@/styles/globals.scss';

// import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
// import { ThemeProvider } from '@/context';
// import Layout from '@/layout/Layout';

// import Custom404 from './404';
// import Wrapper from './wrapper';
// import { wrapper } from '../store';

// const AppComponent = ({ Component, pageProps }: AppProps) => {
//   const { props } = wrapper.useWrappedStore(pageProps);

//   if (Component === Custom404) return <Component {...props.pageProps} />;

//   return (
//     <ThemeProvider>
//       <ErrorBoundary>
//         <Layout>
//           <Wrapper>
//             <Component {...props.pageProps} />;
//           </Wrapper>
//         </Layout>
//       </ErrorBoundary>
//     </ThemeProvider>
//   );
// };

// const App = wrapper.withRedux(AppComponent);
// export default App;
