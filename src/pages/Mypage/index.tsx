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
      variants={opacityVariants}
      initial="initial"
      animate="mount"
      className={styles.container}
    >
      <MyPageNavbar />
      <div className={styles.contentContainer}>
        <div className={styles.boundaryLine} />
        <Outlet />
      </div>
    </motion.div>
  );
}
