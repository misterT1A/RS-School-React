// import type { TypedResponse } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { type ReactNode } from 'react';
import type { LoaderFunctionArgs } from 'react-router-dom';

import styles from './_root.module.scss';
// import SearchBlock from '../../Components/search-block/SearchBlock';
import ThemeTogler from '../../Components/theme-button/Theme-button';
import useClassThemeToggler from '../../hooks/useClassThemTogler';
import type { IPlanet, IResponse } from '../../types/rootTypes';

export const loader = async ({ request }: LoaderFunctionArgs): Promise<IPlanet[]> => {
  console.log(request);
  const url = new URL(request.url);
  const search = url.searchParams.get('q') || '';
  const page = url.searchParams.get('page') || '1';
  const response = await fetch(`https://swapi.dev/api/people/?search=${search}&page=${page}`);

  // return json({ response });
  const planets: IResponse = await response.json();
  return planets.results;
};

const Home = (): ReactNode => {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  // const location = useLocation();
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const [searchParams] = useSearchParams();

  // const [pageState, setPageState] = useState<IPageState>({ currentPage: 1, maxPage: 1 });
  // const [isDetailedVisible, setIsDetailedVisible] = useState<boolean>(!!location.pathname.slice(1));

  // const [planets, isLoading, isFetching, isError] = useGetPlanets(setPageState);

  // const handleWKeyDown = useCallback(
  //   (event: React.KeyboardEvent): void => {
  //     if (event.key === 'Enter' || event.key === ' ') {
  //       event.preventDefault();
  //       setIsDetailedVisible(false);
  //       dispatch(deletePlanet());
  //     }
  //   },
  //   [dispatch],
  // );

  // const handleClickVisibleWithEvent = useCallback(
  //   (event: React.MouseEvent): void => {
  //     const target = event.target as HTMLElement;

  //     if (
  //       !target.closest('#detailed') &&
  //       !target.closest('#planets') &&
  //       !target.closest('#input') &&
  //       !target.closest('#flyout') &&
  //       !target.closest('#themeTogler')
  //     ) {
  //       navigate(`/?${searchParams.toString()}`);
  //       setIsDetailedVisible(false);
  //       dispatch(deletePlanet());
  //     }
  //   },
  //   [navigate, searchParams, dispatch],
  // );
  // const handleClickVisible = useCallback((): void => {
  //   navigate(`/?${searchParams.toString()}`);
  //   setIsDetailedVisible(false);
  //   dispatch(deletePlanet());
  // }, [navigate, searchParams, dispatch]);

  // const mainContent = (): ReactNode => {
  //   if (isError || !planets) return <div>Fetch Error</div>;
  //   if (isLoading || isFetching) return <Loader />;
  //   return (
  //     <ResultList
  //       planets={planets.results}
  //       searchParams={searchParams}
  //       isDetailedVisible={isDetailedVisible}
  //       setIsDetailedVisible={setIsDetailedVisible}
  //     />
  //   );
  // };
  return (
    <section
      className={useClassThemeToggler(styles.wrapper, styles.dark)}
      // data-testid="rootComponent"
      // role="button"
      // tabIndex={0}
      // onClick={handleClickVisibleWithEvent}
      // onKeyDown={handleWKeyDown}
    >
      <div className={useClassThemeToggler(styles.app, styles.dark)}>
        <header className={styles.header}>
          <h1 className={useClassThemeToggler(styles.title, styles.dark)}>Planet search</h1>
          <div className={styles.controlBlock}>
            {/* <SearchBlock /> */}
            <ThemeTogler />
          </div>
        </header>
        {/* <main className={isDetailedVisible ? styles.main_detailed : styles.main_center}>
        {mainContent()}
        <div className={styles.detailed_wrapper}>
          {isDetailedVisible && <Outlet context={{ handleClickVisible }} />}
        </div>
      </main> */}
        {/* <footer className={styles.footer}>
        {isLoading || isFetching || (
          <PaginationBlock
            state={pageState}
            setState={setPageState}
            searchParams={searchParams}
            handleClickVisible={handleClickVisible}
          />
        )}
        <FlyoutPanel />
      </footer> */}
      </div>
    </section>
  );
};
export default Home;
