import type { TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';
import type { ReactElement } from 'react';
import type { LoaderFunctionArgs } from 'react-router-dom';

import FavoriteButton from '../Components/favorite-button/Favorite-button';
import styles from '../styles/_Detailed-block.module.scss';
import type { IPlanet } from '../types/rootTypes';
import CloseButton from '../UI/button/Close-button';
import Loader from '../UI/loader/loader';
import filterPlanet from '../utils/filterPlanet';

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<
  TypedResponse<{
    planet: IPlanet;
  }>
> => {
  const { detailsId } = params;

  const response = await fetch(`https://swapi.dev/api/planets/${detailsId}`);
  const data: IPlanet = await response.json();

  return json({ planet: data });
};

const DetailedBlock = (): ReactElement => {
  const { state } = useNavigation();
  const isLoading = state === 'loading';
  const { planet } = useLoaderData<typeof loader>();

  if (!planet) {
    return <h2>No data</h2>;
  }

  const filteredData = filterPlanet(planet);
  if (isLoading) return <Loader />;

  return (
    <div id="detailed" className={styles.wrapper}>
      <ul className={styles.list}>
        {filteredData?.map(([key, value]) => (
          <li key={key}>
            <p>{`${key}: ------${value}`}</p>
          </li>
        ))}
      </ul>
      <div className={styles.controls}>
        <CloseButton />
        <FavoriteButton planetForCheck={planet} />
      </div>
    </div>
  );
};

export default DetailedBlock;
