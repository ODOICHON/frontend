import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TradeBoard from '@/components/Trade/Board';
import CategorySelect from '@/components/Trade/CategorySelect';
import FilterOption from '@/components/Trade/FilterOption';
import SearchBar from '@/components/Trade/SearchBar';
import userStore from '@/store/userStore';
import { TRADE_DUMMY } from '@/constants/trade_dummy';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function TradePage() {
  const navigate = useNavigate();
  const { token } = userStore();

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
        <FilterOption
          focusedFilter={focusedFilter}
          setFocusedFilter={setFocusedFilter}
        />
        <div className={styles.line} />
        <ul className={styles.boardWrapper}>
          {TRADE_DUMMY.map((content) => (
            <TradeBoard
              key={content.houseId}
              rentalType={content.rentalType}
              city={content.city}
              price={content.price}
              monthlyPrice={content.monthlyPrice}
              isCompleted={content.isCompleted}
              nickName={content.nickName}
              createdAt={content.createdAt}
              imageUrl={content.imageUrl}
              title={content.title}
              recommendedTagName={content.recommendedTagName}
            />
          ))}
        </ul>
        <button
          className={styles.writeButton}
          type="button"
          onClick={() => {
            token ? navigate(`/trade/write`) : navigate('/login');
          }}
        >
          글쓰기
        </button>
        <button type="button" className={styles.moreButton}>
          더 많은 매물 보기
        </button>
      </section>
    </motion.div>
  );
}
