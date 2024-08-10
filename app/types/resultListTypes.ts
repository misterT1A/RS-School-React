import type { IPlanet } from './rootTypes';

export interface IResultListProps {
  planets: IPlanet[];
  searchParams: ISearchUrlParams;
  isDetailedVisible: boolean;
}

export interface IPagination {
  maxPage: number;
}

export interface ISearchUrlParams {
  query: string;
  page: number;
  details?: number;
}
