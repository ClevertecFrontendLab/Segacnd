import axios from 'axios';
import Cookies from 'js-cookie';

import { BASE_URL } from '../not-env';

export const defaultRequest = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}/api`,
});

defaultRequest.interceptors.request.use(
  (config) => {
    const authConfig = config;

    if (config.headers) {
      const token = Cookies.get('jwt');

      if (token) {
        authConfig.headers.authorization = `Bearer ${token}`;
      }
    }  

    authConfig.withCredentials = true;

    return authConfig;
  },
  (error) => Promise.reject(error)
);
