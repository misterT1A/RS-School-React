import Link from 'next/link';
import type { ReactNode } from 'react';

import styles from '@/components/ErrorBoundary/_Error-page.module.scss';
import btnStyles from '@/UI/button/_button.module.scss';

const Custom404 = (): ReactNode => (
  <section className={styles.wrapper}>
    <h1 className={styles.title}>404 Page not found</h1>
    <Link data-testid="return-button" type="button" className={btnStyles.button} href="/">
      return to main page
    </Link>
  </section>
);

export default Custom404;
