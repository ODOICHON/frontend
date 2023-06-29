import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';

type BoardForm = {
  title: string;
  code: string;
  category: string;
  imageUrls: string[];
  prefixCategory: string;
  fixed: boolean;
};

type BoardPostResponse = {
  code: string;
  message: string;
  data: number;
};

type Response = {
  code: string;
  message: string;
};
export const PostBoardAPI = async (form: BoardForm) => {
  try {
    const { data } = await axios.post<BoardPostResponse>('/boards', form);
    return data;
  } catch (err) {
    alert((err as AxiosError<ErrorResponse>).response?.data.message);
  }
};

export const DeleteBoardAPI = async (id: string) => {
  try {
    const { data } = await axios.delete<Response>(`/boards/${id}`);
    return data;
  } catch (err) {
    alert((err as AxiosError<ErrorResponse>).response?.data.message);
  }
};

// trade board 관련
export const PutScrapAPI = async (id: number) => {
  try {
    const { data } = await axios.put<BoardPostResponse>(`/scraps/${id}`);
    return data;
  } catch (err) {
    alert((err as AxiosError<ErrorResponse>).response?.data.message);
  }
};

export const DeleteScrapAPI = async (id: number) => {
  try {
    const { data } = await axios.delete<BoardPostResponse>(`/scraps/${id}`);
    return data;
  } catch (err) {
    alert((err as AxiosError<ErrorResponse>).response?.data.message);
  }
};

// 신고하기 함수
export const PutReportAPI = async (id: number, reportReason: string) => {
  try {
    const { data } = await axios.put<BoardPostResponse>(`houses/report/${id}`, {
      reportReason,
    });
    return data;
  } catch (err) {
    alert((err as AxiosError<ErrorResponse>).response?.data.message);
  }
};
