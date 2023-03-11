import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { viewerSelector } from '../../redux/selectors';
import { authActions } from '../../redux/slices/authorization-slice';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './accaunt-modal.module.css';

export const AccountModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accountModal } = useAppSelector(viewerSelector);

  const closeSession = () => {
    dispatch(viewTypeActions.accountModalToggle(!accountModal));
    Cookies.remove('jwt');
    dispatch(authActions.logout());
    navigate('/auth');
  };

  return (
    <div className={accountModal ? styles.showModal : styles.hidden}>
      <Link to='/'>Профиль</Link>
      <button type='button' onClick={closeSession}>
        Выход
      </button>
    </div>
  );
};
