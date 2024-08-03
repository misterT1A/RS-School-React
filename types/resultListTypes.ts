import type { Dispatch } from 'react';
import type React from 'react';

import type { IPageState, IPlanet } from './rootTypes';
import { ISearchUrlParams } from '@/hooks';

export interface IResultListProps {
  planets: IPlanet[];
  // searchParams: URLSearchParams;
  searchParams: ISearchUrlParams;
  isDetailedVisible: boolean;
  setIsDetailedVisible: Dispatch<React.SetStateAction<boolean>>;
}

export interface IPagination {
  state: IPageState;
  setState: React.Dispatch<React.SetStateAction<IPageState>>;
  // searchParams: URLSearchParams;
  handleClickVisible: (event: React.MouseEvent) => void;
}
