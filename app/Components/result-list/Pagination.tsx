// import type { ReactNode } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';

// import styles from './_Result-list.module.scss';
// import type { IPagination } from '../../types/resultListTypes';

// const PaginationBlock = ({ state, setState, searchParams, handleClickVisible }: IPagination): ReactNode => {
//   const navigate = useNavigate();

//   const handleStateLoader = (pageNumber: number): void => {
//     setState((prevState) => ({
//       ...prevState,
//       currentPage: pageNumber,
//     }));

//     navigate(`/?${searchParams.toString()}`);
//   };

//   return (
//     <div className={styles.pagination}>
//       {Array.from({ length: state.maxPage }, (_, i) => i + 1).map((elem) => (
//         <li key={elem}>
//           <NavLink
//             to={`?q=${searchParams.get('q') || ''}&page=${elem}`}
//             className={`${styles.pagination_btn} ${+(searchParams.get('page') || 1) === elem ? styles.active : ''}`}
//             onClick={(e) => {
//               e.stopPropagation();
//               handleStateLoader(elem);
//               handleClickVisible(e);
//             }}
//           >
//             {elem}
//           </NavLink>
//         </li>
//       ))}
//     </div>
//   );
// };

// export default PaginationBlock;

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
