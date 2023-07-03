import axios, { AxiosError } from 'axios';
import {
  ApiResponseType,
  ApiResponseWithDataType,
} from '@/types/apiResponseType';

export const reissue = async () => {
  try {
    const { data } = await axios.post<ApiResponseWithDataType<Token>>(
      '/users/reissue',
      {
        access_token: JSON.parse(localStorage.getItem('user')!).state.token
          .access_token,
      },
      { withCredentials: true },
    );
    return data;
  } catch (err) {
    alert((err as AxiosError<ApiResponseType>).response?.data.message);
  }
};
