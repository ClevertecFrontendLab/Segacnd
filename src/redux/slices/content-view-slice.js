import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  viewType: 'grid',
  // if true - menu is open
  menuState: true,
  burgerState: false,
  commentsState: true,
  errorIsOpen: true,
};

export const viewSlice = createSlice({
  name: 'viewType',
  initialState,
  reducers: {
    viewChanger: (state, action) => {
      const st = state;

      st.viewType = action.payload.viewType;
    },
    menuToggle: (state, action) => {
      const st = state;

      st.menuState = action.payload;
    },
    burgerToggle: (state, action) => {
      const st = state;

      st.burgerState = action.payload;
    },
    commentToggle: (state, action) => {
      const st = state;

      st.commentsState = action.payload;
    },
    errorStateChanger: (state, action) => {
      const st = state;

      st.errorIsOpen = action.payload;
    },
  },
});

export const { reducer: ContentViewReducer, actions: viewTypeActions } = viewSlice;
