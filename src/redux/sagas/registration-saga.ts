import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { defaultRequest } from '../../axios/instances ';
import { IAuthErrorResponse, IAuthResponse, IRegistrationData, IUserAuth } from '../../interfases';
import { alertActions } from '../slices/alert-slice';
import { authActions } from '../slices/authorization-slice';
import { registrationActions } from '../slices/registration-slice';

async function sendRegistrationDataAPI(data: IRegistrationData): Promise<IAuthResponse | IAuthErrorResponse> {
  return defaultRequest
    .post('/auth/local/register', data)
    .then((res) => res.data)
    .catch((er) => er.response.data);
}

export function* registrationSaga(action: PayloadAction<{ registrationDetails: IRegistrationData }>) {
  try {
    const response: IAuthResponse | IAuthErrorResponse = yield call(
      sendRegistrationDataAPI,
      action.payload.registrationDetails
    );

    if ('user' in response) {
      yield put(registrationActions.getUserData());
    } else {
      yield put(registrationActions.failedFetchingRegistration({ error: response.error }));
    }
  } catch (error) {
    yield put(registrationActions.failedFetchingRegistration({ error: null }));
  }
}
