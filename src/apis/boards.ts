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

// trade board 관련
export const PutScrapAPI = async (id: number) => {
  try {
    const { data } = await axios.put<ApiResponseWithDataType<number>>(
      `/scraps/${id}`,
    );
    return data;
  } catch (err) {
    alert((err as AxiosError<ApiResponseType>).response?.data.message);
  }
};

export const DeleteScrapAPI = async (id: number) => {
  try {
    const { data } = await axios.delete<ApiResponseType>(`/scraps/${id}`);
    return data;
  } catch (err) {
    alert((err as AxiosError<ApiResponseType>).response?.data.message);
  }
};

// 신고하기 함수
export const PutReportAPI = async (id: number, reportReason: string) => {
  try {
    const { data } = await axios.put<ApiResponseType>(`houses/report/${id}`, {
      reportReason,
    });
    return data;
  } catch (err) {
    alert((err as AxiosError<ApiResponseType>).response?.data.message);
  }
};
