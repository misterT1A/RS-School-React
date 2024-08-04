import type { AppProps } from 'next/app';

import { ThemeProvider } from '@/context';
import Layout from '@/layout/Layout';
import { wrapper } from '@/store/store';
import '@/styles/globals.scss';

import Wrapper from './wrapper';

const AppComponent = ({ Component, pageProps }: AppProps) => {
  const { props } = wrapper.useWrappedStore(pageProps);
  return (
    <ThemeProvider>
      <Layout>
        <Wrapper>
          <Component {...props.pageProps} />;
        </Wrapper>
      </Layout>
    </ThemeProvider>
  );
};

const App = wrapper.withRedux(AppComponent);
export default App;
