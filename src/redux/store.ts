import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';

import { AlertReducer } from './slices/alert-slice';
import { AuthReducer } from './slices/authorization-slice';
import { ContentViewReducer } from './slices/content-view-slice';
import { GetAllBookReducer } from './slices/get-all-books-slice';
import { GetCategoriesReducer } from './slices/get-categories-slice';
import { GetSingleBookReducer } from './slices/get-single-book';
import { RegistrationReducer } from './slices/registration-slice';
import { SearchInputReducer } from './slices/search-input-slice';
import { rootSaga } from './root-saga';
import { ForgotPasswordReducer } from './slices/forgot-pass-slice';
import { ResetPasswordReducer } from './slices/reset-password-slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    viewer: ContentViewReducer,
    getAll: GetAllBookReducer,
    oneBook: GetSingleBookReducer,
    categories: GetCategoriesReducer,
    searchInput: SearchInputReducer,
    alert: AlertReducer,
    auth: AuthReducer,
    registration: RegistrationReducer,
    forgotPassword: ForgotPasswordReducer,
    resetPassword: ResetPasswordReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

sagaMiddleware.run(rootSaga);
