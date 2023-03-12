import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormButton } from '../../ui/form-button/form-button';
import { PasswordInput } from '../../ui/inputs/password-input/password-input';
import { Input } from '../../ui/inputs/text-input/input';
import { useFormData } from '../forms/context/registration-context';
import { registrationFirstStepSchema } from '../forms/form-validation-scheme';

export interface IFirstStep {
  username: string;
  password: string;
}

export interface FieldState {
  isDirty: boolean;
  invalid: boolean;
}

export interface IRegistrationFirstStep {
  increaseStep: () => void;
}

export const RegistrationFirstStep = ({ increaseStep }: IRegistrationFirstStep) => {
  const { setFormValues } = useFormData();

  const { handleSubmit, getFieldState, trigger, reset, control, formState } = useForm<IFirstStep>({
    mode: 'all',
    resolver: yupResolver(registrationFirstStepSchema),
    criteriaMode: 'all',
  });

  const isFieldValid = (field: FieldState) => field.isDirty && !field.invalid;

  const usernameState = getFieldState('username', formState);
  const passwordState = getFieldState('password', formState);

  const onSubmit = (data: IFirstStep) => {
    if (isFieldValid(usernameState) && isFieldValid(passwordState)) {
      setFormValues(data);
      increaseStep();
    }
    reset({
      username: '',
      password: '',
    });
  };

  return (
    <form data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='username'
        defaultValue=''
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            triggerValidation={() => trigger('username')}
            inputid='username'
            fieldState={fieldState}
            placeholder='Придумайте логин для входа'
            errorMessage='Используйте для логина латинский алфавит и цифры'
          />
        )}
      />

      <Controller
        name='password'
        defaultValue=''
        control={control}
        render={({ field, fieldState }) => (
          <PasswordInput
            {...field}
            triggerValidation={() => trigger('password')}
            fieldState={fieldState}
            inputid='password'
            placeholder='Пароль'
            errorMessage='Пароль не менее 8 символов, с заглавной буквой и цифрой'
          />
        )}
      />
      <FormButton value='следующий шаг' disabled={!formState.isValid && formState.isDirty} />
    </form>
  );
};
