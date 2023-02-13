import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { SocialMediaIcons } from '../../assets/icons';
import { viewTypeActions } from '../../redux/slices/content-view-slice';
import { HeaderComponent } from '../header';
import { ScrollToTop } from '../scroll-to-top';

import styles from './layout.module.css';

export const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewTypeActions.burgerToggle(false));
  }, [dispatch, location]);

  return (
    <React.Fragment>
      <ScrollToTop />
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
