import { useState, type ReactNode } from 'react';
// import { useSearchParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import styles from './_root.module.scss';
import ResultList from '../Components/result-list/Result-list';
import SearchBlock from '../Components/search-block/SearchBlock';
import type { IState } from '../types/rootTypes';

const Root = (): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isProductVisible, setIsProductVisible] = useState<boolean>(true);
  const [state, setState] = useState<IState>({
    isLoad: true,
    searchValue: '',
    page: 1,
    maxPage: 1,
    data: null,
  });

  console.log(isProductVisible, setState);

  return (
    <section className={styles.wrapper}>
      <div
        className={styles.wrapper_results_center}
        // role="button"
        // tabIndex={0}
        // onClick={() => {
        //   setIsProductVisible(false);
        //   navigate(`/?${searchParams.toString()}`);
        // }}
        // onKeyDown={handleWrapperLeftKeyDown}
      >
        <h1 className={styles.title}>Planet search</h1>
        <SearchBlock searchParams={searchParams} setSearchParams={setSearchParams} />
        <ResultList state={state} searchParams={searchParams} setIsProductVisible={setIsProductVisible} />
      </div>
      <div className={styles.detailed_wrapper} />
    </section>
  );
};

export default Root;
