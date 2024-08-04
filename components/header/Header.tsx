import type { ReactNode } from 'react';

import useClassThemeToggler from '@/hooks/useClassThemTogler';

import styles from '../root/_root.module.scss';
import SearchBlock from '../search-block/SearchBlock';
import ThemeTogler from '../theme-button/Theme-button';

const Header = (): ReactNode => (
  <header className={useClassThemeToggler(styles.header, styles.dark)}>
    <h1 className={useClassThemeToggler(styles.title, styles.dark)}>Planet search</h1>
    <div className={styles.controlBlock}>
      <SearchBlock />
      <ThemeTogler />
    </div>
  </header>
);

export default Header;
