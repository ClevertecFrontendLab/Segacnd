import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBook, IGetOneBook } from '../../interfases';

const initialState: IGetOneBook = {
  book: null,

  status: 'init',
};

export const GetSingleBookSlice = createSlice({
  name: 'singleBooks',
  initialState,
  reducers: {
    startFetchingOneBook: (state, action: PayloadAction<number>) => {
      const st = state;

      st.status = 'loading';
      st.book = null;
    },
    getOneBook: (state, action: PayloadAction<{ book: IBook }>) => {
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
