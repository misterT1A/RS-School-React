import type { ReactElement } from 'react';
import React from 'react';

import styles from './formElement.module.scss';
import type { IForm } from '../../types/storeTypes';

const FormElement: React.FC<{ form: IForm }> = ({ form }): ReactElement => (
  <li className={styles.form_item} key={form.name}>
    {Object.entries(form).map(([key, value]) => {
      if (key === 'image')
        return (
          <div className={styles.img_wrapper}>
            <img className={styles.img} src={value} alt="pict" />
          </div>
        );
      if (key === 'form') return <h2 className={styles.title}>{value}</h2>;
      if (key === 'confirmPass') return undefined;
      return (
        <div className={styles.text}>
          <p>{key}</p>
          <p>{typeof value === 'boolean' ? value.toString() : value}</p>
        </div>
      );
    })}
  </li>
);

export default FormElement;
