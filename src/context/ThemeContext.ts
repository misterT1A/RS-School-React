import React from 'react';

import { ThemeEnum, type IThemeContextType } from './types';

const defaultState: IThemeContextType = {
  theme: ThemeEnum.Light,
  setTheme: () => {
    console.log('Theme setting function not implemented yet.');
  },
};

const ThemeContext = React.createContext<IThemeContextType>(defaultState);

export default ThemeContext;
