import axios, { AxiosError } from 'axios';
import {
  ApiResponseType,
  ApiResponseWithDataType,
} from '@/types/apiResponseType';

export type LoginForm = {
  email: string;
  password: string;
};

export const LoginAPI = async (form: LoginForm) => {
  try {
    const { data } = await axios.post<ApiResponseWithDataType<Token>>(
      '/users/sign-in',
      form,
      {
        withCredentials: true,
      },
    );
    axios.defaults.headers.common.Authorization = data.data.access_token;
    return data;
  } catch (err) {
    alert((err as AxiosError<ApiResponseType>).response?.data.message);
  }
};
