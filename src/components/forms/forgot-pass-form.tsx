import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { forgorPasswordSelector } from '../../redux/selectors';
import { forgotPasswordActions } from '../../redux/slices/forgot-pass-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { FormButton } from '../../ui/form-button/form-button';
import { Input } from '../../ui/inputs/text-input/input';

import { forgotPasswordSchema } from './form-validation-scheme';

export interface MailForm {
  email: string;
}
export const ForgotPassForm = () => {
  const { status } = useAppSelector(forgorPasswordSelector);
  const dispatch = useAppDispatch();
  const requestErrorMessage = status === 'error' ? status : '';

  const { handleSubmit, control, formState } = useForm<MailForm>({
    mode: 'all',
    resolver: yupResolver(forgotPasswordSchema),
    criteriaMode: 'all',
  });

  const onSubmit = (data: MailForm) => {
    dispatch(forgotPasswordActions.startFetchingForgotPassword(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='email'
        control={control}
        render={({ field, fieldState }) => (
          <Input
            fieldState={fieldState}
            errorMessage={requestErrorMessage}
            {...field}
            placeholder='Email'
            inputid='email'
            infoMessage='На это email будет отправлено письмо с инструкциями по восстановлению пароля'
          />
        )}
      />

      <FormButton disabled={!formState.isValid && formState.isDirty} value='восстановить' />
    </form>
  );
};
