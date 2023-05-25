import { useRoutes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { routes } from '@/Routes';
import { getClient } from './queryClient';

export default function App() {
  const queryClient = getClient();
  const elem = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      {elem}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
