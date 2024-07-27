import type { ReactNode } from 'react';

import styles from './loader.module.css';

const Loader = (): ReactNode => <div data-testid="loader" className={styles.loader} />;

export default Loader;
