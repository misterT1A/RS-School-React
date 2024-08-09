// import type { Dispatch } from 'react';
// import type React from 'react';

import type { IPlanet } from './rootTypes';

// export interface IResultListProps {
//   planets: IPlanet[];
//   searchParams: URLSearchParams;
//   isDetailedVisible: boolean;
//   setIsDetailedVisible: Dispatch<React.SetStateAction<boolean>>;
// }

// export interface IPagination {
//   state: IPageState;
//   setState: React.Dispatch<React.SetStateAction<IPageState>>;
//   searchParams: URLSearchParams;
//   handleClickVisible: (event: React.MouseEvent) => void;
// }

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
