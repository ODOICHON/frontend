import { motion } from 'framer-motion';
import Preparation from '@/components/Common/Preparation';
import { opacityVariants } from '@/constants/variants';

export default function TradePage() {
  return (
    <motion.div variants={opacityVariants} initial="initial" animate="mount">
      <Preparation />
    </motion.div>
  );
}
