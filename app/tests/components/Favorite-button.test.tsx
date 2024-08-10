import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import FavoriteButton from '../../Components/favorite-button/Favorite-button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addFavorite, deleteFavorite } from '../../store/favoriteSlice';
import type { IPlanet } from '../../types/rootTypes';

jest.mock('../../hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('FavoriteButton', () => {
  const mockDispatch = jest.fn();
  const planet = { name: 'Tatooine', url: 'https://swapi.dev/api/planets/1/' } as IPlanet;

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with empty star when planet is not in favorites', () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    render(<FavoriteButton planetForCheck={planet} />);

    expect(screen.getByRole('button', { name: /☆/ })).toBeInTheDocument();
  });

  test('renders with filled star when planet is in favorites', () => {
    (useAppSelector as jest.Mock).mockReturnValue([{ name: 'Tatooine' }]);

    render(<FavoriteButton planetForCheck={planet} />);

    expect(screen.getByRole('button', { name: /★/ })).toBeInTheDocument();
  });

  test('dispatches addFavorite action when planet is not in favorites and button is clicked', () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    render(<FavoriteButton planetForCheck={planet} />);

    const button = screen.getByRole('button', { name: /☆/ });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(addFavorite(planet));
  });

  test('dispatches deleteFavorite action when planet is in favorites and button is clicked', () => {
    (useAppSelector as jest.Mock).mockReturnValue([{ name: 'Tatooine' }]);

    render(<FavoriteButton planetForCheck={planet} />);

    const button = screen.getByRole('button', { name: /★/ });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(deleteFavorite(planet));
  });
});
