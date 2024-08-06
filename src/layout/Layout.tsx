import Head from 'next/head';
import type { ReactElement } from 'react';

import styles from '@/components/root/_root.module.scss';

import ThemeWrapper from './themeWrapper';
import Header from '../components/header/Header';
import useClassThemeToggler from '../hooks/useClassThemTogler';

interface ILayoutProps {
  children: ReactElement;
}

const Layout = ({ children }: ILayoutProps): ReactElement => (
  <>
    <Head>
      <title> Next App</title>
      <meta name="description" content="next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ThemeWrapper>
      <Header />
      <main className={useClassThemeToggler(styles.app, styles.dark)}>{children}</main>
    </ThemeWrapper>
  </>
);

export default Layout;
