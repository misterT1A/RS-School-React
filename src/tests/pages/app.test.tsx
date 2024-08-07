import { render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import type { ReactNode } from 'react';

import App from '@/store/pages/_app';
import createMockRouter from 'mock/createMockRouter';

jest.mock('../../layout/Layout.tsx', () => ({ children }: { children: ReactNode }) => <div>{children}</div>);
jest.mock('../../pages/wrapper.tsx', () => ({ children }: { children: ReactNode }) => <div>{children}</div>);

describe('AppComponent', () => {
  it('renders the Component within Layout, Wrapper, and ThemeProvider', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <App Component={() => <div>Test Component</div>} pageProps={{}} />
      </RouterContext.Provider>,
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
