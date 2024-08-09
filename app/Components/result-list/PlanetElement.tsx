import { useNavigate, useSearchParams } from '@remix-run/react';
import type { ReactElement } from 'react';
import { useContext } from 'react';

import styles from './_Result-list.module.scss';
import { extractLastNumber } from './result-list-helpers';
import { ThemeContext, ThemeEnum } from '../../context';
import type { IPlanet } from '../../types/rootTypes';
import FavoriteButton from '../favorite-button/Favorite-button';

const PlanetElement = ({ planet, details }: { planet: IPlanet; details: string }): ReactElement => {
  const { theme } = useContext(ThemeContext);
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
      <p className={theme === ThemeEnum.Light ? styles.title : `${styles.title} ${styles.dark}`}>{planet.name}</p>
      <FavoriteButton planetForCheck={planet} />
    </div>
  );
};

export default PlanetElement;
