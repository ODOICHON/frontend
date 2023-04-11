import axios from 'axios';

export const reissue = async () => {
  try {
    const { data } = await axios.post<ReissueResponse>(
      '/users/reissue',
      {
        access_token: JSON.parse(localStorage.getItem('user')!).state.tokens
          .access_token,
      },
      { withCredentials: true },
    );
    return data;
  } catch (e) {
    return;
  }
};

type ReissueResponse = {
  code: string;
  message: string;
  data: Data;
};

type Data = {
  access_token: string;
  refresh_token: string;
};
