import classNames from 'classnames';

import CloseIcon from '../../assets/images/icons/close-action-icon.svg';
import SuccessIcon from '../../assets/images/icons/success-icon.svg';
import ErrorIcon from '../../assets/images/icons/warning-circle-icon.svg';
import { AlertSelector } from '../../redux/selectors';
import { alertActions } from '../../redux/slices/alert-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './alert-component.module.css';

export const AlertComponent = () => {
  const { isShow, text, alertStatus } = useAppSelector(AlertSelector);
  const dispatch = useAppDispatch();

  return (
    <div
      data-test-id='error'
      className={classNames(styles.alertWrapper, {
        [styles.errorWrapper]: alertStatus === 'error',
        [styles.succesWrapper]: alertStatus === 'successful',
        [styles.alertHidden]: !isShow,
      })}
    >
      <div className={styles.alertIcon}>
        <img src={alertStatus === 'error' ? ErrorIcon : SuccessIcon} alt='alert icon' />
      </div>
      <p className={styles.alertTitle}> {text}</p>
      <button type='button' onClick={() => dispatch(alertActions.closeAlert())}>
        <img src={CloseIcon} alt='alert icon' />
      </button>
    </div>
  );
};
