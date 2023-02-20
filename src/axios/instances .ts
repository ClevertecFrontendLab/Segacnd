import axios from 'axios';

import { BASE_URL } from '../not-env';

export const defaultRequest = axios.create({ baseURL: `${BASE_URL}/api` });
