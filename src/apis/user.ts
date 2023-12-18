import axios, { AxiosError } from 'axios';
import { ApiResponseType } from '@/types/apiResponseType';

// 회원탈퇴 api
export const withdrawalAPI = async (reason: string[], content: string) => {
  try {
    const response = await axios.post(`/users/withdrawal`, { reason, content });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponseType>;
    return Promise.reject(err);
  }
};
