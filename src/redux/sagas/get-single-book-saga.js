import { call, put } from 'redux-saga/effects';
import axios from 'axios';

import { getSingleBookActions } from '../slices/get-single-book';

async function getOneBookApi(id) {
  return axios.get(`https://strapi.cleverland.by/api/books/${id}`).then((res) => res.data);
}

export function* getOneBookSaga(action) {
  try {
    const res = yield call(() => getOneBookApi(action.payload));

    yield put(getSingleBookActions.getOneBook({ book: res }));
  } catch (error) {
    yield put(getSingleBookActions.failedFetchingOneBook());
  }
}
