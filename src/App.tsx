import ReactGA from 'react-ga';
import { useRoutes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { routes } from '@/Routes';
import { getClient } from './queryClient';

const GA_TRACK_ID = import.meta.env.VITE_GA_TRACK_ID;

export default function App() {
  const queryClient = getClient();
  const elem = useRoutes(routes);

  ReactGA.initialize(GA_TRACK_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <QueryClientProvider client={queryClient}>
      {elem}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
