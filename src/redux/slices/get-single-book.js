import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  book: {},

  status: 'init',
};

export const GetSingleBookSlice = createSlice({
  name: 'singleBooks',
  initialState,
  reducers: {
    startFetchingOneBook: (state) => {
      const st = state;

      st.status = 'loading';
    },
    getOneBook: (state, action) => {
      const st = state;

      st.book = action.payload.book;
      st.status = 'success';
    },
    failedFetchingOneBook: (state) => {
      const st = state;

      st.status = 'error';
    },
  },
});

export const { reducer: GetSingleBookReducer, actions: getSingleBookActions } = GetSingleBookSlice;
