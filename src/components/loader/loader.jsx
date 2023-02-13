import Lottie from 'lottie-react';

import loadingAnimation from './loaderAnimation.json';

import styles from './loader.module.css';

export const LoaderComponent = () => (
  <div data-test-id='loader' className={styles.loaderWrapper}>
    <Lottie animationData={loadingAnimation} loop={true} />{' '}
  </div>
);
