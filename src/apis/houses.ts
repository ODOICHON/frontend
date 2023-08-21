import axios, { AxiosError } from 'axios';
import { TradeBoardDetailType, TradeBoardForm } from '@/types/Board/tradeType';
import {
  ApiResponseType,
  ApiResponseWithDataType,
} from '@/types/apiResponseType';

export const PostHouseAPI = async (form: TradeBoardForm) => {
  try {
    const response = await axios.post<
      ApiResponseWithDataType<TradeBoardDetailType>
    >('/houses', form);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponseType>;
    return err.response?.data;
  }
};
