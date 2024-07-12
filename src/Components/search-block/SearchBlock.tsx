import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './_SearchBlock.module.scss';
import type IInputProps from '../../types/searchPanelTypes';

const SearchBlock = ({ searchParams, setSearchParams }: IInputProps): ReactNode => {
  const navigate = useNavigate();
  const handleSearchSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const query = new FormData(form).get('q') as string;
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
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBlock;
