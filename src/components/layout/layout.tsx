import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { SocialMediaIcons } from '../../assets/icons';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { useAppDispatch } from '../../redux/store';
import { AlertComponent } from '../../ui/alert/alert-component';
import { LoaderComponent } from '../../ui/loader/loader';
import { HeaderComponent } from '../header';
import { ScrollToTop } from '../scroll-to-top';

import styles from './layout.module.css';


export const Layout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(viewTypeActions.burgerToggle(false));
  }, [dispatch, location]);

  return (
    <React.Fragment>
      <ScrollToTop />
      <AlertComponent />
      <LoaderComponent />
      <div className={styles.root}>
        <HeaderComponent />
        <main>
          <Outlet />
        </main>

        <footer>
          <div>© 2020-2023 Cleverland. Все права защищены.</div>
          <div>{SocialMediaIcons}</div>
        </footer>
      </div>
    </React.Fragment>
  );
};
