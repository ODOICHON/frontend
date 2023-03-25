import { useRoutes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { getClient } from './queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { routes } from '@/Routes';
import '@/apis/axios';
import { useEffect } from 'react';
import { setInterceptor } from './utils/utils';
import userStore from './store/userStore';

export default function App() {
  const { tokens } = userStore();
  const queryClient = getClient();
  const elem = useRoutes(routes);
  useEffect(() => {
    if (tokens) {
      setInterceptor(tokens.access_token);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {elem}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
