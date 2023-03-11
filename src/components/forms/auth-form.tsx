import { Controller, useForm } from 'react-hook-form';
import InputMask, { ReactInputMask } from 'react-input-mask';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';

import { Higlight } from '../../pages/book/highlight';
import { authActions } from '../../redux/slices/authorization-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { FormButton } from '../../ui/form-button/form-button';
import { PasswordInput } from '../../ui/inputs/password-input/password-input';
import { PhoneInput } from '../../ui/inputs/phone-input/phone-input';
import { Input } from '../../ui/inputs/text-input/input';


import styles from './auth.module.css';
import { loginSchema } from './form-validation-scheme';
import { authSelector } from '../../redux/selectors';

export interface LoginForm {
  identifier: string;
  password: string;
}

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(authSelector);

  const {
    handleSubmit,
    formState,
    watch,
    reset,
    control,
  } = useForm<LoginForm>({ mode: 'all', resolver: yupResolver(loginSchema), criteriaMode: 'all' });

  const loginValue = watch('identifier');
  const passValue = watch('password');

  const onSubmit = (data: LoginForm) => {
    dispatch(authActions.startFetchingAuth({ authDetails: data }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={error?.status === 400 ? styles.uncorrectLogin : ''}>
      <Controller
        name='identifier'
        control={control}
        defaultValue=''
        render={({ field, fieldState }) => (
          <Input
            fieldState={fieldState}
            {...field}
            inputid='identifier'
            value={loginValue}
            placeholder='Логин'
          />
        )}
      />
      <Controller
        name='password'
        defaultValue=''
        control={control}
        render={({ field, fieldState }) => (
          <PasswordInput
            fieldState={fieldState}
            {...field}
            placeholder='Пароль'
            inputid='password'
            value={passValue}
            showValidCheck={false}
          />
        )}
      />

      {error?.status === 400 ? (
        <div>
          <p className={styles.errorText}>Неверный логин или пароль!</p>
          <Link className={styles.redirectLink} to='/forgot-pass'>
            Восстановить?
          </Link>
        </div>
      ) : (
        <Link className={styles.redirectToForgot} to='/forgot-pass'>
          Забыли логин или пароль?
        </Link>
      )}

      <FormButton disabled={!formState.isValid && formState.isDirty} value='вход' />
    </form>
  );
};
