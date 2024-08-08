import FlyoutPanel from '@/components/flyout-panel/Flyout-panel';
import PaginationBlock from '@/components/result-list/Pagination';
import ResultList from '@/components/result-list/Result-list';
import type { ISearchUrlParams } from '@/hooks';
import styles from '@/styles/_root.module.scss';
import type { IResponse } from '@/types/rootTypes';
import { getMaxPage } from '@/utils/root-helpers';

import ThemeWrapper from './themeWrapper';
import PageWithLoader from '../detailed-block/DetailsWithLoader';

const getPlanets = async (searchParams: ISearchUrlParams): Promise<IResponse> => {
  const res = await fetch(`https://swapi.dev/api/planets/?search=${searchParams.q}&page=${searchParams.page}`, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const Root = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const searchParamsUrl = { q: searchParams.query || '', page: +searchParams.page || 1 };
  const response = await getPlanets(searchParamsUrl);
  const maxPage = getMaxPage(response.count);
  const isDetailedVisible = !!searchParams.details || false;

  return (
    <ThemeWrapper>
      <div className={styles.rootSection} data-testid="rootComponent">
        <section className={isDetailedVisible ? styles.main_detailed : styles.main_center}>
          {response.results && (
            <ResultList
              planets={response.results}
              searchParams={searchParamsUrl}
              isDetailedVisible={isDetailedVisible}
            />
          )}
          <div className={styles.detailed_wrapper}>
            {isDetailedVisible && <PageWithLoader detailed={searchParams.details} />}
          </div>
        </section>
        <footer className={styles.footer}>
          <PaginationBlock maxPage={maxPage} />
          <FlyoutPanel />
        </footer>
      </div>
    </ThemeWrapper>
  );
};

export default Root;
