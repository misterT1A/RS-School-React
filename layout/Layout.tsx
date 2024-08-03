// import Header from '@/Components/header/Header';
import Head from 'next/head';
import { ReactNode } from 'react';
import ThemeWrapper from './themeWrapper';
import useClassThemeToggler from '@/hooks/useClassThemTogler';

import styles from '@/components/root/_root.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Head>
      <title> Next App</title>
      <meta name="description" content="next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ThemeWrapper>
      {/* <Header /> */}
      <main className={useClassThemeToggler(styles.app, styles.dark)}>{children}</main>
    </ThemeWrapper>
  </>
);
