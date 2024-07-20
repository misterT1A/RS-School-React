import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import ThemeContext from './ThemeContext';
import { ThemeEnum } from './types';
import type { IThemeProviderProps } from './types';

const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }): ReactNode => {
  const [state, setState] = useState<ThemeEnum>(ThemeEnum.Light);

  const value = useMemo(() => ({ state, setState }), [state, setState]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
