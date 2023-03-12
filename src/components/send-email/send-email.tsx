import { Link } from 'react-router-dom';

import arrowIconRegistration from '../../assets/images/icons/arrowIconRegistration.svg';
import arrowIconRedirect from '../../assets/images/icons/ArrowIconRestore.svg';
import { forgorPasswordSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';
import { ForgotPassForm } from '../forms/forgot-pass-form';
import { FormStatusModal } from '../forms/form-status-modal';

import styles from './send-email.module.css';

export const SendEmail = () => {
  const { status } = useAppSelector(forgorPasswordSelector);

  if (status === 'success') {
    return (
      <FormStatusModal
        title='Письмо выслано'
        message='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
      />
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.goBack}>
        <Link to='/auth'>
          <img src={arrowIconRedirect} alt='arrow icon' /> вход в личный кабинет
        </Link>
      </div>
      <h3>Восстановление пароля</h3>
      <ForgotPassForm />

      <div className={styles.redirectWrapper}>
        <span>Нет учётной записи?</span>
        <Link className={styles.redirectLink} to='/registration'>
          Регистрация
          <img src={arrowIconRegistration} alt='arrow icon' />
        </Link>
      </div>
    </div>
  );
};
