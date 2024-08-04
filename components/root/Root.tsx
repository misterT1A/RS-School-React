/* eslint-disable jsx-a11y/interactive-supports-focus */
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';

import { useAppDispatch, useGetPlanets, useSearchUrl } from '@/hooks';
import { deletePlanet } from '@/store/detailedSlice';
import type { IPageState } from '@/types/rootTypes';
import Loader from '@/UI/loader/loader';

import styles from './_root.module.scss';
import DetailedBlock from '../detailed-block/Detailed-block';
import FlyoutPanel from '../flyout-panel/Flyout-panel';
import PaginationBlock from '../result-list/Pagination';
import ResultList from '../result-list/Result-list';

const Root = (): ReactNode => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchUrl();

  const detailsId = router.query.details;
  const [pageState, setPageState] = useState<IPageState>({ currentPage: 1, maxPage: 1 });
  const [isDetailedVisible, setIsDetailedVisible] = useState<boolean>(!!router.query.details?.toString() || false);

  const [planets, isLoading, isFetching, isError] = useGetPlanets(setPageState);

  const mainContent = (): ReactNode => {
    if (isLoading || isFetching) {
      return <Loader />;
    }
    if (!planets || isError) {
      return <div>Fetch Error</div>;
    }
    return (
      <ResultList
        planets={planets.results}
        searchParams={searchParams}
        isDetailedVisible={isDetailedVisible}
        setIsDetailedVisible={setIsDetailedVisible}
      />
    );
  };

  const handleClickVisibleWithEvent = useCallback(
    (event: React.MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (
        !target.closest('#detailed') &&
        !target.closest('#planets') &&
        !target.closest('#input') &&
        !target.closest('#flyout') &&
        !target.closest('#themeTogler')
      ) {
        const { details, ...newQuery } = router.query;
        console.log(details);
        router.replace(
          {
            pathname: router.pathname,
            query: newQuery,
          },
          undefined,
          { shallow: true },
        );

        console.log('aaa');
        setIsDetailedVisible(false);
        dispatch(deletePlanet());
      }
    },
    [dispatch, router],
  );

  const handleClickVisible = useCallback((): void => {
    setIsDetailedVisible(false);
    dispatch(deletePlanet());
  }, [dispatch]);

  return (
    <section
      className={styles.rootSection}
      data-testid="rootComponent"
      role="button"
      onClick={handleClickVisibleWithEvent}
    >
      <section className={isDetailedVisible ? styles.main_detailed : styles.main_center}>
        {mainContent()}
        <div className={styles.detailed_wrapper}>
          {isDetailedVisible && detailsId && <DetailedBlock handleClickVisible={setIsDetailedVisible} />}
        </div>
      </section>
      <footer className={styles.footer}>
        <PaginationBlock state={pageState} setState={setPageState} handleClickVisible={handleClickVisible} />
        <FlyoutPanel />
      </footer>
    </section>
  );
};

export default Root;
