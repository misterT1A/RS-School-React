import { Suspense } from 'react';

import Loader from '@/UI/loader/loader';

import DetailedBlock from './Detailed-block';

const PageWithLoader = async ({ detailed }: { detailed: string }) => (
  <Suspense key="characters" fallback={<Loader />}>
    <DetailedBlock detailed={detailed} />
  </Suspense>
);

export default PageWithLoader;
