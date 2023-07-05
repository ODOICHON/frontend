import axios, { AxiosError } from 'axios';
import { BoardFormType } from '@/types/Board/boardType';
import {
  ApiResponseType,
  ApiResponseWithDataType,
} from '@/types/apiResponseType';

export const PostBoardAPI = async (form: BoardFormType) => {
  try {
    const { data } = await axios.post<ApiResponseWithDataType<number>>(
      '/boards',
      form,
    );
    return data;
  } catch (err) {
    alert((err as AxiosError<ApiResponseType>).response?.data.message);
  }
};

export const DeleteBoardAPI = async (id: string) => {
  try {
    const { data } = await axios.delete<ApiResponseType>(`/boards/${id}`);
    return data;
  } catch (err) {
    alert((err as AxiosError<ApiResponseType>).response?.data.message);
  }
};
