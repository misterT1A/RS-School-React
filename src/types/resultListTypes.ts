import type { IPlanet, ISearchUrlParams } from './rootTypes';

export interface IResultListProps {
  planets: IPlanet[];
  searchParams: ISearchUrlParams;
  isDetailedVisible: boolean;
}

export interface IPagination {
  maxPage: number;
}
