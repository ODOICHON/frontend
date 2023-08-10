import { useState } from 'react';
import { motion } from 'framer-motion';
import CategorySelect from '@/components/Trade/CategorySelect';
import SearchBar from '@/components/Trade/SearchBar';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function TradePage() {
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [focusedFilter, setFocusedFilter] = useState('ALL');

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
        <SearchBar
          type={type}
          location={location}
          search={search}
          setType={setType}
          setLocation={setLocation}
          setSearch={setSearch}
        />
        <CategorySelect
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <ul className={styles.optionWrapper}>
          <li
            role="presentation"
            className={
              focusedFilter === 'ALL' ? styles.focused : styles.notFocused
            }
            onClick={() => setFocusedFilter('ALL')}
          >
            전체
          </li>
          <div className={styles.divider} />
          <li
            role="presentation"
            className={
              focusedFilter === 'TRADING' ? styles.focused : styles.notFocused
            }
            onClick={() => setFocusedFilter('TRADING')}
          >
            거래중인 매물
          </li>
        </ul>
        <div className={styles.line} />
      </section>
    </motion.div>
  );
}
