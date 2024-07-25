import { useContext } from 'react';

import { ThemeContext, ThemeEnum } from '../context';

const useClassThemeTogler = (defaultStyles: string, changestyles: string): string => {
  const { theme } = useContext(ThemeContext);
  const stylesTheme = theme === ThemeEnum.Dark ? changestyles : '';
  return `${defaultStyles} ${stylesTheme}`;
};

export default useClassThemeTogler;
