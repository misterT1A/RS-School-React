import { type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './_SearchBlock.module.scss';
import { useSetToLS } from '../../hooks';
import btnStyles from '../../utils/button/_button.module.scss';

const SearchBlock = (): ReactNode => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [, setSearchValueLS] = useSetToLS('Task');

  const handleSearchSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const query = new FormData(form).get('q') as string;
    setSearchValueLS(() => query);

    setSearchParams((prevSearchParams) => {
      const updatedParams = new URLSearchParams(prevSearchParams);
      updatedParams.set('q', query);
      updatedParams.set('page', '1');

      navigate(`/?${searchParams.toString()}`);
      return updatedParams;
    });
  };

  return (
    <form id="search-form" role="search" className={styles.wrapper} onSubmit={handleSearchSubmit}>
      <input
        id="input"
        type="search"
        name="q"
        placeholder="Search"
        className={styles.input}
        defaultValue={searchParams.get('q') || ''}
      />
      <button className={btnStyles.button} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBlock;
