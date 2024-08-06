import type { IPlanet } from '@/types/rootTypes';

type ReturnType = [keyof IPlanet, IPlanet[keyof IPlanet]][];

const filterPlanet = (planet: IPlanet): ReturnType => {
  const newData = Object.entries(planet) as ReturnType;
  return newData.filter((elem) => elem[0] !== 'residents' && elem[0] !== 'films' && elem[0] !== 'url');
};

export default filterPlanet;
