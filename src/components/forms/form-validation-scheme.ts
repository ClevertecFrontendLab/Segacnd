import * as yup from 'yup';

import {
  confirmPasswordSchema,
  mailSchema,
  passwordSchema,
  phoneSchema,
  textFieldSchema,
  userNameSchema,
} from './form-validation';

export const forgotPasswordSchema = yup.object().shape({ email: mailSchema });
export const registrationFirstStepSchema = yup.object().shape({ username: userNameSchema, password: passwordSchema });
export const registrationSecondStepSchema = yup
  .object()
  .shape({ firstName: textFieldSchema, lastName: textFieldSchema });
export const registrationThirdStepSchema = yup.object().shape({ phone: phoneSchema, email: mailSchema });
export const loginSchema = yup.object().shape({ identifier: textFieldSchema, password: textFieldSchema });
export const resetPasswordSchema = yup
  .object()
  .shape({ password: passwordSchema, passwordConfirmation: confirmPasswordSchema });
