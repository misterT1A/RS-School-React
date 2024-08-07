import type { Metadata } from 'next';
import '../styles/globals.scss';
import type { ReactElement } from 'react';

import Header from '@/components/header/Header';
import { ThemeProvider } from '@/context';
import ClientProvider from '@/store/provider';

export const metadata: Metadata = {
  title: 'Next App',
  description: 'Create next app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactElement;
}>) => (
  <html lang="en">
    <body>
      <ClientProvider>
        <ThemeProvider>
          <>
            <Header />
            <main>{children}</main>
          </>
        </ThemeProvider>
      </ClientProvider>
    </body>
  </html>
);

export default RootLayout;
