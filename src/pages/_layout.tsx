import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import ToggleMenu from '@/components/ToggleMenu';
import useWindowSize from '@/hooks/useWindowSize';
import { menuToggleStore } from '@/store/menuToggleStore';
import { AnimatePresence } from 'framer-motion';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

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
