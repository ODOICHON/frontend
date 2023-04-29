import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { routes } from '@/Routes';
import { reissue } from './apis/reissue';
import { getClient } from './queryClient';
import userStore from './store/userStore';
import ScrollToTop from './utils/ScrollToTop';
import { setInterceptor } from './utils/utils';

export default function App() {
  const { token, setToken, logout } = userStore();
  const { VITE_BASE_URL } = import.meta.env;

  axios.defaults.baseURL = VITE_BASE_URL;
  let refresh = false;
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
          axios.defaults.headers.common.Authorization = data!.data.access_token;
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

  const queryClient = getClient();
  const elem = useRoutes(routes);
  useEffect(() => {
    if (token) {
      setInterceptor(token.access_token);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {elem}
      <ScrollToTop />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
