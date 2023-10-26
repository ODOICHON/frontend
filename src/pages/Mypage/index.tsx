import { Navigate, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import MyPageNavbar from '@/components/MyPage/MyPageNavbar';
import userStore from '@/store/userStore';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function MyPage() {
  const { token } = userStore();

  if (!token) return <Navigate to="/login" />;
  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
      <div className={styles.innerContainer}>
        <MyPageNavbar />
        <div className={styles.boundaryLine} />
        <div className={styles.contentContainer}>
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
}
