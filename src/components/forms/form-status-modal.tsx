import styles from './form-status-modal.module.css';

export interface IFormStatusModal {
  title: string;
  message: string;
  buttonLabel?: string;
  handleButtonClick?: () => void;
}

export const FormStatusModal = ({ title, message, buttonLabel, handleButtonClick }: IFormStatusModal) => (
  <div className={styles.root}>
    <h4>{title}</h4>
    <p>{message}</p>

    {buttonLabel && handleButtonClick && (
      <button type='button' onClick={handleButtonClick}>{buttonLabel}</button>
    )}
  </div>
);
