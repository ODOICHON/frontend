import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './mocks/worker';
import '@/styles/reset.scss';

if (import.meta.env.DEV) {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </React.StrictMode>,
);
