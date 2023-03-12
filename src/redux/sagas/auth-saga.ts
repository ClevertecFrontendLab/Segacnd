import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

import { defaultRequest } from '../../axios/instances ';
import { IAuthErrorResponse, IAuthResponse, IUserAuth } from '../../interfases';
import { authActions } from '../slices/authorization-slice';

async function saveToken(token: string) {
  Cookies.set('jwt', token);
}

async function sendAuthAPI(data: IUserAuth): Promise<IAuthResponse | IAuthErrorResponse> {
  return defaultRequest.post('/auth/local', data).then((res) => res.data);
}

export function* authSaga(action: PayloadAction<{ authDetails: IUserAuth }>) {
  try {
    const response: IAuthResponse | IAuthErrorResponse = yield call(sendAuthAPI, action.payload.authDetails);

    if ('user' in response) {
      yield put(authActions.getUserData({ user: response.user }));
      yield call(saveToken, response.jwt);
    }
  } catch (error) {
    const axiosError = error as AxiosError;

    yield put(authActions.failedFetchingAuth({ errorStatusCode: axiosError.response?.status }));
  }
}
