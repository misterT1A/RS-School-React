import type { ReactNode } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';

import styles from './_Detailed-block.module.scss';
import type { IProduct } from '../../types/rootTypes';
import btnStyles from '../../utils/button/_button.module.scss';

const DetailedBlock = (): ReactNode => {
  const { handleClickVisible } = useOutletContext<{ handleClickVisible: () => void }>();

  const product = useLoaderData();
  if (!product) return <h2>error</h2>;

  const newData = Object.entries(product as IProduct);
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
