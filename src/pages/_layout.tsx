import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Footer from '@/components/Common/Footer';
import Loading from '@/components/Common/Loading';
import Navbar from '@/components/Common/Navbar';
import ToggleMenu from '@/components/Common/ToggleMenu';
import { menuToggleStore } from '@/store/menuToggleStore';
import useAxiosInterceptor from '@/hooks/useAxiosInterceptor';
import useWindowSize from '@/hooks/useWindowSize';

export default function Layout() {
  useAxiosInterceptor();

  const { pathname } = useLocation();
  const { toggle } = menuToggleStore();
  const [windowSize, windowEventListener] = useWindowSize();

  useEffect(() => {
    windowEventListener();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<Loading />}>
      <AnimatePresence>
        {windowSize.width <= 500 && toggle && <ToggleMenu />}
      </AnimatePresence>
      <main
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Navbar />
        <section
          style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}
        >
          <Outlet />
        </section>
        <Footer />
      </main>
    </Suspense>
  );
}
