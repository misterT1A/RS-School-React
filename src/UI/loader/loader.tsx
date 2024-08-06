import type { ReactElement } from 'react';

import styles from './loader.module.css';

const Loader = (): ReactElement => <div data-testid="loader" className={styles.loader} />;

export default Loader;
