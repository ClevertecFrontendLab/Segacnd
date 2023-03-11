import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useFormData } from '../../components/forms/context/registration-context';
import { FormStatusModal } from '../../components/forms/form-status-modal';
import { RegistrationForm } from '../../components/forms/registration-form';
import { registrationSelector } from '../../redux/selectors';
import { registrationActions } from '../../redux/slices/registration-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { FormButton } from '../../ui/form-button/form-button';
import { PasswordInput } from '../../ui/inputs/password-input/password-input';
import { Input } from '../../ui/inputs/text-input/input';

import styles from './registration-page.module.css';

export const Registration = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { status, error } = useAppSelector(registrationSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: formData } = useFormData();

  const redirectToLogin = useCallback(() => {
    navigate('/auth');
    dispatch(registrationActions.resetData());
  }, [navigate, dispatch]);

  const tryAgain = useCallback(() => {
    dispatch(registrationActions.startFetchingRegistration({ registrationDetails: formData }));
  }, [formData, dispatch]);

  const registrationAgain = useCallback(() => {
    setCurrentStep(0);
    dispatch(registrationActions.resetData());
  }, [dispatch]);

  if (status === 'success') {
    return (
      <FormStatusModal
        title='Регистрация успешна'
        message='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
        buttonLabel='вход'
        handleButtonClick={redirectToLogin}
      />
    );
  }

  if (status === 'error' && error?.status === 400) {
    return (
      <FormStatusModal
        title='Данные не сохранились'
        message='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.'
        buttonLabel='назад к регистрации'
        handleButtonClick={registrationAgain}
      />
    );
  }

  if (status === 'error') {
    return (
      <FormStatusModal
        title='Данные не сохранились'
        message='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
        buttonLabel='повторить'
        handleButtonClick={tryAgain}
      />
    );
  }

  const increaseStep = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.root}>
      <h3>Регистрация</h3>
      <h5>{currentStep + 1} шаг из 3</h5>
      <RegistrationForm currentStep={currentStep} handleStep={increaseStep} />

      <div>
        <span>Есть учётная запись?</span>
        <Link className={styles.redirectLink} to='/auth'>
          Войти
        </Link>
      </div>
    </div>
  );
};
