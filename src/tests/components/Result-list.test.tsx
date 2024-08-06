import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';

import ResultList from '@/components/result-list/Result-list';
import createMockRouter from 'mock/createMockRouter';
import mockStore from 'mock/mockStore';

import { mockPlanet } from '../../../mock/handlers';
import '@testing-library/jest-dom';
import styles from '../../components/result-list/_Result-list.module.scss';
import { ThemeContext, ThemeEnum } from '../../context';
import { addFavorite, deleteFavorite } from '../../store/favoriteSlice';
import type { IPlanet } from '../../types/rootTypes';

jest.mock('../../hooks', () => ({
  useSearchUrl: jest.fn().mockReturnValue({ q: 'test', page: 1 }),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: { details: '1' },
    replace: jest.fn(),
  })),
}));

describe('ResultList', () => {
  const planet1 = { ...mockPlanet, url: '/planets/1/1/' };
  const planet2 = { ...mockPlanet, name: 'test' };
  const planets = [planet1, planet2];
  const searchParams = { q: 'test', page: 1 };
  let isDetailedVisible = false;
  const setIsDetailedVisible = jest.fn();

  const spy = jest.spyOn(mockStore, 'dispatch');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = (planetsArray: IPlanet[]): RenderResult =>
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={mockStore}>
          <ThemeContext.Provider value={{ theme: ThemeEnum.Light, setTheme: jest.fn() }}>
            <ResultList
              planets={planetsArray}
              searchParams={searchParams}
              isDetailedVisible={isDetailedVisible}
              setIsDetailedVisible={setIsDetailedVisible}
            />
          </ThemeContext.Provider>
        </Provider>
        ,
      </RouterContext.Provider>,
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

    const planetLink = screen.getByText('Tatooine').closest('div') as HTMLDivElement;
    fireEvent.click(planetLink);

    expect(setIsDetailedVisible).toHaveBeenCalledWith(true);
  });

  it('changes classname for item when detailed is show', () => {
    setup(planets);

    const planetLink1 = screen.getByText('Tatooine').closest('div') as HTMLDivElement;
    const planetLink2 = screen.getByText('test').closest('div') as HTMLDivElement;
    expect(planetLink1).toHaveClass(`${styles.list_item} ${styles.active}`);
    expect(planetLink2).toHaveClass(styles.list_item);
  });

  it('changes classname for list when detailed is not show', () => {
    setup(planets);

    const ul = screen.getByText('Tatooine').closest('ul') as HTMLUListElement;

    expect(ul).toHaveClass(styles.list_center);
  });

  it('changes classname for list when detailed is show', () => {
    isDetailedVisible = true;
    setup(planets);

    const ul = screen.getByText('Tatooine').closest('ul') as HTMLUListElement;

    expect(ul).toHaveClass(styles.list_column);
    isDetailedVisible = false;
  });

  it('dispatches addFavorite action when the favorite button is clicked', () => {
    setup(planets);

    const addFavoriteButton = screen.getAllByRole('button')[0];
    fireEvent.click(addFavoriteButton);

    expect(mockStore.getState().favorite.planets).toContainEqual(mockPlanet);
    expect(spy).toHaveBeenCalledWith(addFavorite(planet1));
  });

  it('dispatches deleteFavorite action when the favorite button is clicked', () => {
    mockStore.dispatch(addFavorite(mockPlanet));

    setup(planets);

    const removeFavoriteButton = screen.getAllByRole('button')[0];
    fireEvent.click(removeFavoriteButton);

    expect(mockStore.getState().favorite.planets).not.toContainEqual(mockPlanet);
    expect(spy).toHaveBeenCalledWith(deleteFavorite(planet1));
  });
});
