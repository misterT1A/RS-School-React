import classNames from 'classnames';
import { useContext, useEffect, useState, type ReactNode } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import styles from './_root.module.scss';
// import { getCurrentPage, getMaxPage } from './root-helpers';
import PaginationBlock from '../../Components/result-list/Pagination';
import ResultList from '../../Components/result-list/Result-list';
import SearchBlock from '../../Components/search-block/SearchBlock';
import ThemeTogler from '../../Components/theme-button/Theme-button';
import { ThemeContext, ThemeEnum } from '../../context/index';
// import useSetToLS from '../../hooks/useSetToLS';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { useGetPlanetsQuery } from '../../services/apiSlice';
import { setPlanets } from '../../services/planetsSlice';
import type { IState } from '../../types/rootTypes';

const Root = (): ReactNode => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const planetsStore = useAppSelector((state) => state.planets.planets);

  // const [page, setPage] = useState<number>(1);

  const { data: planets, isLoading: isLoadingPlanets } = useGetPlanetsQuery();

  useEffect(() => {
    if (planets?.results) {
      dispatch(setPlanets(planets.results));
    }
  }, [planets, dispatch]);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDetailedVisible, setIsDetailedVisible] = useState<boolean>(!!location.pathname.slice(1));
  const [state, setState] = useState<IState>({
    isLoad: true,
    searchValue: '',
    page: 1,
    maxPage: 1,
    data: null,
  });
  const navigate = useNavigate();
  // const navigation = useNavigation();
  // const [searchValueLS, setSearchValueLS] = useSetToLS('Task');

  const handleWKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsDetailedVisible(false);
    }
  };

  const handleClickVisibleWithEvent = (event: React.MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (!target.closest('#detailed') && !target.closest('#planets') && !target.closest('#input')) {
      navigate(`/?${searchParams.toString()}`);
      setIsDetailedVisible(false);
    }
  };
  const handleClickVisible = (): void => {
    navigate(`/?${searchParams.toString()}`);
    setIsDetailedVisible(false);
  };

  const sectionClass = classNames(styles.wrapper, {
    [styles.light]: theme === ThemeEnum.Light,
    [styles.dark]: theme === ThemeEnum.Dark,
  });

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
        {/* <SearchBlock searchParams={searchParams} setSearchParams={setSearchParams} setValueLS={setSearchValueLS} /> */}
        <SearchBlock
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setValueLS={() => console.log('df')}
        />
        <ThemeTogler />
      </header>
      <main className={isDetailedVisible ? styles.main_detailed : styles.main_center}>
        {planets && (
          <ResultList
            state={{
              isLoad: isLoadingPlanets,
              searchValue: '',
              page: 1,
              maxPage: 1,
              data: planetsStore,
            }}
            searchParams={searchParams}
            isDetailedVisible={isDetailedVisible}
            setIsDetailedVisible={setIsDetailedVisible}
          />
        )}

        <div className={styles.detailed_wrapper}>
          {isDetailedVisible && <Outlet context={{ handleClickVisible }} />}
        </div>
      </main>
      <footer className={styles.footer}>
        {state.isLoad || (
          <PaginationBlock
            state={state}
            setState={setState}
            searchParams={searchParams}
            handleClickVisible={handleClickVisible}
          />
        )}
      </footer>
    </section>
  );
};

export default Root;
