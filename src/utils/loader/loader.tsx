import type { ReactNode } from 'react';
import { Component } from 'react';

import styles from './loader.module.css';

export default class Loader extends Component {
  render(): ReactNode {
    return <div className={styles.loader} />;
  }
}
