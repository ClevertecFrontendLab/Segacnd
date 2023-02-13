import { SortIcon } from '../../assets/icons';

import styles from './sort-bar.module.css';

export const SortBar = () => (
  <div className={styles.root}>
    {SortIcon}
    <span className={styles.sortInput}>По рейтингу</span>
  </div>
);
