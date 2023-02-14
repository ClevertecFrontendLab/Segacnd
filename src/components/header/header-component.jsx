import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { BurgerMenuIcon, BurgerMenuIconClose } from '../../assets/icons';
import avatar from '../../assets/images/avatar.png';
import logoImg from '../../assets/images/logo.jpg';
import { viewerSelector } from '../../redux/selectors';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { MenuComponent } from '../menu';

import styles from './header.module.css';

export const HeaderComponent = () => {
  const { burgerState } = useSelector(viewerSelector);
  const dispatch = useDispatch();

  function openMenu() {
    dispatch(viewTypeActions.burgerToggle(!burgerState));
  }

  return (
    <div className={styles.root}>
      <div className={styles.burgerButton} onClick={openMenu} aria-hidden='true'>
        <div data-test-id='button-burger'>{burgerState ? BurgerMenuIconClose : BurgerMenuIcon}</div>
      </div>

      <MenuComponent
        testIds={['burger-showcase', 'burger-books', 'burger-terms', 'burger-contract']}
        isBurgerMenu={true}
      />
      <NavLink to='/books/all' className={styles.logoWrapper}>
        <img src={logoImg} alt='logo' />
      </NavLink>

      <div className={styles.siteName}>Библиотека</div>
      <div className={styles.person}>
        <p className={styles.greeting}>Привет, Иван!</p>
        <div className={styles.avatarWrapper}>
          <img src={avatar} alt='avatar' />
        </div>
      </div>
    </div>
  );
};
