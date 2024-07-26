import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import styles from '../../Components/result-list/_Result-list.module.scss';
import ResultList from '../../Components/result-list/Result-list';
import '@testing-library/jest-dom';
import { getClassName } from '../../Components/result-list/result-list-helpers';
import { ThemeContext, ThemeEnum } from '../../context';
import { mockPlanet } from '../../mock/handlers';
import { addFavorite, deleteFavorite } from '../../store/favoriteSlice';
import store from '../../store/store';
import type { IPlanet } from '../../types/rootTypes';

describe('ResultList', () => {
  const planet1 = { ...mockPlanet, url: '/planets/1' };
  const planet2 = { ...mockPlanet, name: 'test', url: '/planets/2' };
  const planets = [planet1, planet2];
  const searchParams = new URLSearchParams();
  const isDetailedVisible = false;
  const setIsDetailedVisible = jest.fn();

  const spy = jest.spyOn(store, 'dispatch');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = (planetsArray: IPlanet[]): RenderResult =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeContext.Provider value={{ theme: ThemeEnum.Light, setTheme: jest.fn() }}>
            <ResultList
              planets={planetsArray}
              searchParams={searchParams}
              isDetailedVisible={isDetailedVisible}
              setIsDetailedVisible={setIsDetailedVisible}
            />
          </ThemeContext.Provider>
        </MemoryRouter>
      </Provider>,
    );

  it('renders a list of planets', () => {
    setup(planets);

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('renders "No results" when no planets are provided', () => {
    setup([]);

    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('calls setIsDetailedVisible when a planet is clicked', () => {
    setup(planets);

    const planetLink = screen.getByText('Tatooine').closest('a') as HTMLAnchorElement;
    fireEvent.click(planetLink);

    expect(setIsDetailedVisible).toHaveBeenCalledWith(true);
  });

  it('dispatches addFavorite action when the favorite button is clicked', () => {
    setup(planets);

    const addFavoriteButton = screen.getAllByRole('button')[0];
    fireEvent.click(addFavoriteButton);

    expect(store.getState().favorite.planets).toContainEqual(mockPlanet);
    expect(spy).toHaveBeenCalledWith(addFavorite(planet1));
  });

  it('dispatches deleteFavorite action when the favorite button is clicked', () => {
    store.dispatch(addFavorite(mockPlanet));

    setup(planets);

    const removeFavoriteButton = screen.getAllByRole('button')[0];
    fireEvent.click(removeFavoriteButton);

    expect(store.getState().favorite.planets).not.toContainEqual(mockPlanet);
    expect(spy).toHaveBeenCalledWith(deleteFavorite(planet1));
  });
});

describe('getClassName', () => {
  it('should return the correct class when isActive is true', () => {
    const className = getClassName({ isActive: true, isPending: false });
    expect(className).toBe(`${styles.list_item} ${styles.active}`);
  });

  it('should return the correct class when isPending is true', () => {
    const className = getClassName({ isActive: false, isPending: true });
    expect(className).toBe(`${styles.list_item} ${styles.pending}`);
  });

  it('should return the default class when both isActive and isPending are false', () => {
    const className = getClassName({ isActive: false, isPending: false });
    expect(className).toBe(styles.list_item);
  });

  it('should prioritize isActive over isPending', () => {
    const className = getClassName({ isActive: true, isPending: true });
    expect(className).toBe(`${styles.list_item} ${styles.active}`);
  });
});
