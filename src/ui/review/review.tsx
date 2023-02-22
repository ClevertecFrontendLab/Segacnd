import { UserAvatar } from '../../assets/icons';
import { IComment } from '../../interfases';
import { BASE_URL } from '../../not-env';
import { Raiting } from '../raiting/raiting-component';

import styles from './review.module.css';

export const Review = ({ createdAt, text, rating, user, id }: IComment) => {
  const convertedDate = new Date(Date.parse(createdAt.toString()));
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const normalizeDate = new Intl.DateTimeFormat('ru', dateOptions);

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div className={styles.imgWrapper}>
          {user.avatarUrl ? <img src={`${BASE_URL}${user.avatarUrl}`} alt='' /> : UserAvatar}
        </div>
        <div className={styles.userInfoWrapper}>
          <p className={styles.userName}>
            {user.firstName} {user.lastName}
          </p>
          <p className={styles.date}>{normalizeDate.format(convertedDate)}</p>
        </div>
      </div>
      <Raiting rating={rating} />

      <p className={styles.comment}>{text}</p>
    </div>
  );
};
