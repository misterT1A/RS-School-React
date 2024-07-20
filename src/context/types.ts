import type { Dispatch, ReactNode, SetStateAction } from 'react';

export enum ThemeEnum {
  Light = 'light',
  Dark = 'dark',
}

export interface IThemeContextType {
  state: ThemeEnum;
  setState: Dispatch<SetStateAction<ThemeEnum>>;
}

export interface IThemeProviderProps {
  children: ReactNode;
}
