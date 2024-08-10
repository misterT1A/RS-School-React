import type { ReactElement } from 'react';

import styles from './favorite-button.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addFavorite, deleteFavorite } from '../../store/favoriteSlice';
import type { IPlanet } from '../../types/rootTypes';

const FavoriteButton = ({ planetForCheck }: { planetForCheck: IPlanet }): ReactElement => {
  const { name: namePlanet } = planetForCheck;
  const dispatch = useAppDispatch();
  const favoritePlanets = useAppSelector((state) => state.favorite.planets);

  const isFavorite = favoritePlanets.some((planet: { name: string }) => planet.name === namePlanet);

  const addToFavorite = (e: React.MouseEvent, planet: IPlanet): void => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addFavorite(planet));
  };

  const deleteFromFavorite = (e: React.MouseEvent, planet: IPlanet): void => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deleteFavorite(planet));
  };

  return (
    <button
      type="button"
      name="favorite"
      className={styles.favoriteBtn}
      onClick={(e: React.MouseEvent) =>
        isFavorite ? deleteFromFavorite(e, planetForCheck) : addToFavorite(e, planetForCheck)
      }
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
};

export default FavoriteButton;
