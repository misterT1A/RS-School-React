import type { ReactElement } from 'react';

import styles from './_Result-list.module.scss';
import PlanetElement from './PlanetElement';
import type { IResultListProps } from '../../types/resultListTypes';

const ResultList = ({ planets, searchParams, isDetailedVisible }: IResultListProps): ReactElement => {
  const { details } = searchParams;

  return (
    <section className={styles.wrapper_load}>
      {planets.length ? (
        <nav className={styles.wrapper_load}>
          <ul className={isDetailedVisible ? styles.list_column : styles.list_center}>
            {planets.map((elem) => (
              <li id="planets" key={elem.url}>
                <PlanetElement planet={elem} details={details?.toString() || ''} />
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
