import reducer, { setPlanet, deletePlanet } from '../../store/detailedSlice';
import type { IPlanet } from '../../types/rootTypes';

describe('FavoritesSlice', () => {
  it('should return default state', () => {
    const result = reducer(undefined, { type: '' });

    expect(result).toEqual({ currentPlanet: null });
  });

  it('Should add new planet with "setPlanet"', () => {
    const action = {
      type: setPlanet.type,
      payload: { id: '1', name: 'test' },
    };

    const result = reducer({ currentPlanet: null }, action);

    expect(result.currentPlanet?.id).toBe('1');
    expect(result.currentPlanet?.name).toBe('test');
  });

  it('Should delete all planet with "deletePlanet"', () => {
    const action = {
      type: deletePlanet.type,
      payload: '',
    };

    const result = reducer({ currentPlanet: { id: '1', name: 'test' } as IPlanet }, action);
    expect(result.currentPlanet).toBe(null);
  });
});
