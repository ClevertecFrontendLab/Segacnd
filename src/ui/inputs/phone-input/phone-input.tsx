import { forwardRef, SyntheticEvent, useState } from 'react';
import InputMask from 'react-input-mask';

import { Input } from '../text-input/input';

interface FocusEvent<T = Element> extends SyntheticEvent<T> {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

export interface IInputPhoneProps {
  placeholder: string;
  value?: string | number;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  inputid?: string;
  fieldState: { isDirty: boolean; invalid: boolean; isTouched: boolean };
  errorMessage: string;
  errorStatus: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, IInputPhoneProps>((props, ref) => {
  const { placeholder, inputid, fieldState, errorStatus, errorMessage, onFocus, ...otherProps } = props;
  const [showMask, setShowMask] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setShowMask(true);

    if (onFocus) {
      onFocus(e)
    }
  };

  return (
    <InputMask
      mask='+375(99)999-99-99'
      alwaysShowMask={showMask}
      maskChar='x'
      onFocus={handleFocus}
      {...otherProps}
    >
      <Input
        ref={ref}
        placeholder={placeholder}
        fieldState={fieldState}
        errorStatus={errorStatus}
        inputid={inputid}
        errorMessage={errorMessage}
        {...otherProps}
      />
    </InputMask>
  );
});
