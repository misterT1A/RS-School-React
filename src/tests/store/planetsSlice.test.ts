import reducer, { setPlanets } from '../../store/planetsSlice';

describe('PlanetsSlice', () => {
  it('should return default state', () => {
    const result = reducer(undefined, { type: '' });

    expect(result).toEqual({ planets: [] });
  });

  it('Should add new planets with "setPlanets"', () => {
    const action = {
      type: setPlanets.type,
      payload: [{ id: '1', name: 'test' }],
    };

    const result = reducer({ planets: [] }, action);

    expect(result.planets[0].id).toBe('1');
    expect(result.planets[0].name).toBe('test');
  });
});
