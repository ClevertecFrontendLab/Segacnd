import { RootState } from './store';

export const oneBookSelector = (state: RootState) => state.oneBook;
export const viewerSelector = (state: RootState) => state.viewer;
export const categoriesSelector = (state: RootState) => state.categories;
export const getAllBookSelector = (state: RootState) => state.getAll;
export const searchInputSelector = (state: RootState) => state.searchInput;
export const AlertSelector = (state: RootState) => state.alert;
