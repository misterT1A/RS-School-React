import classNames from 'classnames';
import type { ReactElement } from 'react';
import { useContext } from 'react';

import styles from './theme-button.module.scss';
import { ThemeContext, ThemeEnum } from '../../context/index';

const ThemeTogler = (): ReactElement => {
  const { theme, setTheme } = useContext(ThemeContext);

  const sectionClass = classNames(styles.knob, {
    [styles.light]: theme === ThemeEnum.Light,
    [styles.dark]: theme === ThemeEnum.Dark,
  });

  return (
    <div id="themeTogler" className={styles.container}>
      <button
        name="button"
        aria-label="button"
        type="button"
        data-testid="theme-toggle-button"
        className={styles.switch}
        onClick={() => setTheme(theme === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light)}
      >
        <div className={sectionClass} />
      </button>
    </div>
  );
};

export default ThemeTogler;
