import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { defaultRequest } from '../../axios/instances ';
import { forgotPasswordActions } from '../slices/forgot-pass-slice';

async function sendForgotPasswordDataAPI(email: string): Promise<{ ok: boolean }> {
  return defaultRequest
    .post('/auth/forgot-password', { email })
    .then((res) => res.data)
    .catch((er) => er.response.data);
}

export function* forgotPasswordSaga(action: PayloadAction<{ email: string }>) {
  try {
    const response: { ok: boolean } = yield call(sendForgotPasswordDataAPI, action.payload.email);

    yield put(forgotPasswordActions.getForgotResponse(response));
  } catch (error) {
    yield put(forgotPasswordActions.getForgotResponse({ ok: false }));
    console.log(error);
  }
}
