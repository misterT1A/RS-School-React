import { useNavigate, useSearchParams } from '@remix-run/react';
import type { ReactElement } from 'react';

import styles from './_Result-list.module.scss';
import useClassThemeToggler from '../../hooks/useClassThemTogler';
import type { IPlanet } from '../../types/rootTypes';
import { extractLastNumber } from '../../utils/result-list-helpers';
import FavoriteButton from '../favorite-button/Favorite-button';

const PlanetElement = ({ planet, details }: { planet: IPlanet; details: string }): ReactElement => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = extractLastNumber(planet.url ? planet.url : '');

  const query = searchParams.get('query')?.toString() || '';
  const page = searchParams.get('page')?.toString() || '1';

  return (
    <div
      className={details === id ? `${styles.list_item} ${styles.active}` : styles.list_item}
      onClick={(e) => {
        e.stopPropagation();

        navigate(`/details/${id}?query=${query}&page=${page}`);
      }}
    >
      <p className={useClassThemeToggler(styles.title, styles.dark)}>{planet.name}</p>
      <FavoriteButton planetForCheck={planet} />
    </div>
  );
};

export default PlanetElement;
