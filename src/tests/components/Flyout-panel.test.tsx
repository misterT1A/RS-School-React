import { fireEvent, render, screen, type RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import FlyoutPanel from '../../Components/flyout-panel/Flyout-panel';
import { mockPlanet } from '../../mock/handlers';
import { addFavorite, deleteAllFavorites } from '../../store/favoriteSlice';
import store from '../../store/store';

describe('FlyoutPanel', () => {
  const spy = jest.spyOn(store, 'dispatch');
  const renderWithProviders = (): RenderResult =>
    render(
      <BrowserRouter>
        <Provider store={store}>
          <FlyoutPanel />
        </Provider>
      </BrowserRouter>,
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
    store.dispatch(addFavorite(mockPlanet));
    renderWithProviders();

    const panel = screen.getByText('1 items are selected');
    expect(panel).toBeInTheDocument();
  });

  it('should delete all favotites', () => {
    store.dispatch(addFavorite(mockPlanet));
    renderWithProviders();

    const btn = screen.getByRole('button', { name: 'Unselect all' });
    fireEvent.click(btn);
    expect(spy).toHaveBeenCalledWith(deleteAllFavorites());
  });
});
