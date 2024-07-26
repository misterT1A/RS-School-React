import { useCallback, useState, type ReactNode } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import styles from './_root.module.scss';
import FlyoutPanel from '../../Components/flyout-panel/Flyout-panel';
import PaginationBlock from '../../Components/result-list/Pagination';
import ResultList from '../../Components/result-list/Result-list';
import SearchBlock from '../../Components/search-block/SearchBlock';
import ThemeTogler from '../../Components/theme-button/Theme-button';
import { useAppDispatch, useGetPlanets } from '../../hooks';
import useClassThemeToggler from '../../hooks/useClassThemTogler';
import { deletePlanet } from '../../store/detailedSlice';
import type { IPageState } from '../../types/rootTypes';
import Loader from '../../utils/loader/loader';

const Root = (): ReactNode => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [pageState, setPageState] = useState<IPageState>({ currentPage: 1, maxPage: 1 });
  const [isDetailedVisible, setIsDetailedVisible] = useState<boolean>(!!location.pathname.slice(1));

  const [planets, isLoading, isFetching] = useGetPlanets(setPageState);

  const handleWKeyDown = useCallback(
    (event: React.KeyboardEvent): void => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsDetailedVisible(false);
        dispatch(deletePlanet());
      }
    },
    [dispatch],
  );

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
        navigate(`/?${searchParams.toString()}`);
        setIsDetailedVisible(false);
        dispatch(deletePlanet());
      }
    },
    [navigate, searchParams, dispatch],
  );
  const handleClickVisible = useCallback((): void => {
    navigate(`/?${searchParams.toString()}`);
    setIsDetailedVisible(false);
    dispatch(deletePlanet());
  }, [navigate, searchParams, dispatch]);

  return (
    <section
      className={useClassThemeToggler(styles.wrapper, styles.dark)}
      data-testid="rootComponent"
      role="button"
      tabIndex={0}
      onClick={handleClickVisibleWithEvent}
      onKeyDown={handleWKeyDown}
    >
      <div className={useClassThemeToggler(styles.app, styles.dark)}>
        <header className={styles.header}>
          <h1 className={useClassThemeToggler(styles.title, styles.dark)}>Planet search</h1>
          <div className={styles.controlBlock}>
            <SearchBlock />
            <ThemeTogler />
          </div>
        </header>
        <main className={isDetailedVisible ? styles.main_detailed : styles.main_center}>
          {isLoading || isFetching ? (
            <Loader />
          ) : (
            planets && (
              <ResultList
                planets={planets.results}
                searchParams={searchParams}
                isDetailedVisible={isDetailedVisible}
                setIsDetailedVisible={setIsDetailedVisible}
              />
            )
          )}

          <div className={styles.detailed_wrapper}>
            {isDetailedVisible && <Outlet context={{ handleClickVisible }} />}
          </div>
        </main>
        <footer className={styles.footer}>
          {isLoading || isFetching || (
            <PaginationBlock
              state={pageState}
              setState={setPageState}
              searchParams={searchParams}
              handleClickVisible={handleClickVisible}
            />
          )}
          <FlyoutPanel />
        </footer>
      </div>
    </section>
  );
};

export default Root;
