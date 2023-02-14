import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ColumnIcon, GridIcon } from '../../assets/icons';
import { ErrorComponent } from '../../components/error/error-component';
import { LoaderComponent } from '../../components/loader/loader';
import { SearchComponent } from '../../components/search-sort-bar/search-component';
import { categoriesSelector, getAllBookSelector, viewerSelector } from '../../redux/selectors';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { getAllBookActions } from '../../redux/slices/get-all-books-slice';
import { getCategoriesActions } from '../../redux/slices/get-categories-slice';
import { BookPage } from '../book';

import styles from './main-page.module.css';

export const MainPage = () => {
  const { viewType } = useSelector(viewerSelector);
  const { categories } = useSelector(categoriesSelector);
  const { books, status } = useSelector(getAllBookSelector);

  const dispatch = useDispatch();

  const { category } = useParams();
  const selectedCategoryName = categories.find((el) => el.path === category);

  useEffect(() => {
    dispatch(getCategoriesActions.startFetchingCategories());
    dispatch(getAllBookActions.startFetchingAllBooks());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'success') {
      dispatch(viewTypeActions.menuToggle(true));
    } else {
      dispatch(viewTypeActions.menuToggle(false));
    }
  }, [dispatch, status]);

  const filteredBooks = useMemo(
    () => (category === 'all' ? books : books.filter((el) => el.categories.includes(selectedCategoryName.name))),
    [category, books, selectedCategoryName]
  );

  return (
    <section className={styles.mainPage}>
      {status === 'error' ? (
        <ErrorComponent />
      ) : (
        <div className={styles.searchAndSortWrapper}>
          <SearchComponent />

          <div className={styles.itemsView}>
            <div
              data-test-id='button-menu-view-window'
              className={viewType === 'grid' ? styles.activeWrapper : styles.svgWrapper}
              onClick={() => dispatch(viewTypeActions.viewChanger({ viewType: 'grid' }))}
              aria-hidden='true'
            >
              {GridIcon}
            </div>
            <div
              className={viewType === 'grid' ? styles.svgWrapper : styles.activeWrapper}
              onClick={() => dispatch(viewTypeActions.viewChanger({ viewType: 'column' }))}
              aria-hidden='true'
              data-test-id='button-menu-view-list'
            >
              {ColumnIcon}
            </div>
          </div>
        </div>
      )}
      {status === 'loading' && <LoaderComponent />}

      <div className={viewType === 'grid' ? `${styles.cardGridtWrapper}` : `${styles.cardFlexWrapper} `}>
        {filteredBooks && filteredBooks.map((el) => <BookPage key={el.id} book={el} />)}
      </div>
    </section>
  );
};
