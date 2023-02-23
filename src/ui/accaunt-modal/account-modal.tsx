import { Link } from 'react-router-dom';

import { viewerSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';

import styles from './accaunt-modal.module.css';

export const AccountModal = () => {
  const { accountModal } = useAppSelector(viewerSelector);

  return (
    <div className={accountModal ? styles.showModal : styles.hidden}>
      <Link to='/'>Профиль</Link>
      <button type='button'>Выход</button>
    </div>
  );
};
