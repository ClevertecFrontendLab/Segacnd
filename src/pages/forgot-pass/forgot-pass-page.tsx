import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { ForgotPassForm } from '../../components/forms/forgot-pass-form';
import { FormStatusModal } from '../../components/forms/form-status-modal';
import { IResetPasswordData, ResetPasswordForm } from '../../components/forms/reset-password-form';
import { forgorPasswordSelector, resetPasswordSelector } from '../../redux/selectors';
import { registrationActions } from '../../redux/slices/registration-slice';
import { resetPasswordActions } from '../../redux/slices/reset-password-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { FormButton } from '../../ui/form-button/form-button';
import { Input } from '../../ui/inputs/text-input/input';
import { OrderButton } from '../../ui/order-button/order-button';

import styles from './forgot-pass-page.module.css';

export const ForgotPass = () => {
  const [searchParams] = useSearchParams();
  const [resetData, setResetData] = useState<IResetPasswordData>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const code = searchParams.get('code');

  const { status: forgotPasswordStatus } = useAppSelector(forgorPasswordSelector);
  const { status: resetPasswordStatus } = useAppSelector(resetPasswordSelector);

  const redirectToLogin = useCallback(() => {
    navigate('/auth');
    dispatch(resetPasswordActions.resetData());
  }, [navigate, dispatch]);

  const tryAgain = useCallback(() => {
    if (resetData && code) {
      dispatch(resetPasswordActions.startFetchingResetPassword({ resetRequest: { ...resetData, code } }));
    }
  }, [resetData, code, dispatch]);

  if (forgotPasswordStatus === 'success') {
    return (
      <FormStatusModal
        title='Письмо выслано'
        message='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
      />
    );
  }

  if (resetPasswordStatus === 'success') {
    return (
      <FormStatusModal
        title='Новые данные сохранены'
        message='Зайдите в личный кабинет, используя свои логин и новый пароль'
        buttonLabel='вход'
        handleButtonClick={redirectToLogin}
      />
    );
  }

  if (resetPasswordStatus === 'error') {
    return (
      <FormStatusModal
        title='Данные не сохранились'
        message='Что-то пошло не так. Попробуйте ещё раз'
        buttonLabel='повторить'
        handleButtonClick={tryAgain}
      />
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.goBack}>
        <Link to='/auth'>вход в личный кабинет</Link>
      </div>
      <h3>Восстановление пароля</h3>
      {code ? <ResetPasswordForm setResetData={setResetData} code={code} /> : <ForgotPassForm />}

      <div>
        <span>Нет учётной записи?</span>
        <Link className={styles.redirectLink} to='/registration'>
          Регистрация
        </Link>
      </div>
    </div>
  );
};
