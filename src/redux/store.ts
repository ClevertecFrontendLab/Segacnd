import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';

import { AlertReducer } from './slices/alert-slice';
import { ContentViewReducer } from './slices/content-view-slice';
import { GetAllBookReducer } from './slices/get-all-books-slice';
import { GetCategoriesReducer } from './slices/get-categories-slice';
import { GetSingleBookReducer } from './slices/get-single-book';
import { SearchInputReducer } from './slices/search-input-slice';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    viewer: ContentViewReducer,
    getAll: GetAllBookReducer,
    oneBook: GetSingleBookReducer,
    categories: GetCategoriesReducer,
    searchInput: SearchInputReducer,
    alert: AlertReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

sagaMiddleware.run(rootSaga);
