import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IForgotPasswordState} from '../../interfases';

const initialState: IForgotPasswordState = {
  ok: false, 
  status: 'init',
};

export const ForgotPasswordSlice = createSlice({
  name: 'forgotPasswordSlice',
  initialState,
  reducers: {
    startFetchingForgotPassword(state, action: PayloadAction<{ email: string }>) {
      const st = state;

      st.status = 'loading';
    },
    getForgotResponse(state, action: PayloadAction<{ ok: boolean }>) {
      const st = state;
      
      st.ok = action.payload.ok

      
      st.status = action.payload.ok ? 'success' : 'error';
    },


  },
});

export const { reducer: ForgotPasswordReducer, actions: forgotPasswordActions } = ForgotPasswordSlice;
