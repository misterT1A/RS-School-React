import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from '../../components/result-list/_Result-list.module.scss';
import PlanetElement from '../../Components/result-list/PlanetElement';
import ResultList from '../../Components/result-list/Result-list';
import { ThemeContext, ThemeEnum } from '../../context';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { mockPlanet } from '../../mock/handlers';
import store from '../../store/store';
import type { IPlanet } from '../../types/rootTypes';

jest.mock('../../hooks', () => ({
  useSearchUrl: jest.fn().mockReturnValue({ q: 'test', page: 1 }),
}));

jest.mock('../../hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({ pathname: '/details/1' }),
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
  useSearchParams: jest.fn().mockReturnValue([new URLSearchParams({ query: 'ta', page: '1' })]),
}));

describe('ResultList', () => {
  const planet1 = { ...mockPlanet, url: '/planets/1/1/' };
  const planet2 = { ...mockPlanet, name: 'test' };
  const planets = [planet1, planet2];
  const searchParams = { query: 'test', page: 1 };
  let isDetailedVisible = false;

  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue([]);
  });

  const setup = (planetsArray: IPlanet[]): RenderResult =>
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: ThemeEnum.Light, setTheme: jest.fn() }}>
          <ResultList planets={planetsArray} searchParams={searchParams} isDetailedVisible={isDetailedVisible} />
        </ThemeContext.Provider>
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
});

jest.mock(
  '../../Components/favorite-button/Favorite-button.tsx',
  () => (): ReactElement => <button type="button">FavoriteButton</button>,
);

describe('PlanetElement', () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockPush);
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams({ query: 'earth', page: '1' })]);
  });

  const planet = {
    name: 'Tatooine',
    url: 'https://swapi.dev/api/planets/1/',
  } as IPlanet;

  test('renders the planet name', () => {
    render(<PlanetElement planet={planet} details="1" />);

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });

  test('applies active class when the planet is selected', () => {
    render(<PlanetElement planet={planet} details="1" />);

    const planetElement = screen.getByText('Tatooine').closest('div');
    expect(planetElement).toHaveClass('active');
  });

  test('does not apply active class when the planet is not selected', () => {
    render(<PlanetElement planet={planet} details="2" />);

    const planetElement = screen.getByText('Tatooine').closest('div');
    expect(planetElement).not.toHaveClass('active');
  });

  test('pushes new search params when planet is clicked', () => {
    render(<PlanetElement planet={planet} details="2" />);

    const planetElement = screen.getByText('Tatooine').closest('div');
    fireEvent.click(planetElement!);

    expect(mockPush).toHaveBeenCalledWith('/details/1?query=earth&page=1');
  });

  test('renders the favorite button', () => {
    render(<PlanetElement planet={planet} details="1" />);

    expect(screen.getByText('FavoriteButton')).toBeInTheDocument();
  });

  test('renders the planet name with dark class when theme is dark', () => {
    render(
      <ThemeContext.Provider value={{ theme: ThemeEnum.Dark, setTheme: jest.fn() }}>
        <PlanetElement planet={planet} details="1" />
      </ThemeContext.Provider>,
    );

    const planetName = screen.getByText('Tatooine');
    expect(planetName).toHaveClass('dark');
  });

  test('renders the planet name without dark class when theme is light', () => {
    render(
      <ThemeContext.Provider value={{ theme: ThemeEnum.Light, setTheme: jest.fn() }}>
        <PlanetElement planet={planet} details="1" />
      </ThemeContext.Provider>,
    );

    const planetName = screen.getByText('Tatooine');
    expect(planetName).not.toHaveClass('dark');
  });
});
