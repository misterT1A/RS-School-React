'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';

import styles from './_Result-list.module.scss';
import type { IPagination } from '../../types/resultListTypes';

const PaginationBlock = ({ maxPage }: IPagination): ReactElement => {
  // const router = useRouter();
  const searchParams = useSearchParams();

  const handleStateLoader = (pageNumber: number): string => {
    const newSearchParam = new URLSearchParams({
      query: searchParams.get('query')?.toString() || '',
      page: pageNumber.toString() || '1',
    });
    // router.replace(`/?${newSearchParam.toString()}`);
    return `/?${newSearchParam.toString()}`;
  };

  return (
    <div className={styles.pagination}>
      {Array.from({ length: maxPage }, (_, i) => i + 1).map((elem) => (
        <li key={elem}>
          <Link
            href={handleStateLoader(elem)}
            // type="button"
            className={`${styles.pagination_btn} ${+(searchParams.get('page') || 1) === elem ? styles.active : ''}`}
            // onClick={(e) => {
            //   e.stopPropagation();
            //   handleStateLoader(elem);
            // }}
          >
            {elem}
          </Link>
        </li>
      ))}
    </div>
  );
};

export default PaginationBlock;
