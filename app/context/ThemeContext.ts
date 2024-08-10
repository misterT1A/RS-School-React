import React from 'react';

import { ThemeEnum, type IThemeContextType } from './types';

const defaultState: IThemeContextType = {
  theme: ThemeEnum.Light,
  setTheme: () => {},
};

const ThemeContext = React.createContext<IThemeContextType>(defaultState);

export default ThemeContext;
