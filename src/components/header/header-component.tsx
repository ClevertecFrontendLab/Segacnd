import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import AvatarIcon from '../../assets/images/icons/avatar.svg';
import BurgerMenuIcon from '../../assets/images/icons/burger-icon.svg';
import CloseIcon from '../../assets/images/icons/menu-close-icon.svg';
import logoImg from '../../assets/images/logo.jpg';
import { viewerSelector } from '../../redux/selectors';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { useAppSelector } from '../../redux/store';
import { AccountModal } from '../../ui/accaunt-modal/account-modal';
import { MenuComponent } from '../menu';

import styles from './header.module.css';

export const HeaderComponent = () => {
  const { burgerState, accountModal } = useAppSelector(viewerSelector);
  const dispatch = useDispatch();

  const openMenu = () => {
    dispatch(viewTypeActions.burgerToggle(!burgerState));
  };

  return (
    <div className={styles.root}>
      <div className={styles.burgerButton} onClick={openMenu} aria-hidden='true'>
        <div data-test-id='button-burger'>
          <img src={burgerState ? CloseIcon : BurgerMenuIcon} alt='menu-icon' />
        </div>
      </div>

      <MenuComponent
        testIds={['burger-showcase', 'burger-books', 'burger-terms', 'burger-contract']}
        isBurgerMenu={true}
      />
      <NavLink to='/books/all' className={styles.logoWrapper}>
        <img src={logoImg} alt='logo' />
      </NavLink>

      <div className={styles.siteName}>Библиотека</div>
      <button
        type='button'
        className={styles.person}
        onClick={() => dispatch(viewTypeActions.accountModalToggle(!accountModal))}
      >
        <p className={styles.greeting}>Привет, Иван!</p>
        <div className={styles.avatarWrapper}>
          <img src={AvatarIcon} alt='user avatar' />
        </div>
      </button>
      <AccountModal />
    </div>
  );
};
