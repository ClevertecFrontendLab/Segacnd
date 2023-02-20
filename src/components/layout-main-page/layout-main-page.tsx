import { Outlet } from 'react-router-dom';

import { MenuComponent } from '../menu';

import styles from './layout-main-page.module.css';

export const LayoutMainPage = () => (
  <div className={styles.root}>
    <MenuComponent
      isBurgerMenu={false}
      testIds={['navigation-showcase', 'navigation-books', 'navigation-terms', 'navigation-contract']}
    />
    <Outlet />
  </div>
);
