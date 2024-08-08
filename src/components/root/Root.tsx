import { Suspense } from 'react';

import FlyoutPanel from '@/components/flyout-panel/Flyout-panel';
import PaginationBlock from '@/components/result-list/Pagination';
import ResultList from '@/components/result-list/Result-list';
import styles from '@/styles/_root.module.scss';
import type { IResponse, ISearchUrlParams } from '@/types/rootTypes';
import Loader from '@/UI/loader/loader';
import { getMaxPage } from '@/utils/root-helpers';

import DetailedBlock from '../detailed-block/Detailed-block';

const getPlanets = async (searchParams: ISearchUrlParams): Promise<IResponse> => {
  const res = await fetch(`https://swapi.dev/api/planets/?search=${searchParams.query}&page=${searchParams.page}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const Root = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const searchParamsUrl = { query: searchParams.query || '', page: +searchParams.page || 1 };
  const response = await getPlanets(searchParamsUrl);
  const maxPage = getMaxPage(response.count);
  const isDetailedVisible = !!searchParams.details || false;

  return (
    <div className={styles.rootSection} data-testid="rootComponent">
      <section className={isDetailedVisible ? styles.main_detailed : styles.main_center}>
        {response.results && (
          <ResultList planets={response.results} searchParams={searchParamsUrl} isDetailedVisible={isDetailedVisible} />
        )}
        <div className={styles.detailed_wrapper}>
          {isDetailedVisible && searchParams.details && (
            <Suspense key={searchParams.details} fallback={<Loader />}>
              <DetailedBlock detailed={searchParams.details.toString()} />
            </Suspense>
          )}
        </div>
      </section>
      <footer className={styles.footer}>
        <PaginationBlock maxPage={maxPage} />
        <FlyoutPanel />
      </footer>
    </div>
  );
};

export default Root;
