import classNames from 'classnames';

import { CloseButtonIcon, ErrorIcon, SuccessIcon } from '../../assets/icons';
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
      <div className={styles.alertIcon}>{alertStatus === 'error' ? ErrorIcon : SuccessIcon}</div>
      <p className={styles.alertTitle}> {text}</p>
      <button type='button' onClick={() => dispatch(alertActions.closeAlert())}>
        {CloseButtonIcon}
      </button>
    </div>
  );
};
