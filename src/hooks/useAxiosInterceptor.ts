import { useEffect } from 'react';
import axios from 'axios';
import { reissue } from '@/apis/reissue';
import userStore from '@/store/userStore';
import { setInterceptor } from '@/utils/utils';

const useAxiosInterceptor = () => {
  const { token, setToken, logout } = userStore();
  const { VITE_BASE_URL } = import.meta.env;

  axios.defaults.baseURL = VITE_BASE_URL;
  let refresh = false;

  useEffect(() => {
    if (token) {
      setInterceptor(token.access_token);
    }
    axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response?.status === 401 && !refresh) {
          try {
            refresh = true;
            const data = await reissue();
            setToken({
              access_token: data!.data.access_token,
            });
            axios.defaults.headers.common.Authorization =
              data!.data.access_token;
            error.config.headers.authorization = data!.data.access_token;
            refresh = false;
            return axios.request(error.config);
          } catch (e) {
            delete axios.defaults.headers.common.Authorization;
            logout();
          }
        }
        refresh = false;
        return Promise.reject(error);
      },
    );
  }, []);
};

export default useAxiosInterceptor;
