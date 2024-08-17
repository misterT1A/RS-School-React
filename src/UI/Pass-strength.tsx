import type { ReactElement, RefObject } from 'react';

import styles from '../styles/form.module.scss';

const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
  return strength;
};

const Line = (strength: number): ReactElement => (
  <div className={styles.pass_indicator_wrapper}>
    <div className={`${styles.pass_indicator_item} ${strength >= 1 ? styles.pass_indicator_red : ''}`} />
    <div className={`${styles.pass_indicator_item} ${strength >= 2 ? styles.pass_indicator_orange : ''}`} />
    <div className={`${styles.pass_indicator_item} ${strength >= 3 ? styles.pass_indicator_yellow : ''}`} />
    <div className={`${styles.pass_indicator_item} ${strength >= 4 ? styles.pass_indicator_green : ''}`} />
  </div>
);

const PassStrengthWithRef: React.FC<{ refform: RefObject<HTMLFormElement> }> = ({ refform }) => {
  let strength = 0;
  if (refform.current) {
    const pass = new FormData(refform.current).get('pass');
    if (pass) {
      strength = calculatePasswordStrength(pass as string);
    }
  }

  return Line(strength);
};

const PassStrength: React.FC<{ value: string }> = ({ value }) => {
  const strength = calculatePasswordStrength(value || '');
  return Line(strength);
};

export { PassStrengthWithRef, PassStrength };
