import type { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import FormElement from '../../Components/form-element/FormElement';
import type { RootState } from '../../store/store';
import styles from '../../styles/_root.module.scss';

const Root = (): ReactElement => {
  const forms = useSelector((state: RootState) => state.forms.forms);
  return (
    <section className={styles.wrapper}>
      {forms.length ? (
        <ul className={styles.list}>
          {forms.map((form) => (
            <FormElement form={form} key={form.id} />
          ))}
        </ul>
      ) : (
        <p className={styles.title}>No Forms</p>
      )}
    </section>
  );
};
export default Root;
