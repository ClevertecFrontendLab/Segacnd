import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  // status = 'init' | 'loading' | 'error' | 'success'
  status: 'init',
};

export const GetAllBookSlice = createSlice({
  name: 'allBooks',
  initialState,
  reducers: {
    startFetchingAllBooks: (state) => {
      const st = state;

      st.status = 'loading';
    },
    getAllBooks: (state, action) => {
      const st = state;

      st.books = action.payload.books;
      st.status = 'success';
    },
    failedFetchingAllBooks: (state) => {
      const st = state;

      st.status = 'error';
    },
  },
});

export const { reducer: GetAllBookReducer, actions: getAllBookActions } = GetAllBookSlice;
