import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { authSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';
import { LoaderComponent } from '../loader/loader';

import styles from './form-layout.module.css';

export const FormLayout = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(authSelector);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className={styles.root}>
      <LoaderComponent />
      <h1>Cleverland</h1>
      <div data-test-id='auth' className={styles.innerContent}>
        <Outlet />
      </div>
    </div>
  );
};
