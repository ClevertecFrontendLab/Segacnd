import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { defaultRequest } from '../../axios/instances ';
import { IAuthErrorResponse, IAuthResponse, IUserAuth } from '../../interfases';
import { alertActions } from '../slices/alert-slice';
import { authActions } from '../slices/authorization-slice';

async function saveToken(token: string) {
  Cookies.set('jwt', token);
}

async function sendAuthAPI(data: IUserAuth): Promise<IAuthResponse | IAuthErrorResponse> {
  return defaultRequest.post('/auth/local', data).then((res) => res.data).catch((er) => er.response.data)
}

export function* authSaga(action: PayloadAction<{ authDetails: IUserAuth }>) {
  try {
    const response: IAuthResponse | IAuthErrorResponse = yield call(sendAuthAPI, action.payload.authDetails);

    if ('user' in response) {
      yield put(authActions.getUserData({ user: response.user }));
      yield call(saveToken, response.jwt);
    } else {
      yield put(authActions.failedFetchingAuth({ error: response.error }));
    }
  } catch (error) {
    console.error('erkjfhewlrhflwe', error);
    yield put(authActions.failedFetchingAuth({ error: null }));
  }
}
