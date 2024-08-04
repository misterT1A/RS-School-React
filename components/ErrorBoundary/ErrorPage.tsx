import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import styles from './_Error-page.module.scss';
import btnStyles from '../../UI/button/_button.module.scss';

const ErrorPage = (): ReactNode => {
  const router = useRouter();
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Something went wrong</h1>
      <button data-testid="return-button" type="button" className={btnStyles.button} onClick={() => router.push('/')}>
        return to main page
      </button>
    </section>
  );
};

export default ErrorPage;
