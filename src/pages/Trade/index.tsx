import { motion } from 'framer-motion';
import SearchBar from '@/components/Trade/SearchBar';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function TradePage() {
  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
      <section className={styles.titleContainer}>
        <div className={styles.title}>
          <h1>빈집중개</h1>
          <pre>
            {`자신의 빈집을 등록하거나 다양한 지역의
빈집을 구경할 수 있는 공간입니다.`}
          </pre>
        </div>
      </section>
      <section className={styles.contentWrapper}>
        <SearchBar />
      </section>
    </motion.div>
  );
}
