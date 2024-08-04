import Router from 'next/router';
import type { ReactNode } from 'react';
import React, { useEffect } from 'react';

import Loader from '@/UI/loader/loader';

const Wrapper = ({ children }: { children: ReactNode }): ReactNode => {
  const [isLoading, setLoading] = React.useState(false);
  useEffect(() => {
    const start = (event: string): void => {
      const parsedUrl = new URL(event, window.location.origin);
      if (!parsedUrl.searchParams.has('details')) {
        setLoading(true);
      }
    };
    const end = (): void => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return (): void => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return <main>{isLoading ? <Loader /> : children}</main>;
};

export default Wrapper;
