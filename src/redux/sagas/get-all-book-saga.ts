import { call, put } from 'redux-saga/effects';

import { defaultRequest } from '../../axios/instances ';
import { IBookPreview } from '../../interfases';
import { alertActions } from '../slices/alert-slice';
import { getAllBookActions } from '../slices/get-all-books-slice';

async function getAllBookAPI(): Promise<IBookPreview[]> {
  return defaultRequest.get('/books').then((res) => res.data);
}

export function* getAllBookSaga() {
  try {
    const res: IBookPreview[] = yield call(() => getAllBookAPI());

    yield put(getAllBookActions.getAllBooks({ books: res }));
  } catch (error) {
    yield put(getAllBookActions.failedFetchingAllBooks());
    yield put(
      alertActions.showAlert({ text: 'Что-то пошло не так. Обновите страницу через некоторое время.', status: 'error' })
    );
  }
}
