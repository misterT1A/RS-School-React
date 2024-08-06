import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';
import Root from '@/components/root/Root';
import createMockRouter from 'mock/createMockRouter';
import mockStore from 'mock/mockStore';

import { ThemeProvider } from '../../context';
import { deletePlanet } from '../../store/detailedSlice';

describe('Root Component', () => {
  const spy = jest.spyOn(mockStore, 'dispatch');

  const renderRoot = (): RenderResult =>
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={mockStore}>
          <ThemeProvider>
            <Root />
          </ThemeProvider>
        </Provider>
        ,
      </RouterContext.Provider>,
    );

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
});
