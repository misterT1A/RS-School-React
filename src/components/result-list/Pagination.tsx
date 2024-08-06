import Link from 'next/link';
import type { ReactElement } from 'react';

import { useSearchUrl } from '@/hooks';

import styles from './_Result-list.module.scss';
import type { IPagination } from '../../types/resultListTypes';

const PaginationBlock = ({ state, setState, handleClickVisible }: IPagination): ReactElement => {
  const searchParams = useSearchUrl();

  const handleStateLoader = (pageNumber: number): void => {
    setState((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));
  };

  return (
    <div className={styles.pagination}>
      {Array.from({ length: state.maxPage }, (_, i) => i + 1).map((elem) => (
        <li key={elem}>
          <Link
            href={`?q=${searchParams.q || ''}&page=${elem}`}
            className={`${styles.pagination_btn} ${+(searchParams.page || 1) === elem ? styles.active : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleStateLoader(elem);
              handleClickVisible(e);
            }}
          >
            {elem}
          </Link>
        </li>
      ))}
    </div>
  );
};

export default PaginationBlock;
