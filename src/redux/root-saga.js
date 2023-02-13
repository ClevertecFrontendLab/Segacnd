import { takeEvery } from 'redux-saga/effects';

import { getAllBookSaga } from './sagas/get-all-book-saga';
import { getCategoriesSaga } from './sagas/get-categories-saga';
import { getOneBookSaga } from './sagas/get-single-book-saga';
import { getAllBookActions } from './slices/get-all-books-slice';
import { getCategoriesActions } from './slices/get-categories-slice';
import { getSingleBookActions } from './slices/get-single-book';

export function* rootSaga() {
  yield takeEvery(getAllBookActions.startFetchingAllBooks, getAllBookSaga);
  yield takeEvery(getSingleBookActions.startFetchingOneBook, getOneBookSaga);
  yield takeEvery(getCategoriesActions.startFetchingCategories, getCategoriesSaga);
}
