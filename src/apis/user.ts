import axios, { AxiosError } from 'axios';
import {
  ApiResponseType,
  ApiResponseWithDataType,
} from '@/types/apiResponseType';

export const checkPasswordAPI = async (password: string) => {
  try {
    const response = await axios.post<ApiResponseWithDataType<boolean>>(
      '/users/check/password',
      { password },
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponseType>;
    return Promise.reject(err);
  }
};
