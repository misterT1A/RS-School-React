/* eslint-disable no-nested-ternary */
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './_Products-block.module.scss';
import { extractLastNumber, getClassName } from './result-list-helpers';
import type IResultListProps from '../../types/resultListTypes';
import Loader from '../../utils/loader/loader';

const ResultList = ({ state, searchParams, setIsProductVisible }: IResultListProps): ReactNode => {
  console.log('g');
  return (
    <section className={styles.list_wrapper}>
      {state.isLoad ? (
        <Loader />
      ) : state.data?.length ? (
        <>
          <nav>
            <ul className={styles.list}>
              {state.data.map((elem) => (
                <li key={elem.url}>
                  <NavLink
                    to={`products/${extractLastNumber(elem.url ? elem.url : '')}?q=${searchParams.get('q') || ''}&page=${searchParams.get('page') || '1'}`}
                    className={getClassName}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProductVisible(true);
                    }}
                  >
                    <p className={styles.title}>Planet: {elem.name}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          {/* pagination */}
        </>
      ) : (
        <h2>No results</h2>
      )}
    </section>
  );
};

export default ResultList;
