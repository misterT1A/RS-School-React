import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './_Error-page.module.scss';

const ErrorPage = (): ReactNode => {
  const navigate = useNavigate();
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Something went wrong</h1>
      <button type="button" className={styles.button} onClick={() => navigate('/')}>
        return to main page
      </button>
    </section>
  );
};

export default ErrorPage;
