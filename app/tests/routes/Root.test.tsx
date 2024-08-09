import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import '@testing-library/jest-dom';
import { ThemeProvider } from '../../context';
import Root from '../../routes/root/root';
import { deletePlanet } from '../../store/detailedSlice';
import store from '../../store/store';

jest.mock('../../UI/loader/loader', () => (): ReactNode => <div data-testid="loader">Loader</div>);

describe('Root Component', () => {
  const spy = jest.spyOn(store, 'dispatch');

  const renderRoot = (): RenderResult =>
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<Root />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    );

  it('should render the title', () => {
    renderRoot();
    expect(screen.getByText(/Planet search/i)).toBeInTheDocument();
  });

  it('should display list of planets after data is fetched', async () => {
    renderRoot();
    expect(await screen.findByText(/test/i)).toBeInTheDocument();
  });

  it('hides detailed view on Enter or Space keydown', async () => {
    renderRoot();

    const rootComponent = screen.getByTestId('rootComponent');
    rootComponent.focus();
    fireEvent.keyDown(rootComponent, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.queryByText('test')).toBeVisible();
    });

    fireEvent.keyDown(rootComponent, { key: ' ' });

    await waitFor(() => {
      expect(screen.queryByText('test')).toBeVisible();
    });
  });

  it('calls navigate and dispatch when clicking outside specific elements', () => {
    renderRoot();

    const rootComponent = screen.getByTestId('rootComponent');

    fireEvent.click(rootComponent);

    expect(spy).toHaveBeenCalledWith(deletePlanet());
  });

  it('does not call navigate and dispatch when clicking on specific elements', () => {
    renderRoot();

    fireEvent.click(screen.getByPlaceholderText('Search'));
    fireEvent.click(screen.getByText('0 items are selected'));
    fireEvent.click(screen.getByTestId('theme-toggle-button'));

    expect(spy).not.toHaveBeenCalledWith(deletePlanet());
  });
});
