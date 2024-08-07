'use client';

import React, { useMemo, useState } from 'react';
import type { ReactElement } from 'react';

import ThemeContext from './ThemeContext';
import { ThemeEnum } from './types';
import type { IThemeProviderProps } from './types';

const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }): ReactElement => {
  const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.Light);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
