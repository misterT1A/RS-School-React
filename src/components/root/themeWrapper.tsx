'use client';

import type { ReactElement } from 'react';

import useClassThemeToggler from '@/hooks/useClassThemTogler';
import styles from '@/styles/_root.module.scss';

const ThemeWrapper = ({ children }: { children: ReactElement }) => (
  <section className={useClassThemeToggler(styles.themeWrapper, styles.dark)}>
    <section className={useClassThemeToggler(styles.app, styles.dark)}>{children}</section>
  </section>
);

export default ThemeWrapper;
