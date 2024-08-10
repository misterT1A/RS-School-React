import { useLoaderData } from '@remix-run/react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import type { ReactElement } from 'react';
import { useLocation, useNavigate, useSearchParams, useNavigation } from 'react-router-dom';

import App from '../../root';
import type { IResponse } from '../../types/rootTypes';

jest.mock('@remix-run/react', () => ({
  useLoaderData: jest.fn(),
  useRouteError: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useSearchParams: jest.fn(),
  useNavigate: jest.fn(),
  useNavigation: jest.fn(),
  Outlet: (): ReactElement => <div>Outlet</div>,
  ScrollRestoration: (): ReactElement => <div>ScrollRestoration</div>,
}));

jest.mock('../../hooks/index.ts', () => ({
  useClassThemeToggler: jest.fn((defaultClass: string, darkClass: string) => `${defaultClass} ${darkClass}`),
}));

jest.mock('../../utils/root-helpers.ts', () => ({
  getMaxPage: jest.fn().mockReturnValue(5),
}));

jest.mock('../../Components/result-list/Result-list.tsx', () => (): ReactElement => <div>ResultList</div>);
jest.mock('../../UI/loader/loader.tsx', () => (): ReactElement => <div>Loader</div>);
jest.mock('../../Components/search-block/SearchBlock.tsx', () => (): ReactElement => <div>SearchBlock</div>);
jest.mock('../../Components/theme-button/Theme-button.tsx', () => (): ReactElement => <div>ThemeTogler</div>);
jest.mock('../../Components/flyout-panel/Flyout-panel.tsx', () => (): ReactElement => <div>FlyoutPanel</div>);
jest.mock('../../Components/result-list/Pagination.tsx', () => (): ReactElement => <div>PaginationBlock</div>);
jest.mock('../../Components/not-found-page/NotFoundPage.tsx', () => (): ReactElement => <div>NotFoundPage</div>);
jest.mock('../../Components/ErrorBoundary/ErrorPage.tsx', () => (): ReactElement => <div>ErrorPage</div>);

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and handles loading state', () => {
    (useLoaderData as jest.Mock).mockReturnValue({ response: { results: [], count: 0 } });
    (useNavigation as jest.Mock).mockReturnValue({ state: 'loading' });
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams()]);
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });

    render(<App />);

    expect(screen.getByText('Planet search')).toBeInTheDocument();
    expect(screen.getByText('Loader')).toBeInTheDocument();
  });

  it('displays results when not loading', async () => {
    const mockResponse = { results: [{ name: 'Tatooine' }], count: 1 } as IResponse;
    (useLoaderData as jest.Mock).mockReturnValue({ response: mockResponse });
    (useNavigation as jest.Mock).mockReturnValue({ state: 'idle' });
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams()]);
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('ResultList')).toBeInTheDocument();
      expect(screen.queryByText('Loader')).not.toBeInTheDocument();
    });
  });

  it('navigates away from detailed view when clicking outside', async () => {
    const mockResponse = { results: [{ name: 'Tatooine' }], count: 1 } as IResponse;
    (useLoaderData as jest.Mock).mockReturnValue({ response: mockResponse });
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('query=test&page=1')]);
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/details/1' });
    (useNavigation as jest.Mock).mockReturnValue({ state: 'idle' });

    render(<App />);

    fireEvent.click(screen.getByTestId('rootComponent'));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/?query=test&page=1');
    });
  });
});
