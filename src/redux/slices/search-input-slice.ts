import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {  ISearchInput } from '../../interfases';

const initialState: ISearchInput = {
  query: '',
};

export const SearchInputSlice = createSlice({
  name: 'searchInput',
  initialState,
  reducers: {
    inputValueCHanger: (state, action: PayloadAction<{ query: string }>) => {
      const st = state;

      st.query = action.payload.query;
    },
   
  },
});

export const { reducer: SearchInputReducer, actions: searchInputActions } = SearchInputSlice;
