import React, { SyntheticEvent, useState } from 'react';
import { FieldError } from 'react-hook-form';

import { Higlight } from '../../../pages/book/highlight';

import styles from './input.module.css';

interface FocusEvent<T = Element> extends SyntheticEvent<T> {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

export interface IInputProps {
  fieldState: { isDirty: boolean; invalid: boolean; error?: FieldError };
  placeholder?: string;
  value?: string | number;
  inputid?: string;
  type?: string;
  errorMessage?: string;
  errorStatus?: string;
  infoMessage?: string;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const [isNameInputActive, setIsInputActive] = useState(false);

  const {
    placeholder,
    fieldState: { invalid, isDirty, error },
    errorMessage,
    errorStatus,
    infoMessage,
    onFocus,
    ...otherProps
  } = props;

  const fieldCheck = invalid && !isNameInputActive;

  const handleOnFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsInputActive(true);

    if (onFocus) {
      onFocus(e);
    }
  };

  return (
    <React.Fragment>
      <div className={fieldCheck ? `${styles.errorBorder} ${styles.root}` : `${styles.defaultBorder} ${styles.root}`}>
        <input
          ref={ref}
          type='text'
          autoComplete='off'
          {...otherProps}
          id={props.inputid}
          onFocus={handleOnFocus}
          onBlur={() => setIsInputActive(false)}
        />
        <label
          className={isNameInputActive || props.value ? `${styles.active}` : `${styles.labe}`}
          htmlFor={props.inputid}
        >
          {placeholder}
        </label>
      </div>
      <div className={fieldCheck ? `${styles.errorMessage} ` : ' supportOrErrorText'}>
        {errorMessage && errorStatus ? (
          <Higlight text={errorMessage} query={errorStatus} />
        ) : (
          <span className={errorMessage ? `${styles.errorMessage} ` : ''}>{error?.message || errorMessage}</span>
        )}
      </div>
      {infoMessage && <p className={styles.infoMessage}>{infoMessage}</p>}
    </React.Fragment>
  );
});
