import styles from './_Products-block.module.scss';

const extractLastNumber = (url: string): string => {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : '';
};

const getClassName = ({ isActive, isPending }: { isActive: boolean; isPending: boolean }): string => {
  if (isActive) {
    return `${styles.list_item} ${styles.active}`;
  }
  if (isPending) {
    return `${styles.list_item} ${styles.actpendingve}`;
  }
  return styles.list_item;
};

export { extractLastNumber, getClassName };
