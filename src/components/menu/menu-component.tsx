import React, { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import ArrowIcon from '../../assets/images/icons/arrow-up-active-icon.svg';
import { useEffectOnce } from '../../hooks/use-effect-once-hook';
import { categoriesSelector, getAllBookSelector, viewerSelector } from '../../redux/selectors';
import { authActions } from '../../redux/slices/authorization-slice';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { getCategoriesActions } from '../../redux/slices/get-categories-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { routeNames } from '../../routing/routs';

import styles from './menu.module.css';

interface IMenuComponentProps {
  isBurgerMenu: boolean;
  testIds: string[];
}

export const MenuComponent = ({ isBurgerMenu = false, testIds }: IMenuComponentProps) => {
  const { books, status } = useAppSelector(getAllBookSelector);
  const { menuState, burgerState } = useAppSelector(viewerSelector);
  const { categories } = useAppSelector(categoriesSelector);
  const menuRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    if (!categories.length) {
      dispatch(getCategoriesActions.startFetchingCategories());
    }
  });

  const endSession = () => {
    Cookies.remove('jwt');
    dispatch(authActions.logout());
    navigate('/auth');
  };

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.scroll({ top: 0, behavior: 'smooth' });
    }
  }, [burgerState, menuRef]);

  const toggleMenu = () => {
    dispatch(viewTypeActions.menuToggle(!menuState));
  };

  const isBookSectionSelected = location.pathname.includes(routeNames.BOOKS);
  const isActiveTerms = location.pathname.includes(routeNames.TERMS);
  const isActiveContract = location.pathname.includes(routeNames.CONTRACT);

  const booksCounter = (category: string) => books?.filter((el) => el.categories.includes(category)).length;

  useEffect(() => {
    dispatch(viewTypeActions.menuToggle(isBookSectionSelected));
  }, [dispatch, isBookSectionSelected, burgerState]);

  const handleOutsideClick = () => {
    dispatch(viewTypeActions.burgerToggle(false));
  };

  return (
    <React.Fragment>
      <nav
        data-test-id='burger-navigation'
        aria-hidden='true'
        ref={menuRef}
        className={classNames(styles.root, { [styles.menuOpen]: burgerState, [styles.burgerMenu]: isBurgerMenu })}
      >
        <div className={styles.menuWrapper}>
          <div className={styles.sectionWrapper}>
            <div
              data-test-id={testIds[0]}
              className={isBookSectionSelected ? `${styles.link}  ${styles.activePath}` : `${styles.link} `}
              onClick={toggleMenu}
              aria-hidden='true'
            >
              Витрина книг
              <div
                className={
                  menuState ? `${styles.open} ${styles.iconWrapper} ` : `${styles.iconWrapper}  ${styles.close}`
                }
              >
                {status !== 'error' && <img src={ArrowIcon} alt='toggle menu' />}
              </div>
            </div>
            <ul className={menuState ? `${styles.openUl} ` : ` ${styles.closeUl}`}>
              <li data-test-id={testIds[1]}>
                <NavLink to='/books/all'>Все книги</NavLink>
              </li>
              {categories &&
                categories.map((el) => (
                  <div className={styles.itemWrapper} key={el.id}>
                    <li data-test-id={`${isBurgerMenu ? 'burger' : 'navigation'}-${el.path}`}>
                      <NavLink to={`/books/${el.path}`}>{el.name}</NavLink>
                    </li>
                    <span
                      data-test-id={`${isBurgerMenu ? 'burger' : 'navigation'}-book-count-for-${el.path}`}
                      className={styles.bookQuantity}
                    >
                      {booksCounter(el.name)}
                    </span>
                  </div>
                ))}
            </ul>
          </div>

          <NavLink
            data-test-id={testIds[2]}
            className={isActiveTerms ? `${styles.link}  ${styles.activePath}` : `${styles.link} `}
            to='/terms'
          >
            Правила пользования
          </NavLink>
          <NavLink
            data-test-id={testIds[3]}
            className={isActiveContract ? `${styles.link}  ${styles.activePath}` : `${styles.link} `}
            to='/contract'
          >
            Договор аферты
          </NavLink>
        </div>

        <hr className={styles.line} />

        <div className={styles.menuWrapper}>
          <Link className={styles.profileLink} to='/'>
            Профиль
          </Link>
          <button
            data-test-id={isBurgerMenu ? 'exit-button' : ''}
            type='button'
            onClick={endSession}
            className={styles.exitButton}
          >
            Выход
          </button>
        </div>
      </nav>

      {isBurgerMenu && burgerState && (
        <div aria-hidden='true' className={styles.bgLayer} onClick={handleOutsideClick} />
      )}
    </React.Fragment>
  );
};
