import { call, put } from 'redux-saga/effects';
import axios from 'axios';

import { getCategoriesActions } from '../slices/get-categories-slice';

async function getCategoriesApi() {
  return axios.get('https://strapi.cleverland.by/api/categories').then((res) => res.data);
}

export function* getCategoriesSaga() {
  try {
    const res = yield call(() => getCategoriesApi());

    yield put(getCategoriesActions.getCategories({ categories: res }));
  } catch (error) {
    yield put(getCategoriesActions.failedFetchingCategories());
  }
}
