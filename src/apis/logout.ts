import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';

export type LogoutSuccess = {
  code: string;
  message: string;
};
export const LogoutAPI = async () => {
  try {
    const response = await axios.post<LogoutSuccess>('/users/logout');
    if (response.data.code === 'SUCCESS') {
      delete axios.defaults.headers.common.Authorization;
    }
    return response.data;
  } catch (err) {
    alert((err as AxiosError<ErrorResponse>).response?.data.message);
  }
};
