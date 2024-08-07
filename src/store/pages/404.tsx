import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import styles from '@/components/ErrorBoundary/_Error-page.module.scss';
import btnStyles from '@/UI/button/_button.module.scss';

const Custom404 = (): ReactNode => {
  const router = useRouter();
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>404 Page not found</h1>
      <button data-testid="return-button" type="button" className={btnStyles.button} onClick={() => router.push('/')}>
        return to main page
      </button>
    </section>
  );
};

export default Custom404;
