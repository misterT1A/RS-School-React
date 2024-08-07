// import type React from 'react';

import type { ISearchUrlParams } from '@/hooks';

import type { IPlanet } from './rootTypes';

export interface IResultListProps {
  planets: IPlanet[];
  searchParams: ISearchUrlParams;
  isDetailedVisible: boolean;
  // setIsDetailedVisible: Dispatch<React.SetStateAction<boolean>>;
}

export interface IPagination {
  // state: IPageState;
  // setState: React.Dispatch<React.SetStateAction<IPageState>>;
  // handleClickVisible: (event: React.MouseEvent) => void;
  maxPage: number;
}
