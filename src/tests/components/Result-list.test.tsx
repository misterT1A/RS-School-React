import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';

import PlanetElement from '@/components/result-list/PlanetElement';
import ResultList from '@/components/result-list/Result-list';
import { useAppDispatch, useAppSelector } from '@/hooks';
import mockStore from 'mock/mockStore';

import { mockPlanet } from '../../../mock/handlers';
import '@testing-library/jest-dom';
import styles from '../../components/result-list/_Result-list.module.scss';
import { ThemeContext, ThemeEnum } from '../../context';
import type { IPlanet } from '../../types/rootTypes';

jest.mock('../../hooks', () => ({
  useSearchUrl: jest.fn().mockReturnValue({ q: 'test', page: 1 }),
}));

jest.mock('../../hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ replace: jest.fn(), push: jest.fn() }),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams({ query: 'ta', page: '1', details: '1' })),
}));

describe('ResultList', () => {
  const planet1 = { ...mockPlanet, url: '/planets/1/1/' };
  const planet2 = { ...mockPlanet, name: 'test' };
  const planets = [planet1, planet2];
  const searchParams = { q: 'test', page: 1 };
  let isDetailedVisible = false;

  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue([]);
  });

  const setup = (planetsArray: IPlanet[]): RenderResult =>
    render(
      <Provider store={mockStore}>
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

jest.mock('../../components/favorite-button/FavoriteButton.tsx', () => () => (
  <button type="button">FavoriteButton</button>
));

describe('PlanetElement', () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams({ query: 'earth', page: '1', details: '1' }));
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

    expect(mockPush).toHaveBeenCalledWith('?query=earth&page=1&details=1');
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
