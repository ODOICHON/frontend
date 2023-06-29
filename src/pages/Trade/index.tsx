import SearchBar from '@/components/Trade/SearchBar';
import styles from './styles.module.scss';

export default function TradePage() {
  return (
    <div className={styles.container}>
      <section className={styles.titleContainer}>
        <div className={styles.title}>
          <h1>빈집중개</h1>
          <p>자신의 빈집을 등록하거나 다양한 지역의</p>
          <p>빈집을 구경할 수 있는 공간입니다.</p>
        </div>
      </section>
      <section className={styles.content}>
        <SearchBar />
      </section>
    </div>
  );
}
