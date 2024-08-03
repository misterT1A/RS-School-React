import React, { ReactNode, useEffect } from 'react';
import Router from 'next/router';
import Loader from '@/UI/loader/loader';

export default function Wrapper({ children }: { children: ReactNode }) {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const start = (event: string) => {
      const parsedUrl = new URL(event, window.location.origin);
      if (!parsedUrl.searchParams.has('details')) {
        setLoading(true);
      }
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return <main>{loading ? <Loader /> : children}</main>;
}
