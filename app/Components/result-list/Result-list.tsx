import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './_Result-list.module.scss';
import PlanetElement from './PlanetElement';
import type { IResultListProps } from '../../types/resultListTypes';

const ResultList = ({ planets, isDetailedVisible }: IResultListProps): ReactElement => {
  const location = useLocation();

  const match = location.pathname.match(/\d+/);
  const id = match ? match[0] : null;

  return (
    <section className={styles.wrapper_load}>
      {planets.length ? (
        <nav className={styles.wrapper_load}>
          <ul className={isDetailedVisible ? styles.list_column : styles.list_center}>
            {planets.map((elem) => (
              <li id="planets" key={elem.name}>
                <PlanetElement planet={elem} details={id as string} />
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <h2>No results</h2>
      )}
    </section>
  );
};

export default ResultList;
