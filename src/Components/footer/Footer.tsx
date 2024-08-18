import type { ReactElement } from 'react';

import styles from './footer.module.scss';
import rsLogo from '../../Assets/rs_school_js.svg';

const Footer = (): ReactElement => (
  <footer className={styles.footer}>
    <img src={rsLogo} alt="rsLogo" />
    <span>2024</span>
  </footer>
);

export default Footer;
