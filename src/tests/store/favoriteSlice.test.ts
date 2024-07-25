import reducer, { addFavorite, deleteFavorite, deleteAllFavorites } from '../../store/favoriteSlice';
import type { IPlanet } from '../../types/rootTypes';
// import type { IPlanet } from '../../types/rootTypes';

describe('FavoritesSlice', () => {
  it('should return default state', () => {
    const result = reducer(undefined, { type: '' });

    expect(result).toEqual({ planets: [] });
  });

  it('Should add new favorite with "addFavorite"', () => {
    const action = {
      type: addFavorite.type,
      payload: { id: '1', name: 'test' },
    };

    const result = reducer({ planets: [] }, action);

    expect(result.planets[0].id).toBe('1');
    expect(result.planets[0].name).toBe('test');
  });

  it('Should delete favorite with "deleteFavorite"', () => {
    const action = {
      type: deleteFavorite.type,
      payload: { id: '1', name: 'test' },
    };

    const result = reducer({ planets: [{ id: '1', name: 'test' } as IPlanet] }, action);
    expect(result.planets.length).toBe(0);
  });

  it('Should delete all favorites with "deleteAllFavorites"', () => {
    const action = {
      type: deleteAllFavorites.type,
      payload: '',
    };

    const result = reducer({ planets: [{ id: '1', name: 'test' } as IPlanet] }, action);
    expect(result.planets.length).toBe(0);
  });
});
