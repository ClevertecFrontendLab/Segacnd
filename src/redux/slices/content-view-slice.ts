import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IContentView } from '../../interfases';

const initialState: IContentView = {
  viewType: 'grid',
  // if true - menu is open
  menuState: true,
  burgerState: false,
  commentsState: true,
  errorIsOpen: true,
  sortType: 'DESC',
  accountModal: false,
};

export const viewSlice = createSlice({
  name: 'viewType',
  initialState,
  reducers: {
    viewChanger: (state, action: PayloadAction<{ viewType: 'grid' | 'column' }>) => {
      const st = state;

      st.viewType = action.payload.viewType;
    },
    sortChanger: (state, action: PayloadAction<{ sortType: 'ASC' | 'DESC' }>) => {
      const st = state;

      st.sortType = action.payload.sortType;
    },
    menuToggle: (state, action: PayloadAction<boolean>) => {
      const st = state;

      st.menuState = action.payload;
    },
    accountModalToggle: (state, action: PayloadAction<boolean>) => {
      const st = state;

      st.accountModal = action.payload;
    },
    burgerToggle: (state, action: PayloadAction<boolean>) => {
      const st = state;

      st.burgerState = action.payload;
    },
    commentToggle: (state, action: PayloadAction<boolean>) => {
      const st = state;

      st.commentsState = action.payload;
    },
    errorStateChanger: (state, action: PayloadAction<boolean>) => {
      const st = state;

      st.errorIsOpen = action.payload;
    },
  },
});

export const { reducer: ContentViewReducer, actions: viewTypeActions } = viewSlice;
