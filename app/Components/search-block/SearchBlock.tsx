import { type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './_SearchBlock.module.scss';
import { useSetToLS } from '../../hooks';
import btnStyles from '../../UI/button/_button.module.scss';

const SearchBlock = (): ReactNode => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useSetToLS('Task');

  const handleSearchSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const query = new FormData(form).get('query') as string;

    if (searchParams.get('query') === query) {
      return;
    }

    navigate(`/?query=${query}&page=1`);
    setValue(() => query);
  };

  return (
    <form id="search-form" role="search" className={styles.wrapper} onSubmit={handleSearchSubmit}>
      <input
        id="input"
        type="search"
        name="query"
        placeholder="Search"
        className={styles.input}
        defaultValue={searchParams.get('query') || value || ''}
      />
      <button className={btnStyles.button} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBlock;
