import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { forgorPasswordSelector } from '../../redux/selectors';
import { forgotPasswordActions } from '../../redux/slices/forgot-pass-slice';
import { resetPasswordActions } from '../../redux/slices/reset-password-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { FormButton } from '../../ui/form-button/form-button';
import { PasswordInput } from '../../ui/inputs/password-input/password-input';
import { Input } from '../../ui/inputs/text-input/input';

import { mailSchema } from './form-validation';
import { resetPasswordSchema } from './form-validation-scheme';

export interface IResetPasswordData {
  password: string;
  passwordConfirmation: string;
}

interface IResetPasswordForm {
  code: string;
  setResetData: (data: IResetPasswordData) => void;
}

export const ResetPasswordForm = ({ code, setResetData }: IResetPasswordForm) => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, formState } = useForm<IResetPasswordData>({
    mode: 'all',
    resolver: yupResolver(resetPasswordSchema),
    criteriaMode: 'all',
  });

  const onSubmit = (data: IResetPasswordData) => {
    dispatch(resetPasswordActions.startFetchingResetPassword({ resetRequest: { ...data, code } }));
    setResetData(data)
  };

  const { errors } = formState;

  const passwordMinTextLength = errors.password?.types?.min || '';
  const passwordErrorMessage = errors?.password?.types?.matches?.toString().replace(',', ' ') || '';

  const errorMessage = `${passwordMinTextLength} ${passwordErrorMessage}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='password'
        defaultValue=''
        control={control}
        render={({ field, fieldState }) => (
          <PasswordInput
            {...field}
            fieldState={fieldState}
            inputid='password'
            placeholder='Новый пароль'
            errorMessage='Пароль не менее 8 символов с заглавной буквой и цифрой'
            errorStatus={errorMessage}
          />
        )}
      />

      <Controller
        name='passwordConfirmation'
        defaultValue=''
        control={control}
        render={({ field, fieldState }) => (
          <PasswordInput
            {...field}
            showValidCheck={false}
            fieldState={fieldState}
            inputid='passwordConfirmation'
            placeholder='Повторите пароль'
          />
        )}
      />

      <FormButton disabled={!formState.isValid && formState.isDirty} value='восстановить' />
    </form>
  );
};
