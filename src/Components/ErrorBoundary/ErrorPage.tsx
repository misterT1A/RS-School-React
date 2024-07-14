import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './_Error-page.module.scss';
import btnStyles from '../../utils/button/_button.module.scss';

const ErrorPage = (): ReactNode => {
  const navigate = useNavigate();
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Something went wrong</h1>
      <button data-testid="return-button" type="button" className={btnStyles.button} onClick={() => navigate('/')}>
        return to main page
      </button>
    </section>
  );
};

export default ErrorPage;
