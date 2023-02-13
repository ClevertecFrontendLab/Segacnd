import { call, put } from 'redux-saga/effects';
import axios from 'axios';

import { getAllBookActions } from '../slices/get-all-books-slice';

async function getAllBookAPI() {
  return axios.get('https://strapi.cleverland.by/api/books').then((res) => res.data);
}

export function* getAllBookSaga() {
  try {
    const res = yield call(() => getAllBookAPI());
  
    yield put(getAllBookActions.getAllBooks(res));
    
  } catch (error) {

    yield put(getAllBookActions.failedFetchingAllBooks())
  }
}
