import classNames from 'classnames';

import { ASCIcon, SortIcon } from '../../assets/icons';
import { viewerSelector } from '../../redux/selectors';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './sort-bar.module.css';

export const SortBar = () => {
  const dispatch = useAppDispatch();
  const { sortType } = useAppSelector(viewerSelector);

  const sortButtonHandle = () => {
    if (sortType === 'ASC') {
      dispatch(viewTypeActions.sortChanger({ sortType: 'DESC' }));
    } else {
      dispatch(viewTypeActions.sortChanger({ sortType: 'ASC' }));
    }
  };

  return (
    <button type='button' className={styles.root} onClick={sortButtonHandle}>
      {sortType === 'ASC' ? ASCIcon : SortIcon}
      <span className={styles.sortInput}>По рейтингу</span>
    </button>
  );
};
