import axios from 'axios';

export const setInterceptor = (token: string) => {
  if (!token) return false;
  axios.defaults.headers.common.Authorization = token;

  return true;
};
