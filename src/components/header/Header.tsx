'use client';

import type { ReactElement } from 'react';

import useClassThemeToggler from '@/hooks/useClassThemTogler';
import styles from '@/styles/_root.module.scss';

import SearchBlock from '../search-block/SearchBlock';
import ThemeTogler from '../theme-button/Theme-button';

const Header = (): ReactElement => (
  <header className={useClassThemeToggler(styles.headerWrapper, styles.dark)}>
    <section className={useClassThemeToggler(styles.header, styles.dark)}>
      <h1 className={useClassThemeToggler(styles.title, styles.dark)}>Planet search</h1>
      <div className={styles.controlBlock}>
        <SearchBlock />
        <ThemeTogler />
      </div>
    </section>
  </header>
);

export default Header;
