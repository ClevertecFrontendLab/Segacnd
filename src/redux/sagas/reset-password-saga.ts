import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { defaultRequest } from '../../axios/instances ';
import { IAuthErrorResponse, IAuthResponse, IResetPasswordRequest } from '../../interfases';
import { resetPasswordActions } from '../slices/reset-password-slice';

async function resetPasswordDataAPI(resetRequest: IResetPasswordRequest): Promise<IAuthResponse | IAuthErrorResponse> {
  return defaultRequest
    .post('/auth/reset-password', resetRequest)
    .then((res) => res.data)
    .catch((er) => er.response.data);
}

export function* resetPasswordSaga(action: PayloadAction<{ resetRequest: IResetPasswordRequest }>) {
  try {
    const response: IAuthResponse | IAuthErrorResponse = yield call(resetPasswordDataAPI, action.payload.resetRequest);

    yield put(resetPasswordActions.getResetResponse({ status: 'user' in response ? 'success' : 'error' }));
  } catch (error) {
    yield put(resetPasswordActions.getResetResponse({ status: 'error' }));
    console.log(error);
  }
}
