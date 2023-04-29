import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import ToggleMenu from '@/components/ToggleMenu';
import { menuToggleStore } from '@/store/menuToggleStore';
import useWindowSize from '@/hooks/useWindowSize';

export default function Layout() {
  const { toggle } = menuToggleStore();
  const [windowSize, windowEventListener] = useWindowSize();
  useEffect(() => {
    windowEventListener();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <AnimatePresence>
        {windowSize.width <= 500 && toggle && <ToggleMenu />}
      </AnimatePresence>
      <Navbar />
      <Outlet />
      <Footer />
    </Suspense>
  );
}
