import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICategories, IGetCategories } from '../../interfases';

const initialState: IGetCategories = {
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
    getCategories: (state, action: PayloadAction<{ categories: ICategories[] }>) => {
      /* eslint-disable no-param-reassign */
      state.categories = action.payload.categories;
      state.status = 'success';
    },
    failedFetchingCategories: (state) => {
      const st = state;

      st.status = 'error';
    },
  },
});

export const { reducer: GetCategoriesReducer, actions: getCategoriesActions } = GetCategoriesSlice;
