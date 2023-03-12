import { RegistrationFirstStep } from '../registration-steps/registration-first-step';
import { RegistrationSecondStep } from '../registration-steps/registration-second-step';
import { RegistrationThirdStep } from '../registration-steps/registration-third-step';

import { RegistrationFormProvider } from './context/registration-context';

import styles from './registration-form.module.css';

export interface RegisterForm {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastname: string;
  phone: string;
}

export interface IRegForm {
  currentStep: number;
  handleStep: () => void;
}
export const RegistrationForm = ({ currentStep, handleStep }: IRegForm) => {
  const steps = [
    <RegistrationFirstStep increaseStep={handleStep} />,
    <RegistrationSecondStep increaseStep={handleStep} />,
    <RegistrationThirdStep />,
  ];

  return (
    <RegistrationFormProvider>
      <div className={styles.root}>
        <div>{steps[currentStep - 1]}</div>
      </div>
    </RegistrationFormProvider>
  );
};
