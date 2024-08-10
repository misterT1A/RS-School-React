import type { LinksFunction, MetaFunction, TypedResponse } from '@remix-run/node';
import { isRouteErrorResponse, json, Links, Meta, Scripts, useLoaderData, useRouteError } from '@remix-run/react';
import type { ReactElement } from 'react';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { Outlet, ScrollRestoration, useLocation, useNavigate, useNavigation, useSearchParams } from 'react-router-dom';

import './index.scss';

import ErrorPage from './Components/ErrorBoundary/ErrorPage';
import FlyoutPanel from './Components/flyout-panel/Flyout-panel';
import NotFoundPage from './Components/not-found-page/NotFoundPage';
import PaginationBlock from './Components/result-list/Pagination';
import ResultList from './Components/result-list/Result-list';
import SearchBlock from './Components/search-block/SearchBlock';
import ThemeTogler from './Components/theme-button/Theme-button';
import { useClassThemeToggler } from './hooks';
import styles from './styles/_root.module.scss';
import type { ISearchUrlParams } from './types/resultListTypes';
import type { IResponse } from './types/rootTypes';
import Loader from './UI/loader/loader';
import { getMaxPage } from './utils/root-helpers';
import Wrapper from './utils/wrapper';

export const links: LinksFunction = () => [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }];

export const meta: MetaFunction = () => [
  { title: 'Planet Search' },
  { name: 'description', content: 'App' },
  { charset: 'utf-8' },
  { viewport: 'width=device-width,initial-scale=1' },
];

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<
  TypedResponse<{
    response: IResponse;
  }>
> => {
  const url = new URL(request.url);
  const search = url.searchParams.get('query') || '';
  const pageParam = url.searchParams.get('page') || '1';
  const page = Number(pageParam);
  if (Number.isNaN(page) || page <= 0) {
    throw new Response('Page Not Found', { status: 404 });
  }
  const response = await fetch(`https://swapi.dev/api/planets/?search=${search}&page=${page}`);
  const data: IResponse = await response.json();
  return json({ response: data });
};

export const Layout = ({ children }: { children: ReactElement }): ReactElement => (
  <html lang="en">
    <head>
      <Meta />
      <Links />
    </head>
    <body>
      <Wrapper>{children}</Wrapper>
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

const App = (): ReactElement => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { response } = useLoaderData<typeof loader>();
  const isDetailedVisible = /^details\/\d+$/.test(location.pathname.slice(1));
  const isLoading = navigation.state === 'loading' && !isDetailedVisible;
  const maxPage = getMaxPage(response.count);

  const handleClickVisibleWithEvent = (event: React.MouseEvent): void => {
    const target = event.target as HTMLElement;

    if (
      !target.closest('#detailed') &&
      !target.closest('#planets') &&
      !target.closest('#search-form') &&
      !target.closest('#flyout') &&
      !target.closest('#themeTogler') &&
      isDetailedVisible
    ) {
      const query = searchParams.get('query')?.toString() || '';
      const page = searchParams.get('page')?.toString() || '1';

      navigate(`/?query=${query}&page=${page}`);
    }
  };

  return (
    <div
      className={useClassThemeToggler(styles.wrapper, styles.dark)}
      data-testid="rootComponent"
      onClick={handleClickVisibleWithEvent}
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
          {isLoading ? (
            <Loader />
          ) : (
            <ResultList
              planets={response.results}
              searchParams={searchParams as unknown as ISearchUrlParams}
              isDetailedVisible={isDetailedVisible}
            />
          )}
          <div className={styles.detailed_wrapper}>{isDetailedVisible && <Outlet />}</div>
        </main>
        <footer className={styles.footer}>
          {isLoading || <PaginationBlock maxPage={maxPage} />}
          <FlyoutPanel />
        </footer>
      </div>
    </div>
  );
};

export const ErrorBoundary = (): ReactElement => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <NotFoundPage />;
  }
  if (error instanceof Error) {
    return <ErrorPage />;
  }
  return <h1>Unknown Error</h1>;
};

export default App;
