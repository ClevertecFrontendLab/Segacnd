import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../redux/store';
import { LoaderComponent } from '../loader/loader';

import styles from './form-layout.module.css';

export const FormLayout = () => {
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'success') {
      navigate('/');
    }
  }, [status, navigate]);

  return (
    <div className={styles.root}>
      <LoaderComponent />
      <h1>Cleverland</h1>
      <div className={styles.innerContent}>
        <Outlet />
      </div>
    </div>
  );
};
