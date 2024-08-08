'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';

import styles from './_SearchBlock.module.scss';
import { useSetToLS } from '../../hooks';
import btnStyles from '../../UI/button/_button.module.scss';

const SearchBlock = (): ReactElement => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [valueLS, setSearchValueLS] = useSetToLS('Nextjs-Task');

  const handleSearchSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const query = new FormData(form).get('q') as string;

    const newSearchParams = new URLSearchParams({ query, page: '1' });
    if (searchParams.get('query') === query) {
      return;
    }
    setSearchValueLS(() => query);
    router.replace(`?${newSearchParams}`);
  };

  return (
    <form id="search-form" role="search" className={styles.wrapper} onSubmit={handleSearchSubmit}>
      <input
        id="input"
        type="search"
        name="q"
        placeholder="Search"
        className={styles.input}
        defaultValue={searchParams.get('query') || valueLS || ''}
      />
      <button className={btnStyles.button} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBlock;
