import React from 'react';

import { ThemeEnum, type IThemeContextType } from './types';

const defaultState: IThemeContextType = {
  state: ThemeEnum.Light,
  setState: () => {},
};

const ThemeContext = React.createContext<IThemeContextType>(defaultState);

export default ThemeContext;
