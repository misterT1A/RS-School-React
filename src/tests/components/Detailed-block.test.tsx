import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route, useOutletContext } from 'react-router-dom';

import '@testing-library/jest-dom';
import DetailedBlock from '../../Components/detailed-block/Detailed-block';
import { ThemeProvider } from '../../context';
import { mockPlanet } from '../../mock/handlers';
import { addFavorite } from '../../store/favoriteSlice';
import store from '../../store/store';
import type { IPlanet } from '../../types/rootTypes';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));

const mockHandleClickVisible = jest.fn();

describe('DetailedBlock Component', () => {
  const renderWithProviders = (ui: React.ReactElement): RenderResult =>
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/planet/1']}>
            <Routes>
              <Route path="/planet/:productId" element={ui} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    );

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ handleClickVisible: mockHandleClickVisible });
  });

  it('should display loading indicator', () => {
    renderWithProviders(<DetailedBlock />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render the component', async () => {
    renderWithProviders(<DetailedBlock />);
    await waitFor(() => expect(screen.getByText('name: ------Tatooine')).toBeInTheDocument());
  });

  it('renders product details correctly', async () => {
    renderWithProviders(<DetailedBlock />);
    const productKeys = Object.keys(mockPlanet).filter((key) => !['residents', 'films', 'url'].includes(key));
    await waitFor(() =>
      productKeys.forEach((key) => {
        const valueElement = screen.getByText(new RegExp(`${key}: ------${mockPlanet[key as keyof IPlanet]}`, 'i'));
        expect(valueElement).toBeInTheDocument();
      }),
    );
  });

  it('should add planet to favorites', async () => {
    renderWithProviders(<DetailedBlock />);
    await waitFor(() => expect(screen.getByText('name: ------Tatooine')));
    const favoriteButton = screen.getByRole('button', { name: '☆' });
    fireEvent.click(favoriteButton);
    await waitFor(() => expect(favoriteButton).toHaveTextContent('★'));
  });

  it('should remove planet from favorites', async () => {
    store.dispatch(addFavorite(mockPlanet));
    renderWithProviders(<DetailedBlock />);
    await waitFor(() => expect(screen.getByText('name: ------Tatooine')));
    const favoriteButton = screen.getByRole('button', { name: '★' });
    fireEvent.click(favoriteButton);
    await waitFor(() => expect(favoriteButton).toHaveTextContent('☆'));
  });

  it('should call handleClickVisible on close button click', async () => {
    renderWithProviders(<DetailedBlock />);
    await waitFor(() => expect(screen.getByText('name: ------Tatooine')));
    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);
    expect(mockHandleClickVisible).toHaveBeenCalled();
  });
});
