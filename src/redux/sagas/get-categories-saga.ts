import { call, put } from 'redux-saga/effects';

import { defaultRequest } from '../../axios/instances ';
import { ICategories } from '../../interfases';
import { alertActions } from '../slices/alert-slice';
import { getCategoriesActions } from '../slices/get-categories-slice';

async function getCategoriesApi(): Promise<ICategories[]> {
  return defaultRequest.get('/categories').then((res) => res.data);
}

export function* getCategoriesSaga() {
  try {
    const res: ICategories[] = yield call(() => getCategoriesApi());

    yield put(getCategoriesActions.getCategories({ categories: res }));
  } catch (error) {
    yield put(getCategoriesActions.failedFetchingCategories());
    yield put(
      alertActions.showAlert({ text: 'Что-то пошло не так. Обновите страницу через некоторое время.', status: 'error' })
    );
  }
}
