import type { ReactElement } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './_Result-list.module.scss';
import type { IPagination } from '../../types/resultListTypes';

const PaginationBlock = ({ maxPage }: IPagination): ReactElement => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleStateLoader = (pageNumber: number): void => {
    const query = searchParams.get('query')?.toString() || '';
    const page = pageNumber.toString() || '1';

    navigate(`/?query=${query}&page=${page}`);
  };

  return (
    <div className={styles.pagination}>
      {Array.from({ length: maxPage }, (_, i) => i + 1).map((elem) => (
        <li key={elem}>
          <button
            role="link"
            type="button"
            className={`${styles.pagination_btn} ${+(searchParams.get('page') || 1) === elem ? styles.active : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleStateLoader(elem);
            }}
          >
            {elem}
          </button>
        </li>
      ))}
    </div>
  );
};

export default PaginationBlock;
