import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { ListArrowIcon } from '../../assets/icons';
import { categoriesSelector, getAllBookSelector, viewerSelector } from '../../redux/selectors';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { getCategoriesActions } from '../../redux/slices/get-categories-slice';
import { routeNames } from '../../routing/routs';

import styles from './menu.module.css';

export const MenuComponent = ({ isBurgerMenu = false, testIds }) => {
  const { books } = useSelector(getAllBookSelector);
  const { menuState, burgerState } = useSelector(viewerSelector);
  const { categories } = useSelector(categoriesSelector);

  const dispatch = useDispatch();
  const menuRef = useRef();

  useEffect(() => {
    dispatch(getCategoriesActions.startFetchingCategories());
  }, [dispatch]);

  const navigationClassNames = useMemo(() => {
    let classnames = `${styles.root}`;

    if (burgerState) classnames += ` ${styles.menuOpen}`;
    if (isBurgerMenu) classnames += ` ${styles.burgerMenu}`;

    return classnames;
  }, [burgerState, isBurgerMenu]);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.scroll({ top: 0, behavior: 'smooth' });
    }
  }, [burgerState, menuRef]);

  function toggleMenu() {
    dispatch(viewTypeActions.menuToggle(!menuState));
  }

  const location = useLocation();
  const isBookSectionSelected = location.pathname.includes(routeNames.BOOKS);
  const isActiveTerms = location.pathname.includes(routeNames.TERMS);
  const isActiveContract = location.pathname.includes(routeNames.CONTRACT);

  const booksCounter = (category) => books.filter((el) => el.categories.includes(category)).length;

  useEffect(() => {
    dispatch(viewTypeActions.menuToggle(isBookSectionSelected));
  }, [dispatch, isBookSectionSelected, burgerState]);

  const handleOutsideClick = () => {
    dispatch(viewTypeActions.burgerToggle(false));
  };

  return (
    <React.Fragment>
      <nav data-test-id='burger-navigation' aria-hidden='true' ref={menuRef} className={navigationClassNames}>
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
                {ListArrowIcon}
              </div>
            </div>
            <ul className={menuState ? `${styles.openUl} ` : ` ${styles.closeUl}`}>
              <li data-test-id={testIds[1]}>
                <NavLink to='/books/all'>Все книги</NavLink>
              </li>
              {categories &&
                categories.map((el) => (
                  <li key={el.id}>
                    <NavLink to={`/books/${el.path}`}>
                      {el.name} <span className={styles.bookQuantity}>{booksCounter(el.name)}</span>
                    </NavLink>
                  </li>
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
