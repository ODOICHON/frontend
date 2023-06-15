import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { opacityVariants } from '@/constants/variants';

export default function TradeLayoutPage() {
  return (
    <motion.div variants={opacityVariants} initial="initial" animate="mount">
      <Outlet />
    </motion.div>
  );
}
