import { useState } from 'react';

import { StarClear, StarFull } from '../../assets/icons';

import styles from './raiting-component.module.css';

export const Raiting = ({ raiting }) => {


  const raitingStar = Array.from({ length: 5 }, (elem, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <span key={index}>{raiting >= index  ? StarFull : StarClear}</span>
  ));

  return (
    <div className={styles.root}>
      {raitingStar}
    </div>
  );
};
