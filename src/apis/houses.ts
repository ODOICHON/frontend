import axios, { AxiosError } from 'axios';
import { HouseStatusType } from '@/types/Board/myPageType';
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
    return Promise.reject(err);
  }
};

export const PutHouseStatusAPI = async (
  form: HouseStatusType,
  houseId: number,
) => {
  try {
    const response = await axios.put<ApiResponseType>(
      `/houses/status/${houseId}`,
      form,
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponseType>;
    alert(err.response?.data.message);
    return Promise.reject(err);
  }
};

export const PutHouseAPI = async (id: number, form: TradeBoardForm) => {
  try {
    const response = await axios.put<
      ApiResponseWithDataType<TradeBoardDetailType>
    >(`/houses/${id}`, form);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponseType>;
    return err.response?.data;
  }
};

export const DeleteHouseAPI = async (id: number) => {
  try {
    const response = await axios.delete<ApiResponseType>(`/houses/${id}`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponseType>;
    return err.response?.data;
  }
};
