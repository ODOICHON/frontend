import { BoardContent } from '@/types/boardType';
import styles from './styles.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { updownVariants } from '@/constants/variants';

export default function TrendBoard(props: BoardContent) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <motion.div
      className={styles.wrapper}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      style={{
        backgroundImage: isMouseOver
          ? `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
      url('${props.imageUrl}')`
          : `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      url('${props.imageUrl}')`,
      }}
    >
      <h1>{props.title}</h1>
      <AnimatePresence>
        {isMouseOver && (
          <motion.div
            variants={updownVariants}
            initial="initial"
            animate="visiable"
            exit="exit"
          >
            {props.oneLineContent}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
