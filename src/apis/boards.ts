import axios, { AxiosError } from 'axios';

export const PostBoardAPI = async (form: BoardForm) => {
  try {
    const { data } = await axios.post<BoardPostResponse>('/boards', form);
    return data;
  } catch (err) {
    alert((err as AxiosError<any>).response?.data.message);
  }
};

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
