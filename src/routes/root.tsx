import { useEffect, useState, type ReactNode } from 'react';
import { Outlet, useLocation, useNavigate, useNavigation, useSearchParams } from 'react-router-dom';

import styles from './_root.module.scss';
import { getCurrentPage, getMaxPage } from './root-helpers';
import PaginationBlock from '../Components/result-list/Pagination';
import ResultList from '../Components/result-list/Result-list';
import SearchBlock from '../Components/search-block/SearchBlock';
import { fetchDataService } from '../services/fetchDataService';
import type { IState } from '../types/rootTypes';
import Loader from '../utils/loader/loader';

const Root = (): ReactNode => {
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
  const navigation = useNavigation();

  useEffect(() => {
    const querySearch = searchParams.get('q') || '';
    const currentPage = Number(searchParams.get('page') || 1);

    const fetchData = async (search: string, page: number): Promise<void> => {
      setState((prevState) => ({
        ...prevState,
        isLoad: true,
      }));
      try {
        const data = await fetchDataService(search, page);

        setState((prevState) => ({
          ...prevState,
          data: data.results,
          isLoad: false,
          page: getCurrentPage(data),
          maxPage: getMaxPage(data.count),
        }));
      } catch (error) {
        console.error('Fetch error');
      }
    };

    fetchData(querySearch, currentPage);
  }, [searchParams]);

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

  return (
    <section
      className={styles.wrapper}
      role="button"
      tabIndex={0}
      onClick={handleClickVisibleWithEvent}
      onKeyDown={handleWKeyDown}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>Planet search</h1>
        <SearchBlock searchParams={searchParams} setSearchParams={setSearchParams} />
      </header>
      <main className={isDetailedVisible ? styles.main_detailed : styles.main_center}>
        <ResultList
          state={state}
          searchParams={searchParams}
          isDetailedVisible={isDetailedVisible}
          setIsDetailedVisible={setIsDetailedVisible}
        />
        <div className={styles.detailed_wrapper}>
          {isDetailedVisible &&
            (navigation.state === 'loading' ? <Loader /> : <Outlet context={{ handleClickVisible }} />)}
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
