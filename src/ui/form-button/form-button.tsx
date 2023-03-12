import styles from './form-button.module.css';

interface IFormButton {
  value: string;
  handleStep?: () => void;
  disabled: boolean;
}

export const FormButton = (props: IFormButton) => (
  <button
    className={props.disabled ? `${styles.disabledButton}` : `${styles.button}`}
    type='submit'
    disabled={props.disabled}
    onClick={() => props.handleStep && props.handleStep()}
  >
    {props.value}
  </button>
);
