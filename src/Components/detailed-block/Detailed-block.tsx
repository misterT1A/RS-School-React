import { useEffect, type ReactNode } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import styles from './_Detailed-block.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { useGetPlanetQuery } from '../../store/apiSlice';
import { setPlanet } from '../../store/detailedSlice';
import { addFavorite, deleteFavorite } from '../../store/favoriteSlice';
import btnStyles from '../../utils/button/_button.module.scss';
import filterPlanet from '../../utils/filterPlanet';
import Loader from '../../utils/loader/loader';

const DetailedBlock = (): ReactNode => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const { data, isFetching } = useGetPlanetQuery(productId || '');
  const { handleClickVisible } = useOutletContext<{ handleClickVisible: () => void }>();
  const planetStore = useAppSelector((state) => state.planet.currentPlanet);
  const isFavoritePlanet = useAppSelector(
    (state) => !!state.favorite.planets.find((planet) => planet.name === planetStore?.name),
  );

  useEffect(() => {
    if (data) {
      dispatch(setPlanet(data));
    }
  }, [data, dispatch]);

  if (!data && !isFetching) return <h2>error</h2>;

  if (isFetching || !planetStore) {
    return <Loader />;
  }

  const filteredData = filterPlanet(planetStore);

  const addToFavorite = (): void => {
    dispatch(addFavorite(planetStore));
  };

  const deleteFromFavorite = (): void => {
    dispatch(deleteFavorite(planetStore));
  };

  return (
    <div id="detailed" className={styles.wrapper}>
      <ul className={styles.list}>
        {filteredData?.map(([key, value]) => (
          <li key={key}>
            <p>{`${key}: ------${value}`}</p>
          </li>
        ))}
      </ul>
      <div>
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
