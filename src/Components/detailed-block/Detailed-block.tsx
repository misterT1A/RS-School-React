import { type ReactNode } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import styles from './_Detailed-block.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import useClassThemeToggler from '../../hooks/useClassThemTogler';
import useGetCurrentPlanet from '../../hooks/useGetCurrentPlanet';
import { addFavorite, deleteFavorite } from '../../store/favoriteSlice';
import btnStyles from '../../utils/button/_button.module.scss';
import filterPlanet from '../../utils/filterPlanet';
import Loader from '../../utils/loader/loader';

const DetailedBlock = (): ReactNode => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const { handleClickVisible } = useOutletContext<{ handleClickVisible: () => void }>();

  const [planet, isFetching] = useGetCurrentPlanet(productId);

  const isFavoritePlanet = useAppSelector(
    (state) => !!state.favorite.planets.find((elem) => elem.name === planet?.name),
  );

  const wrapperClass = useClassThemeToggler(styles.wrapper, styles.dark);

  if (!planet && !isFetching) return <h2>error</h2>;

  if (isFetching || !planet) {
    return <Loader />;
  }

  const filteredData = filterPlanet(planet);

  const addToFavorite = (): void => {
    dispatch(addFavorite(planet));
  };

  const deleteFromFavorite = (): void => {
    dispatch(deleteFavorite(planet));
  };

  return (
    <div id="detailed" className={wrapperClass}>
      <ul className={styles.list}>
        {filteredData?.map(([key, value]) => (
          <li key={key}>
            <p>{`${key}: ------${value}`}</p>
          </li>
        ))}
      </ul>
      <div className={styles.controls}>
        <button className={btnStyles.button} name="close" type="button" onClick={handleClickVisible}>
          Close
        </button>
        <button
          type="button"
          name="favorite"
          className={styles.favoriteBtn}
          onClick={isFavoritePlanet ? deleteFromFavorite : addToFavorite}
        >
          {isFavoritePlanet ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
};

export default DetailedBlock;
