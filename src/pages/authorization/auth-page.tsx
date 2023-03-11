import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AuthForm } from '../../components/forms/auth-form';
import { FormStatusModal } from '../../components/forms/form-status-modal';
import { authSelector } from '../../redux/selectors';
import { authActions } from '../../redux/slices/authorization-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './auth-page.module.css';

export const Authorization = () => {
  const { error, status, authDetails } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(authActions.resetError());
  }, [location, dispatch]);

  const tryAgain = useCallback(() => {
    if (authDetails) {
      dispatch(authActions.startFetchingAuth({ authDetails }));
    }
  }, [authDetails, dispatch]);

  if (status === 'error' && error?.status !== 400) {
    return (
      <FormStatusModal
        title='Вход не выполнен'
        message='Что-то пошло не так. Попробуй еще раз'
        buttonLabel='повторить'
        handleButtonClick={tryAgain}
      />
    );
  }

  return (
    <div className={styles.root}>
      <h3>Вход в личный кабинет</h3>
      <AuthForm />
      <div>
        <span>Нет учётной записи?</span>
        <Link className={styles.redirectLink} to='/registration'>
          Регистрация
        </Link>
      </div>
    </div>
  );
};
