import axios, { AxiosError } from 'axios';
import { ApiResponseType } from '@/types/apiResponseType';

export const LogoutAPI = async () => {
  try {
    const response = await axios.post<ApiResponseType>('/users/logout');
    if (response.data.code === 'SUCCESS') {
      delete axios.defaults.headers.common.Authorization;
    }
    return response.data;
  } catch (err) {
    alert((err as AxiosError<ApiResponseType>).response?.data.message);
  }
};
