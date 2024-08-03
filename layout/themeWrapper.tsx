import useClassThemeToggler from '@/hooks/useClassThemTogler';
import { ReactNode } from 'react';

import styles from '@/components/root/_root.module.scss';

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  return <section className={useClassThemeToggler(styles.themeWrapper, styles.dark)}>{children}</section>;
};

export default ThemeWrapper;
