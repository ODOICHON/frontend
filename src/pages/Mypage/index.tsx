import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Preparation from '@/components/Preparation';
import userStore from '@/store/userStore';
import { opacityVariants } from '@/constants/variants';

export default function MyPage() {
  const { token } = userStore();

  if (!token) return <Navigate to="/login" />;
  return (
    <motion.div variants={opacityVariants} initial="initial" animate="mount">
      <Preparation />
    </motion.div>
  );
}
