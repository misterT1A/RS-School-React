import { fireEvent, render, screen, type RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';

import FlyoutPanel from '@/components/flyout-panel/Flyout-panel';
import createMockRouter from 'mock/createMockRouter';
import mockStore from 'mock/mockStore';

import { mockPlanet } from '../../../mock/handlers';
import { addFavorite, deleteAllFavorites } from '../../store/favoriteSlice';

describe('FlyoutPanel', () => {
  const spy = jest.spyOn(mockStore, 'dispatch');
  const renderWithProviders = (): RenderResult =>
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={mockStore}>
          <FlyoutPanel />
        </Provider>
      </RouterContext.Provider>,
    );

  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
  });

  it('should display FlyoutPanel with 0 elem', () => {
    renderWithProviders();

    const panel = screen.getByText('0 items are selected');
    expect(panel).toBeInTheDocument();
  });

  it('should display FlyoutPanel with 1 elem', () => {
    mockStore.dispatch(addFavorite(mockPlanet));
    renderWithProviders();

    const panel = screen.getByText('1 items are selected');
    expect(panel).toBeInTheDocument();
  });

  it('should delete all favotites', () => {
    mockStore.dispatch(addFavorite(mockPlanet));
    renderWithProviders();

    const btn = screen.getByRole('button', { name: 'Unselect all' });
    fireEvent.click(btn);
    expect(spy).toHaveBeenCalledWith(deleteAllFavorites());
  });
});
