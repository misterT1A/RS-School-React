import type { ReactElement } from 'react';
import React from 'react';

import styles from './formElement.module.scss';
import type { IForm } from '../../types/storeTypes';

const FormElement: React.FC<{ form: IForm }> = ({ form }): ReactElement => (
  <li className={styles.form_item}>
    {Object.entries(form).map(([key, value]) => {
      if (key === 'image')
        return (
          <div className={styles.img_wrapper} key={key}>
            <img className={styles.img} src={value} alt="pict" />
          </div>
        );
      if (key === 'form')
        return (
          <h2 key={key} className={styles.title}>
            {value}
          </h2>
        );
      if (key === 'confirmPass' || key === 'id') return undefined;
      return (
        <div key={key} className={styles.text}>
          <p>{key}</p>
          <p>{typeof value === 'boolean' ? value.toString() : value}</p>
        </div>
      );
    })}
  </li>
);

export default FormElement;
