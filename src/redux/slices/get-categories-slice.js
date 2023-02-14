import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],

  status: 'init',
};

export const GetCategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    startFetchingCategories: (state) => {
      const st = state;

      st.status = 'loading';
    },
    getCategories: (state, action) => {
      const st = state;

      st.categories = action.payload.categories;
      st.status = 'success';
    },
    failedFetchingCategories: (state) => {
      const st = state;

      st.status = 'error';
    },
  },
});

export const { reducer: GetCategoriesReducer, actions: getCategoriesActions } = GetCategoriesSlice;
