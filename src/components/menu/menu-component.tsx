import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { ListArrowIcon } from '../../assets/icons';
import { useEffectOnce } from '../../hooks/use-effect-once-hook';
import { categoriesSelector, getAllBookSelector, viewerSelector } from '../../redux/selectors';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { getCategoriesActions } from '../../redux/slices/get-categories-slice';
import { useAppSelector } from '../../redux/store';
import { routeNames } from '../../routing/routs';

import styles from './menu.module.css';

interface IMenuComponentProps {
  isBurgerMenu: boolean;
  testIds: string[];
}

export const MenuComponent = ({ isBurgerMenu = false, testIds }: IMenuComponentProps) => {
  const { books } = useSelector(getAllBookSelector);
  const { menuState, burgerState } = useSelector(viewerSelector);
  const { categories } = useAppSelector(categoriesSelector);
  const { status } = useAppSelector(getAllBookSelector);
  const menuRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const dispatch = useDispatch();

   // Use this effect for develop to avoid problem with double call in strict mode 
  useEffectOnce(() => {
    if (!categories.length) {
      dispatch(getCategoriesActions.startFetchingCategories());
    }
  });

   // Use this effect for prod
  // useEffect(() => {
  //   if (!categories.length) {
  //     dispatch(getCategoriesActions.startFetchingCategories());
  //   }
  // }, [dispatch, categories]);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.scroll({ top: 0, behavior: 'smooth' });
    }
  }, [burgerState, menuRef]);

  function toggleMenu() {
    dispatch(viewTypeActions.menuToggle(!menuState));
  }

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
                {status !== 'error' && ListArrowIcon}
              </div>
            </div>
            <ul className={menuState ? `${styles.openUl} ` : ` ${styles.closeUl}`}>
              <li data-test-id={testIds[1]}>
                <NavLink to='/books/all'>Все книги</NavLink>
              </li>
              {categories &&
                categories.map((el) => (
                  <div className={styles.itemWrapper} key={el.id}>
                    <li data-test-id={`${isBurgerMenu ? 'burger' : 'navigation'}-${el.path}`} >
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
          <button type='button' className={styles.exitButton}>
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
