import Lottie from 'lottie-react';

import { useAppSelector } from '../../redux/store';

import loadingAnimation from './loaderAnimation.json';

import styles from './loader.module.css';

export const LoaderComponent = () => {
  const singleBookStatus = useAppSelector((state) => state.oneBook.status);
  const categoriesStatus = useAppSelector((state) => state.categories.status);
  const allBooksStatus = useAppSelector((state) => state.getAll.status);

  const loadStatus = 'loading';

  const isLoading = singleBookStatus === loadStatus || categoriesStatus === loadStatus || allBooksStatus === loadStatus;

  return (
    <div data-test-id='loader' className={isLoading ? `${styles.loaderWrapper}` : `${styles.hideLoader}`}>
      <Lottie animationData={loadingAnimation} loop={true} />{' '}
    </div>
  );
};
