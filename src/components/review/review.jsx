import {  UserAvatar } from '../../assets/icons';
import { Raiting } from '../raiting/raiting-component';

import styles from './review.module.css';

export const Review = ({ createdAt, text, raiting, user }) => (
  <div className={styles.root}>
    
    <div className={styles.title}>
      <div className={styles.imgWrapper}>{user.avatarUrl  ? <img src={user.avatarUrl} alt="" /> : UserAvatar}</div>
      <div className={styles.userInfoWrapper}>
        <p className={styles.userName}>{user.firstName} {user.lastName}</p>
      <p className={styles.date}>{createdAt.slice(0, 10) || 0}</p>
      </div>
      
    </div>
    <Raiting rairing={raiting}/>

    <p className={styles.comment}>{text}</p>
  </div>
);
