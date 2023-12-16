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

export const updateNicknameAPI = async (nick_name: string) => {
  try {
    const response = await axios.put<ApiResponseType>(
      '/users/update/nick-name',
      {
        nick_name,
      },
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponseType>;
    return Promise.reject(err);
  }
};
