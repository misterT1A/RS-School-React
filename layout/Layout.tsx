import Head from 'next/head';
import type { ReactNode } from 'react';

import Header from '@/components/header/Header';
import styles from '@/components/root/_root.module.scss';
import useClassThemeToggler from '@/hooks/useClassThemTogler';

import ThemeWrapper from './themeWrapper';

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps): ReactNode => (
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
