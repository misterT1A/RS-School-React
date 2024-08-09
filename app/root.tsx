/* eslint-disable react-refresh/only-export-components */
/* eslint-disable import/order */
import { isRouteErrorResponse, Links, Meta, Scripts, useRouteError } from '@remix-run/react';
import type { ReactElement } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import './index.scss';

import type { LinksFunction } from '@remix-run/node';

// export const links: LinksFunction = () => [{ rel: 'stylesheet', href: globalStyles }];
export const links: LinksFunction = () => [{ rel: 'icon', type: 'image/png', href: './favicon.ico' }];

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const url = new URL(request.url);
//   const q = url.searchParams.get(q');
//   const contacts = await getContacts(q);
//   return json({ contacts, q });
// };

const App = (): ReactElement => (
  // const navigation = useNavigation();

  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      <h1>hello</h1>

      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);
export const ErrorBoundary = (): ReactElement => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {' '}
          222222
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
