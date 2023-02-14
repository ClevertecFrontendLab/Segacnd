import { useDispatch, useSelector } from 'react-redux';

import { CloseButtonIcon, ErrorIcon } from '../../assets/icons';
import { viewerSelector } from '../../redux/selectors';
import { viewTypeActions } from '../../redux/slices/content-view-slice';

import styles from './error-component.module.css';

export const ErrorComponent = () => {
  const { errorIsOpen } = useSelector(viewerSelector);
  const dispatch = useDispatch();

  return (
    <div data-test-id='error' className={errorIsOpen ? `${styles.errorWrapper}` : `${styles.errorWrapperHidden}`}>
      <div className={styles.errorIcon}>{ErrorIcon}</div>
      <p className={styles.errorTitle}> Что-то пошло не так. Обновите страницу через некоторое время.</p>
      <button type='button' onClick={() => dispatch(viewTypeActions.errorStateChanger(false))}>
        {CloseButtonIcon}
      </button>
    </div>
  );
};
