import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';

type ReissueResponse = {
  code: string;
  message: string;
  data: Token;
};
export const reissue = async () => {
  try {
    const { data } = await axios.post<ReissueResponse>(
      '/users/reissue',
      {
        access_token: JSON.parse(localStorage.getItem('user')!).state.token
          .access_token,
      },
      { withCredentials: true },
    );
    return data;
  } catch (err) {
    alert((err as AxiosError<ErrorResponse>).response?.data.message);
  }
};
