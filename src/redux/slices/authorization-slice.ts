import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthError, IAuthState, IUserAuth, User } from '../../interfases';

const initialState: IAuthState = {
  user: null,
  error: null,
  status: 'init',
  authDetails: null
};

export const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    startFetchingAuth(state, action: PayloadAction<{ authDetails: IUserAuth }>) {
      const st = state;

      st.authDetails = action.payload.authDetails;
      st.status = 'loading';
    },
    getUserData(state, action: PayloadAction<{ user: User }>) {
      const st = state;
      
      st.user = action.payload.user;
      st.authDetails = null;
      st.status = 'success';
    },
    logout(state) {
      const st = state;
      
      st.user = null
      st.authDetails = null;
      st.status = 'init';
    },
    failedFetchingAuth(state, action: PayloadAction<{ error: AuthError | null }>) {
      const st = state;

      st.error = action.payload.error;
      st.status = 'error';
    },
    resetError(state) {
      const st = state;

      st.error = null;
      st.status = 'init';
    }
  },
});

export const { reducer: AuthReducer, actions: authActions } = AuthSlice;
