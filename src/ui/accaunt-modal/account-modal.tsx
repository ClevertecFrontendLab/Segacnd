import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { viewerSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';

import styles from './accaunt-modal.module.css';

export const AccountModal = () => {
  const { accountModal } = useAppSelector(viewerSelector);

  return (
    <div className={classNames(styles.closet, { [styles.accountModal]: accountModal })}>
      <Link to='/'>Профиль</Link>
      <button type='button'>Выход</button>
    </div>
  );
};
