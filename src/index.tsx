import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout';
import { LayoutMainPage } from './components/layout-main-page';
import { Terms } from './components/terms';
import { MainPage } from './pages/main';
import { SinglePage } from './pages/single-page';
import { store } from './redux/store';
import { routeNames } from './routing/routs';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<LayoutMainPage />}>
              <Route path='/' element={<Navigate to={routeNames.ROOT_PATH} />} />
              <Route path={routeNames.CATEGORY_BOOKS} element={<MainPage />} />
              <Route path={routeNames.TERMS} element={<Terms contentView='terms' />} />
              <Route path={routeNames.CONTRACT} element={<Terms contentView='contract' />} />
            </Route>
            <Route path={routeNames.SINGLE_PAGE} element={<SinglePage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
