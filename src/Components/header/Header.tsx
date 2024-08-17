import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './header.module.scss';
import getClassName from '../../utils/getClassName';

import logo from '@/Assets/forms.svg';

const Header = (): ReactElement => (
  <header className={styles.header}>
    <img className={styles.logo} src={logo} alt="form-image" />
    <nav>
      <ul className={styles.Link_list}>
        <li>
          <NavLink className={getClassName} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={getClassName} to="/uncontrolled">
            Uncontrolled
          </NavLink>
        </li>
        <li>
          <NavLink className={getClassName} to="/controlled">
            Controlled
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
