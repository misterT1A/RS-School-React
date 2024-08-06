import type { Dispatch, ReactElement, SetStateAction } from 'react';

export enum ThemeEnum {
  Light = 'light',
  Dark = 'dark',
}

export interface IThemeContextType {
  theme: ThemeEnum;
  setTheme: Dispatch<SetStateAction<ThemeEnum>>;
}

export interface IThemeProviderProps {
  children: ReactElement;
}
