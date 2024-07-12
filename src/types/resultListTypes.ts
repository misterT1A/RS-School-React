import type { Dispatch } from 'react';
import type React from 'react';

import type { IState } from './rootTypes';

export interface IResultListProps {
  state: IState;
  searchParams: URLSearchParams;
  isDetailedVisible: boolean;
  setIsDetailedVisible: Dispatch<React.SetStateAction<boolean>>;
}

export interface IPagination {
  state: IState;
  setState: React.Dispatch<React.SetStateAction<IState>>;
  searchParams: URLSearchParams;
  handleClickVisible: (event: React.MouseEvent) => void;
}
