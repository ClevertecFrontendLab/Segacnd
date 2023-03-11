import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthError, IRegistrationData, IRegistrationState, User } from '../../interfases';

const initialState: IRegistrationState = {
  error: null,
  status: 'init',
};

export const RegistrationSlice = createSlice({
  name: 'registrationSlice',
  initialState,
  reducers: {
    startFetchingRegistration(state, action: PayloadAction<{ registrationDetails: IRegistrationData }>) {
      const st = state;

      st.status = 'loading';
    },
    getUserData(state, ) {
      const st = state;

      st.status = 'success';
    },
    failedFetchingRegistration(state, action: PayloadAction<{ error: AuthError | null }>) {
      const st = state;

      st.error = action.payload.error;

      st.status = 'error';
    },
    resetData(state) {
      const st = state;

      st.status = 'init';
      st.error = null;
    }
  },
});

export const { reducer: RegistrationReducer, actions: registrationActions } = RegistrationSlice;
