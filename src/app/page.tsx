import { Suspense } from 'react';

import Root from '@/components/root/Root';
import ThemeWrapper from '@/components/root/themeWrapper';
import Loader from '@/UI/loader/loader';

const Home = ({ searchParams }: { searchParams: { [key: string]: string } }) => (
  <ThemeWrapper>
    <Suspense key={searchParams.page} fallback={<Loader />}>
      <Root searchParams={searchParams} />
    </Suspense>
  </ThemeWrapper>
);

export default Home;
