import type { LinksFunction, TypedResponse } from '@remix-run/node';
import { isRouteErrorResponse, json, Links, Meta, Scripts, useLoaderData, useRouteError } from '@remix-run/react';
import type { ReactElement } from 'react';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { Outlet, ScrollRestoration, useLocation, useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import './index.scss';

import FlyoutPanel from './Components/flyout-panel/Flyout-panel';
import PaginationBlock from './Components/result-list/Pagination';
import ResultList from './Components/result-list/Result-list';
import SearchBlock from './Components/search-block/SearchBlock';
import ThemeTogler from './Components/theme-button/Theme-button';
import useClassThemeToggler from './hooks/useClassThemTogler';
import styles from './routes/root/_root.module.scss';
import { getMaxPage } from './routes/root/root-helpers';
import Wrapper from './routes/root/wrapper';
import type { ISearchUrlParams } from './types/resultListTypes';
import type { IResponse } from './types/rootTypes';
import Loader from './UI/loader/loader';

export const links: LinksFunction = () => [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }];

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<
  TypedResponse<{
    response: IResponse;
  }>
> => {
  const url = new URL(request.url);
  const search = url.searchParams.get('query') || '';
  const page = search ? '1' : url.searchParams.get('page') || '1';
  const response = await fetch(`https://swapi.dev/api/planets/?search=${search}&page=${page}`, {
    cache: 'force-cache',
  });
  const data: IResponse = await response.json();

  return json({ response: data });
};

export const Layout = ({ children }: { children: ReactElement }): ReactElement => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      !target.closest('#input') &&
      !target.closest('#flyout') &&
      !target.closest('#themeTogler')
    ) {
      const query = searchParams.get('query')?.toString() || '';
      const page = searchParams.get('page')?.toString() || '1';

      navigate(`/?query=${query}&page=${page}`);
    }
  };

  return (
    <section
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
    </section>
  );
};

export const ErrorBoundary = (): ReactElement => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          404 Page not found
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  }
  if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }
  return <h1>Unknown Error</h1>;
};

export default App;
