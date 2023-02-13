import {  UserAvatar } from '../../assets/icons';
import { Raiting } from '../raiting/raiting-component';

import styles from './review.module.css';

export const Review = ({ name, createdAt, text, raiting }) => (
  <div className={styles.root}>
    <div className={styles.title}>
      <div className={styles.imgWrapper}>{UserAvatar}</div>
      <div className={styles.userInfoWrapper}>
        <p className={styles.userName}>Ivan Babayan</p>
      <p className={styles.date}>{createdAt.slice(0, 10) || 0}</p>
      </div>
      
    </div>
    <Raiting rairing={raiting}/>

    <p className={styles.comment}>{text}</p>
  </div>
);
