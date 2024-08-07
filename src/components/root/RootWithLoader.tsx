import { Suspense } from 'react';

// import Loader from '@/UI/loader/loader';

import Root from './Root';

const RootWithLoader = async ({ searchParams }: { searchParams: { [key: string]: string } }) => (
  <Suspense key="characters" fallback={<h1>LOADING</h1>}>
    <Root searchParams={searchParams} />
  </Suspense>
);

export default RootWithLoader;
