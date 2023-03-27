import axios from 'axios';

export const LogoutAPI = async () => {
  const response = await axios.post<LogoutSuccess>('/users/logout');
  if (response.data.code === 'SUCCESS') {
    delete axios.defaults.headers.common['Authorization'];
  }
  return response.data;
};

export type LogoutSuccess = {
  code: string;
  message: string;
};
