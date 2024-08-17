import type { ReactElement } from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';

// import Footer from '../footer/Footer';
// import Header from '../header/Header';

const Layout: React.FC = (): ReactElement => (
  <>
    {/* <Header /> */}
    <main>
      <Outlet />
    </main>
    {/* <Footer /> */}
  </>
);

export default Layout;
