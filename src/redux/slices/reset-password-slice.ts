import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IResetPasswordRequest, ResetPassword, TStatus } from '../../interfases';

const initialState: ResetPassword = {
  status: 'init',
  resetData: null,
};

export const ResetPasswordSlice = createSlice({
  name: 'resetPasswordSlice',
  initialState,
  reducers: {
    startFetchingResetPassword(state, action: PayloadAction<{ resetRequest: IResetPasswordRequest }>) {
      const st = state;

      st.status = 'loading';
      st.resetData = action.payload.resetRequest;
    },
    getResetResponse(state, action: PayloadAction<{ status: TStatus }>) {
      const st = state;

      st.status = action.payload.status;
    },
    resetData(state) {
      const st = state;

      st.status = 'init';
      st.resetData = null;
    },
  },
});

export const { reducer: ResetPasswordReducer, actions: resetPasswordActions } = ResetPasswordSlice;
