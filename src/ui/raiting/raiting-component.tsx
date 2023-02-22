import { useState } from 'react';

import { StarClear } from '../../assets/icons';
import { IRating } from '../../interfases';

import styles from './raiting-component.module.css';

export const Raiting = ({ rating }: IRating) => {
  const [ratings, setRatings] = useState<number>(rating);
  const [hover, setHover] = useState<number>(0);

  const raitingStar = (
    <div className='star-rating'>
      {[...Array(5)].map((star, index) => {
        /* eslint-disable no-param-reassign */
        // eslint-disable react/no-array-index-key
        index += 1;

        return (
          <button
            type='button'
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={index <= (hover || ratings) ? `${styles.on}` : `${styles.off}`}
            onClick={() => setRatings(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(ratings)}
          >
            <span className='star'>{StarClear}</span>
          </button>
        );
      })}
    </div>
  );

  return <div className={styles.root}>{raitingStar}</div>;
};
