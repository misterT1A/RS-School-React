import type { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../../store/store';
import styles from '../../styles/_root.module.scss';
import FormElement from '../form-element/FormElement';

const ControlledBlock = (): ReactElement => {
  const controlledForms = useSelector((state: RootState) => state.forms.forms);
  return (
    <ul className={styles.left_block}>
      {controlledForms.map((form) => (
        <FormElement form={form} />
      ))}
    </ul>
  );
};

export default ControlledBlock;
