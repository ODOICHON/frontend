import Preparation from '@/components/Preparation';
import { opacityVariants } from '@/constants/variants';
import userStore from '@/store/userStore';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';

export default function MyPage() {
  const { token } = userStore();

  if (!token) return <Navigate to="/login" />;
  return (
    <motion.div variants={opacityVariants} initial="initial" animate="mount">
      <Preparation />
    </motion.div>
  );
}
