import { takeEvery } from 'redux-saga/effects';

import { authSaga } from './sagas/auth-saga';
import { forgotPasswordSaga } from './sagas/forgot-password-saga';
import { getAllBookSaga } from './sagas/get-all-book-saga';
import { getCategoriesSaga } from './sagas/get-categories-saga';
import { getOneBookSaga } from './sagas/get-single-book-saga';
import { registrationSaga } from './sagas/registration-saga';
import { resetPasswordSaga } from './sagas/reset-password-saga';
import { authActions } from './slices/authorization-slice';
import { forgotPasswordActions } from './slices/forgot-pass-slice';
import { getAllBookActions } from './slices/get-all-books-slice';
import { getCategoriesActions } from './slices/get-categories-slice';
import { getSingleBookActions } from './slices/get-single-book';
import { registrationActions } from './slices/registration-slice';
import { resetPasswordActions } from './slices/reset-password-slice';

export function* rootSaga() {
  yield takeEvery(getAllBookActions.startFetchingAllBooks, getAllBookSaga);
  yield takeEvery(getSingleBookActions.startFetchingOneBook, getOneBookSaga);
  yield takeEvery(getCategoriesActions.startFetchingCategories, getCategoriesSaga);
  yield takeEvery(authActions.startFetchingAuth, authSaga);
  yield takeEvery(registrationActions.startFetchingRegistration, registrationSaga);
  yield takeEvery(forgotPasswordActions.startFetchingForgotPassword, forgotPasswordSaga);
  yield takeEvery(resetPasswordActions.startFetchingResetPassword, resetPasswordSaga);
}
