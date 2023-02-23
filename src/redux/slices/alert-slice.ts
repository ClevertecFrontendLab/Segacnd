import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAlertSlice } from '../../interfases';

const initialState: IAlertSlice = {
  isShow: false,
  text: '',
  alertStatus: 'successful',
};

export const alertSlice = createSlice({
  name: 'alertSlice',
  initialState,
  reducers: {
    showAlert(state, action: PayloadAction<{ text: string; status: 'successful' | 'error' }>) {
      const st = state;

      st.isShow = true;
      st.alertStatus = action.payload.status;
      st.text = action.payload.text;
    },
    closeAlert(state) {
      const st = state;

      st.isShow = false;
    },
  },
});

export const { reducer: AlertReducer, actions: alertActions } = alertSlice;
