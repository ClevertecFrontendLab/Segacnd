import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';

import { ContentViewReducer } from './slices/content-view-slice';
import { GetAllBookReducer } from './slices/get-all-books-slice';
import { GetCategoriesReducer } from './slices/get-categories-slice';
import { GetSingleBookReducer } from './slices/get-single-book';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    viewer: ContentViewReducer,
    getAll: GetAllBookReducer,
    oneBook: GetSingleBookReducer,
    categories: GetCategoriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
