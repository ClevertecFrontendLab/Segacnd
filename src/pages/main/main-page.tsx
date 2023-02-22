import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import GridIcon from '../../assets/images/icons/grid-icon.svg';
import RowIcon from '../../assets/images/icons/row-icon.svg';
import { useEffectOnce } from '../../hooks/use-effect-once-hook';
import { categoriesSelector, getAllBookSelector, searchInputSelector, viewerSelector } from '../../redux/selectors';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { getAllBookActions } from '../../redux/slices/get-all-books-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { SearchComponent } from '../../ui/search-sort-bar/search-component';
import { BookPage } from '../book';

import styles from './main-page.module.css';

export const MainPage = () => {
  const { viewType, sortType } = useAppSelector(viewerSelector);
  const { categories } = useAppSelector(categoriesSelector);
  const { books, status } = useAppSelector(getAllBookSelector);
  const { query } = useAppSelector(searchInputSelector);
  const dispatch = useAppDispatch();
  const { category } = useParams();

  const selectedCategoryName = categories.find((el) => el.path === category);

  useEffectOnce(() => {
    dispatch(getAllBookActions.startFetchingAllBooks());
  });

  useEffect(() => {
    if (status === 'success') {
      dispatch(viewTypeActions.menuToggle(true));
    } else {
      dispatch(viewTypeActions.menuToggle(false));
    }
  }, [dispatch, status]);

  const filteredBooks = useMemo(() => {
    const filter =
      category === 'all' || !selectedCategoryName
        ? books
        : books.filter((el) => el.categories.includes(selectedCategoryName.name));
    const sort = filter.filter((el) => el.title.toLowerCase().includes(query.toLowerCase()));

    return sort
      .slice()
      .sort((a, b) => (sortType === 'ASC' ? (a.rating || 0) - (b.rating || 0) : (b.rating || 0) - (a.rating || 0)));
  }, [category, books, selectedCategoryName, query, sortType]);

  return (
    <section className={styles.mainPage}>
      {status !== 'error' && (
        <div className={styles.searchAndSortWrapper}>
          <SearchComponent />

          <div className={styles.itemsView}>
            <div
              data-test-id='button-menu-view-window'
              className={viewType === 'grid' ? styles.activeWrapper : styles.svgWrapper}
              onClick={() => dispatch(viewTypeActions.viewChanger({ viewType: 'grid' }))}
              aria-hidden='true'
            >
              <img src={GridIcon} alt='grid icon' />
            </div>
            <div
              className={viewType === 'grid' ? styles.svgWrapper : styles.activeWrapper}
              onClick={() => dispatch(viewTypeActions.viewChanger({ viewType: 'column' }))}
              aria-hidden='true'
              data-test-id='button-menu-view-list'
            >
              <img src={RowIcon} alt='row icon' />
            </div>
          </div>
        </div>
      )}

      {!filteredBooks.length &&
        status !== 'loading' &&
        (query === '' ? (
          <h3 data-test-id='empty-category' className={styles.nothingFind}>
            В этой категории книг ещё нет
          </h3>
        ) : (
          <h3 data-test-id='search-result-not-found' className={styles.nothingFind}>
            По запросу ничего не найдено
          </h3>
        ))}
      <div className={viewType === 'grid' ? `${styles.cardGridtWrapper}` : `${styles.cardFlexWrapper} `}>
        {filteredBooks.map((el) => (
          <BookPage key={el.id} currentCategory={category} book={el} />
        ))}
      </div>
    </section>
  );
};
