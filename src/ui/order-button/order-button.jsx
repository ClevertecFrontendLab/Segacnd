import { useMemo } from 'react';

import styles from './orderButton.module.css';

export const OrderButton = ({ isOrdered, inStock, bookedUntil, content }) => {
  const buttonHandler = (e) => {
    e.stopPropagation();
    // here will be the logic to create order
  };
  

  

  const buttonStatus = useMemo(() => {
    if (isOrdered) {
      return styles.isOrderedButton;
    }

    if (inStock) {
      return styles.disableButton;
    }

    return styles.button;
  }, [isOrdered, inStock]);

  const buttonText = isOrdered ? `занята до ${bookedUntil}` : inStock ? 'забронирована' : 'забронировать';

  return (
    <button type='button' onClick={buttonHandler} className={buttonStatus}>
      {content || buttonText}
    </button>
  );
};
