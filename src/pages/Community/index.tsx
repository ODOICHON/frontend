import { motion } from 'framer-motion';
import Preparation from '@/components/Preparation';
import { opacityVariants } from '@/constants/variants';

export default function CommunityPage() {
  return (
    <motion.div variants={opacityVariants} initial="initial" animate="mount">
      <Preparation />
    </motion.div>
  );
}
