import axios, { AxiosError } from 'axios';

export const LoginAPI = async (form: LoginForm) => {
  try {
    const { data } = await axios.post<LoginSuccess>('/users/sign-in', form);
    axios.defaults.headers.common['Authorization'] = data.data.access_token;
    return data;
  } catch (err) {
    alert((err as AxiosError<LoginError, undefined>).response?.data.message);
  }
};

export type LoginSuccess = {
  code: string;
  message: string;
  data: Tokens;
};

export type LoginError = {
  code: string;
  message: string;
};

export type LoginForm = {
  email: string;
  password: string;
};
