import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';

export type LoginSuccess = {
  code: string;
  message: string;
  data: Token;
};
export type LoginForm = {
  email: string;
  password: string;
};
export const LoginAPI = async (form: LoginForm) => {
  try {
    const { data } = await axios.post<LoginSuccess>('/users/sign-in', form, {
      withCredentials: true,
    });
    axios.defaults.headers.common.Authorization = data.data.access_token;
    return data;
  } catch (err) {
    alert((err as AxiosError<ErrorResponse>).response?.data.message);
  }
};
