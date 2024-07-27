import { useContext } from 'react';

import { ThemeContext, ThemeEnum } from '../context';

const useClassThemeToggler = (defaultStyles: string, changestyles: string): string => {
  const { theme } = useContext(ThemeContext);
  const stylesTheme = theme === ThemeEnum.Dark ? changestyles : '';
  return `${defaultStyles} ${stylesTheme}`;
};

export default useClassThemeToggler;
