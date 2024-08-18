import type { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import FormElement from '../../Components/form-element/FormElement';
import type { RootState } from '../../store/store';
import styles from '../../styles/_root.module.scss';

const Root = (): ReactElement => {
  const forms = useSelector((state: RootState) => state.forms.forms);
  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        {forms.map((form) => (
          <FormElement form={form} />
        ))}
      </ul>
    </section>
  );
};
export default Root;
