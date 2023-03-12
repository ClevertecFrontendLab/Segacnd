import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthError, IRegistrationData, IRegistrationState } from '../../interfases';

const initialState: IRegistrationState = {
  status: 'init',
  registrationData: null,
  errorStatusCode: undefined

};

export const RegistrationSlice = createSlice({
  name: 'registrationSlice',
  initialState,
  reducers: {
    startFetchingRegistration(state, action: PayloadAction<{ registrationDetails: IRegistrationData }>) {
      const st = state;

      st.registrationData = action.payload.registrationDetails;
      st.status = 'loading';
    },
    getUserData(state, ) {
      const st = state;

      st.registrationData = null;
      st.status = 'success';
    },
    failedFetchingRegistration(state, action: PayloadAction<{  errorStatusCode?: number }>) {
      const st = state;

      st.errorStatusCode = action.payload.errorStatusCode;
      st.status = 'error';
    },
    resetData(state) {
      const st = state;

      st.status = 'init';
      st.registrationData = null;
      st.errorStatusCode = undefined;
    }
  },
});

export const { reducer: RegistrationReducer, actions: registrationActions } = RegistrationSlice;
