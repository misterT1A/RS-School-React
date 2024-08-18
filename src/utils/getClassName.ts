import styles from '@/Components/header/header.module.scss';

const getClassName = ({ isActive, isPending }: { isActive: boolean; isPending: boolean }): string => {
  if (isActive) {
    return `${styles.link} ${styles.active}`;
  }
  if (isPending) {
    return `${styles.link} ${styles.pending}`;
  }
  return styles.link;
};

export default getClassName;
