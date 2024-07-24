import classNames from 'classnames';
import { useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import styles from './_root.module.scss';
import { getCurrentPage, getMaxPage } from './root-helpers';
import FlyoutPanel from '../../Components/flyout-panel/Flyout-panel';
import PaginationBlock from '../../Components/result-list/Pagination';
import ResultList from '../../Components/result-list/Result-list';
import SearchBlock from '../../Components/search-block/SearchBlock';
import ThemeTogler from '../../Components/theme-button/Theme-button';
import { ThemeContext, ThemeEnum } from '../../context/index';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import useSetToLS from '../../hooks/useSetToLS';
import { useGetPlanetsQuery } from '../../store/apiSlice';
import { deletePlanet } from '../../store/detailedSlice';
import { setPlanets } from '../../store/planetsSlice';
import type { IPageState, ISearchParams } from '../../types/rootTypes';
import Loader from '../../utils/loader/loader';

const Root = (): ReactNode => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const planetsStore = useAppSelector((state) => state.planets.planets);

  const [searchValueLS, setSearchValueLS] = useSetToLS('Task');

  const [pageState, setPageState] = useState<IPageState>({ currentPage: 1, maxPage: 1 });
  const [isDetailedVisible, setIsDetailedVisible] = useState<boolean>(!!location.pathname.slice(1));

  const fetchParam: ISearchParams = useMemo(
    () => ({
      searchValue: searchValueLS,
      pageNumber: Number(searchParams.get('page')) || 1,
    }),
    [searchValueLS, searchParams],
  );

  const { data: response, isLoading, isFetching } = useGetPlanetsQuery(fetchParam);

  useEffect(() => {
    if (response?.results) {
      dispatch(setPlanets(response.results));
      setPageState((prev) => ({ ...prev, currentPage: getCurrentPage(response), maxPage: getMaxPage(response.count) }));
    }
  }, [response, dispatch]);

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

  const sectionClass = useMemo(
    () =>
      classNames(styles.wrapper, {
        [styles.light]: theme === ThemeEnum.Light,
        [styles.dark]: theme === ThemeEnum.Dark,
      }),
    [theme],
  );

  return (
    <section
      className={sectionClass}
      data-testid="rootComponent"
      role="button"
      tabIndex={0}
      onClick={handleClickVisibleWithEvent}
      onKeyDown={handleWKeyDown}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>Planet search</h1>
        <SearchBlock searchParams={searchParams} setSearchParams={setSearchParams} setValueLS={setSearchValueLS} />
        <ThemeTogler />
      </header>
      <main className={isDetailedVisible ? styles.main_detailed : styles.main_center}>
        {response &&
          (isLoading || isFetching ? (
            <Loader />
          ) : (
            <ResultList
              planets={planetsStore}
              searchParams={searchParams}
              isDetailedVisible={isDetailedVisible}
              setIsDetailedVisible={setIsDetailedVisible}
            />
          ))}

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
    </section>
  );
};

export default Root;
