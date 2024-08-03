import { useAppDispatch, useGetPlanets } from '@/hooks';
import { deletePlanet } from '@/store/detailedSlice';
import { IPageState } from '@/types/rootTypes';
import Loader from '@/UI/loader/loader';
import { useRouter } from 'next/router';
import { ReactNode, useCallback, useState } from 'react';
import styles from './_root.module.scss';

const Root = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const searchParams = useSearchUrl();

  // const detailsId = router.query.details;
  const [pageState, setPageState] = useState<IPageState>({ currentPage: 1, maxPage: 1 });
  console.log(pageState);
  const [isDetailedVisible, setIsDetailedVisible] = useState<boolean>(!!router.query.details?.toString() || false);

  const [planets, isLoading, isFetching, isError] = useGetPlanets(setPageState);
  console.log(isError);

  const mainContent = (): ReactNode => {
    if (isLoading || isFetching) {
      return <Loader />;
    }
    if (!planets) {
      return <div>Fetch Error</div>;
    }
    return (
      // <ResultList
      //   planets={planets.results}
      //   searchParams={searchParams}
      //   isDetailedVisible={isDetailedVisible}
      //   setIsDetailedVisible={setIsDetailedVisible}
      // />
      <h1> {planets.toString()}</h1>
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

  // const handleClickVisible = useCallback((): void => {
  //   setIsDetailedVisible(false);
  //   dispatch(deletePlanet());
  // }, [searchParams, dispatch]);

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
          {/* {isDetailedVisible && detailsId && <DetailedBlock handleClickVisible={setIsDetailedVisible} />} */}
        </div>
      </section>
      <footer className={styles.footer}>
        {/* <PaginationBlock state={pageState} setState={setPageState} handleClickVisible={handleClickVisible} />
          <FlyoutPanel /> */}
      </footer>
    </section>
  );
};

export default Root;
