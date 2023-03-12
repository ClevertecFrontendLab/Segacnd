import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IForgotPasswordState, TStatus} from '../../interfases';

const initialState: IForgotPasswordState = {
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
    getForgotResponse(state, action: PayloadAction<{ status: TStatus }>) {
      const st = state;
      
      st.status = action.payload.status;
    },


  },
});

export const { reducer: ForgotPasswordReducer, actions: forgotPasswordActions } = ForgotPasswordSlice;
