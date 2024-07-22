import classNames from 'classnames';
import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './_Result-list.module.scss';
import type { IPagination } from '../../types/resultListTypes';

const PaginationBlock = ({ state, setState, searchParams, handleClickVisible }: IPagination): ReactNode => {
  const navigate = useNavigate();

  const handleStateLoader = (pageNumber: number): void => {
    setState((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));

    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <div className={styles.pagination}>
      {Array.from({ length: state.maxPage }, (_, i) => i + 1).map((elem) => (
        <li key={elem}>
          <NavLink
            to={`?q=${searchParams.get('q') || ''}&page=${elem}`}
            className={classNames(styles.pagination_btn, {
              [styles.active]: +(searchParams.get('page') || 1) === elem,
            })}
            onClick={(e) => {
              e.stopPropagation();
              handleStateLoader(elem);
              handleClickVisible(e);
            }}
          >
            {elem}
          </NavLink>
        </li>
      ))}
    </div>
  );
};

export default PaginationBlock;
