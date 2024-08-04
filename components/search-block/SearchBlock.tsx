import { useRouter } from 'next/router';
import { type ReactNode } from 'react';

import styles from './_SearchBlock.module.scss';
import { useSearchUrl, useSetToLS } from '../../hooks';
import btnStyles from '../../UI/button/_button.module.scss';

const SearchBlock = (): ReactNode => {
  const searchParams = useSearchUrl();
  const router = useRouter();
  const [valueLS, setSearchValueLS] = useSetToLS('Nextjs-Task');

  const handleSearchSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const query = new FormData(form).get('q') as string;
    setSearchValueLS(() => query);

    const newSearchParams = { ...searchParams, q: query, page: 1 };
    if (searchParams.q === query) {
      return;
    }
    router.push({ query: newSearchParams });
  };

  return (
    <form id="search-form" role="search" className={styles.wrapper} onSubmit={handleSearchSubmit}>
      <input
        id="input"
        type="search"
        name="q"
        placeholder="Search"
        className={styles.input}
        defaultValue={searchParams.q || valueLS || ''}
      />
      <button className={btnStyles.button} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBlock;
