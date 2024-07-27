import type { IPlanet } from '../types/rootTypes';

type returnType = Array<[keyof IPlanet, IPlanet[keyof IPlanet]]>;

const filterPlanet = (planet: IPlanet): returnType => {
  const newData = Object.entries(planet) as returnType;
  return newData.filter((elem) => elem[0] !== 'residents' && elem[0] !== 'films' && elem[0] !== 'url');
};

export default filterPlanet;
