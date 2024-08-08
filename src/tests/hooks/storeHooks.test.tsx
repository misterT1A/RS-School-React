import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import { addFavorite } from '@/store/favoriteSlice';
import mockStore from 'mock/mockStore';

import { mockPlanet } from '../../../mock/handlers';
import { useAppDispatch, useAppSelector } from '../../hooks';

const TestComponent = (): ReactNode => {
  const dispatch = useAppDispatch();
  const favoritePlanets = useAppSelector((state) => state.favorite.planets);

  return (
    <div>
      <button type="button" onClick={() => dispatch(addFavorite(mockPlanet))}>
        Add Planet
      </button>
      <div>{favoritePlanets.length ? favoritePlanets[0].name : 'empty'}</div>
    </div>
  );
};

describe('useAppHooks', () => {
  it('should dispatch an action and update the state', async () => {
    render(
      <Provider store={mockStore}>
        <TestComponent />
      </Provider>,
    );
    fireEvent.click(screen.getByText('Add Planet'));

    expect(await screen.findByText('Tatooine')).toBeInTheDocument();
  });
});
