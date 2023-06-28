import { motion } from 'framer-motion';
import { opacityVariants } from '@/constants/variants';

export default function TradeWritePage() {
  return (
    <motion.div variants={opacityVariants} initial="initial" animate="mount">
      <div>빈집 거래 게시글 작성 페이지</div>;
    </motion.div>
  );
}
