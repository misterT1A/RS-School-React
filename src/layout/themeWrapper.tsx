import type { ReactNode } from 'react';

import styles from '@/components/root/_root.module.scss';
import useClassThemeToggler from '@/hooks/useClassThemTogler';

const ThemeWrapper = ({ children }: { children: ReactNode }) => (
  <section className={useClassThemeToggler(styles.themeWrapper, styles.dark)}>{children}</section>
);

export default ThemeWrapper;
