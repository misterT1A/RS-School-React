import type { Dispatch } from 'react';

import type { IState } from './rootTypes';

export default interface IResultListProps {
  state: IState;
  searchParams: URLSearchParams;
  setIsProductVisible: Dispatch<React.SetStateAction<boolean>>;
}
