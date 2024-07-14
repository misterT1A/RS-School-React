import classNames from 'classnames';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './_Result-list.module.scss';
import { extractLastNumber, getClassName } from './result-list-helpers';
import type { IResultListProps } from '../../types/resultListTypes';
import Loader from '../../utils/loader/loader';

const ResultList = ({ state, searchParams, isDetailedVisible, setIsDetailedVisible }: IResultListProps): ReactNode => {
  const sectionClass = classNames({
    [styles.wrapper_load]: state.isLoad && isDetailedVisible,
  });

  return (
    <section className={sectionClass}>
      {state.isLoad ? (
        <Loader />
      ) : (
        <div>
          {state.data?.length ? (
            <nav>
              <ul className={isDetailedVisible ? styles.list_column : styles.list_center}>
                {state.data.map((elem) => (
                  <li id="planets" key={elem.url}>
                    <NavLink
                      to={`planets/${extractLastNumber(elem.url ? elem.url : '')}?q=${searchParams.get('q') || ''}&page=${searchParams.get('page') || '1'}`}
                      className={getClassName}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDetailedVisible(true);
                      }}
                    >
                      <p className={styles.title}>{elem.name}</p>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <h2>No results</h2>
          )}
        </div>
      )}
    </section>
  );
};

export default ResultList;
