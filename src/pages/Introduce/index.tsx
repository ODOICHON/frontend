import Preparation from '@/components/Preparation';
import { opacityVariants } from '@/constants/variants';
import { motion } from 'framer-motion';

export default function IntroducePage() {
  return (
    <motion.div variants={opacityVariants} initial="initial" animate="mount">
      <Preparation />
    </motion.div>
  );
}
