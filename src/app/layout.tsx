import type { Metadata } from 'next';
import '../styles/globals.scss';
import { Inter } from 'next/font/google';
import { Suspense, type ReactElement } from 'react';

import Header from '@/components/header/Header';
import { ThemeProvider } from '@/context';
import ClientProvider from '@/store/provider';

import Wrapper from './wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next App',
  description: 'Create next app',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactElement;
}>) => (
  <html lang="en">
    <body className={inter.className}>
      <ClientProvider>
        <ThemeProvider>
          <Wrapper>
            <>
              <Suspense>
                <Header />
              </Suspense>
              <main>{children}</main>
            </>
          </Wrapper>
        </ThemeProvider>
      </ClientProvider>
    </body>
  </html>
);

export default RootLayout;
