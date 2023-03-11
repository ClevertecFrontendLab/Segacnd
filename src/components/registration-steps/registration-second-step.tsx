import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormButton } from '../../ui/form-button/form-button';
import { PasswordInput } from '../../ui/inputs/password-input/password-input';
import { Input } from '../../ui/inputs/text-input/input';
import { useFormData } from '../forms/context/registration-context';
import { textFieldSchema } from '../forms/form-validation';
import { registrationSecondStepSchema } from '../forms/form-validation-scheme';

export interface IFirstStep {
  firstName: string;
  lastName: string;
}

interface FieldState {
  isDirty: boolean;
  invalid: boolean;
}

interface IRegistrationSecondStep {
  increaseStep: () => void;
}

export const RegistrationSecondStep = ({ increaseStep }: IRegistrationSecondStep) => {

  const { handleSubmit, getFieldState, watch, reset, control, formState } = useForm<IFirstStep>({
    mode: 'all',
    resolver: yupResolver(registrationSecondStepSchema),
    criteriaMode: 'all',
  });

  const isFieldValid = (field: FieldState) => field.isDirty && !field.invalid;

  const firstNameState = getFieldState('firstName', formState);
  const lastNameState = getFieldState('lastName', formState);
  const firstNameValue = watch('firstName');
  const lastNameValue = watch('lastName');

  const { setFormValues } = useFormData();
  const onSubmit = (data: IFirstStep) => {
    if (isFieldValid(firstNameState) && isFieldValid(lastNameState)) {
      setFormValues(data);
      increaseStep();
    }
    reset({
      firstName: '',
      lastName: '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='firstName'
        control={control}
        defaultValue=''
        render={({ field, fieldState }) => (
          <Input
            {...field}
            value={firstNameValue}
            fieldState={fieldState}
            inputid='firstName'
            placeholder='Имя'
          />
        )}
      />

      <Controller
        name='lastName'
        control={control}
        defaultValue=''
        render={({ field, fieldState }) => (
          <Input
            fieldState={fieldState}
            {...field}
            value={lastNameValue}
            inputid='lastName'
            placeholder='Фамилия'
          />
        )}
      />

      <FormButton value='последний шаг' disabled={!formState.isValid && formState.isDirty} />
    </form>
  );
};
