import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { ColumnIcon, GridIcon } from '../../assets/icons';
import { categoriesSelector, getAllBookSelector, SearchInputSelector, viewerSelector } from '../../redux/selectors';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { getAllBookActions } from '../../redux/slices/get-all-books-slice';
import { getCategoriesActions } from '../../redux/slices/get-categories-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { SearchComponent } from '../../ui/search-sort-bar/search-component';
import { BookPage } from '../book';

import styles from './main-page.module.css';

export const MainPage = () => {
  const { viewType } = useAppSelector(viewerSelector);
  const { categories } = useAppSelector(categoriesSelector);
  const { books, status } = useAppSelector(getAllBookSelector);
  const { query } = useAppSelector(SearchInputSelector);
  const dispatch = useAppDispatch();
  const { category } = useParams();

  const selectedCategoryName = categories.find((el) => el.path === category);

  useEffect(() => {
    let ignore = false;

    function startFetching() {
      if (!ignore) {
        dispatch(getCategoriesActions.startFetchingCategories());
        dispatch(getAllBookActions.startFetchingAllBooks());
      }
    }

    startFetching();

    return () => {
      ignore = true;
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === 'success') {
      dispatch(viewTypeActions.menuToggle(true));
    } else {
      dispatch(viewTypeActions.menuToggle(false));
    }
  }, [dispatch, status]);

  const filteredBooks = useMemo(
    () =>
      category === 'all' || !selectedCategoryName
        ? books
        : books.filter((el) => el.categories.includes(selectedCategoryName.name)),
    // Добавить сортировку
    [category, books, selectedCategoryName]
  );

  

  let filteredList = filteredBooks;

  if (query !== '') {
    filteredList = filteredBooks.filter((el) => el.title.toLowerCase().includes(query.toLowerCase())) || <h1>По запросу ничего не найдено.</h1>;
  }

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

      <div className={viewType === 'grid' ? `${styles.cardGridtWrapper}` : `${styles.cardFlexWrapper} `}>
        {filteredList && filteredList.length ? (
          filteredList.map((el) => <BookPage key={el.id} book={el} />)
        ) : (
          <h1>В этой категори книг еще нет.</h1>
        )}
      </div>
    </section>
  );
};
