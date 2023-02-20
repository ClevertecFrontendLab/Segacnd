import { useMemo } from 'react';

import { IButtonProps } from '../../interfases';

import styles from './orderButton.module.css';

export const OrderButton = ({ isOrdered, inStock, bookedUntil, content }: IButtonProps) => {
  const buttonHandler = (e: React.SyntheticEvent) => {
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
