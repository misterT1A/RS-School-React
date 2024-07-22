import { useEffect, type ReactNode } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import styles from './_Detailed-block.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { useGetPlanetQuery } from '../../services/apiSlice';
import { setPlanet } from '../../services/detailedSlice';
import type { IPlanet } from '../../types/rootTypes';
import btnStyles from '../../utils/button/_button.module.scss';
import Loader from '../../utils/loader/loader';

const DetailedBlock = (): ReactNode => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const { data, isFetching } = useGetPlanetQuery(productId || '');
  const { handleClickVisible } = useOutletContext<{ handleClickVisible: () => void }>();
  const planetStore = useAppSelector((state) => state.planet.currentPlanet);

  useEffect(() => {
    if (data) {
      dispatch(setPlanet(data));
    }
  }, [data, dispatch]);

  if (!data && !isFetching) return <h2>error</h2>;

  if (isFetching || !planetStore) {
    return <Loader />;
  }

  const newData = Object.entries(planetStore as IPlanet);
  const filteredData = newData.filter((elem) => elem[0] !== 'residents' && elem[0] !== 'films' && elem[0] !== 'url');

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
      </div>
    </div>
  );
};

export default DetailedBlock;
