import { type ReactNode } from 'react';
import { useSelector } from 'react-redux';

import styles from './_root.module.scss';
import type { RootState } from '../../store/store';

const Root = (): ReactNode => {
  const controlledForms = useSelector((state: RootState) => state.controlled.forms);
  return (
    <section className={styles.wrapper}>
      <ul className={styles.left_block}>
        {controlledForms.map((form) => (
          <li key={form.name}>
            {Object.entries(form).map(([key, value]) =>
              key === 'image' ? (
                <img src={value} alt="pict" />
              ) : (
                <p>
                  {key} ..... {value}
                </p>
              ),
            )}
          </li>
        ))}
      </ul>
      <ul className={styles.right_block} />
    </section>
  );
};
export default Root;
