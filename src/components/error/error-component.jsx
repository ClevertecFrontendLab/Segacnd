import { useDispatch, useSelector } from 'react-redux';

import { viewTypeActions } from '../../redux/slices/content-view-slice';

import styles from './error-component.module.css';

export const ErrorComponent = () => {
  const errorIsOpen = useSelector((state) => state.viewer.errorIsOpen);
  const dispatch = useDispatch();

  return (
    <div data-test-id='error' className={errorIsOpen ? `${styles.errorWrapper}` : `${styles.errorWrapperHidden}`}>
      <div className={styles.errorIcon}>
        <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z'
            fill='#F42C4F'
            stroke='#F42C4F'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path d='M16 10V17' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
          <path
            d='M16 22.75C16.6904 22.75 17.25 22.1904 17.25 21.5C17.25 20.8096 16.6904 20.25 16 20.25C15.3096 20.25 14.75 20.8096 14.75 21.5C14.75 22.1904 15.3096 22.75 16 22.75Z'
            fill='white'
          />
        </svg>
      </div>
      <p className={styles.errorTitle}> Что-то пошло не так. Обновите страницу через некоторое время.</p>
      <button type='button' onClick={() => dispatch(viewTypeActions.errorStateChanger(false))}>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z'
            fill='#363636'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z'
            fill='#363636'
          />
        </svg>
      </button>
    </div>
  );
};
