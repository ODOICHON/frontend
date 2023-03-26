import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <Outlet />
    </Suspense>
  );
}
