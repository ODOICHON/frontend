import MyTradeCard from '@/components/MyPage/MyTradeCard';
import useInput from '@/hooks/useInput';
import styles from './styles.module.scss';

type DUMMY_TYPE = {
  rentalType: 'SALE' | 'JEONSE' | 'MONTHLYRENT';
  imageUrl: string;
  title: string;
  city: string;
  dealState: 'APPLYING' | 'ONGOING' | 'COMPLETED';
};
const DUMMY: DUMMY_TYPE[] = [
  {
    rentalType: 'SALE',
    imageUrl:
      'https://d2xwcesrm8to6h.cloudfront.net/_.jpeg/102385d441c5-483c-8e87-5179bdd15be2.jpeg?f=webp&q=80',
    title: '도시인듯 아닌듯 현대적인 분위기, 안성맞춤 집',
    city: '경상남도 남해군 이동면 다정리 705-5',
    dealState: 'ONGOING',
  },
  {
    rentalType: 'JEONSE',
    imageUrl:
      'https://d2xwcesrm8to6h.cloudfront.net/_.jpeg/102385d441c5-483c-8e87-5179bdd15be2.jpeg?f=webp&q=80',
    title: '도시인듯 아닌듯 현대적인 분위기, 안성맞춤 집',
    city: '경상남도 남해군 이동면 다정리 705-5',
    dealState: 'APPLYING',
  },
  {
    rentalType: 'MONTHLYRENT',
    imageUrl:
      'https://d2xwcesrm8to6h.cloudfront.net/_.jpeg/102385d441c5-483c-8e87-5179bdd15be2.jpeg?f=webp&q=80',
    title: '도시인듯 아닌듯 현대적인 분위기, 안성맞춤 집',
    city: '경상남도 남해군 이동면 다정리 705-5',
    dealState: 'COMPLETED',
  },
];

export default function MyselfPage() {
  const [search, handleSearch, setSearch] = useInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch('');
  };
  return (
    <section className={styles.container}>
      <article className={styles.titleWrapper}>
        <h1>내 매물 관리</h1>
        <p>내가 거래하고 있는 매물들을 관리할 수 있어요.</p>
      </article>
      <article className={styles.countBoxWrapper}>
        <div>
          <p>승인 중인 매물</p>
          <strong>0</strong>
        </div>
        <div>
          <p>판매 중인 매물</p>
          <strong>0</strong>
        </div>
        <div>
          <p>판매완료된 매물</p>
          <strong>0</strong>
        </div>
      </article>
      <article>
        <form className={styles.searchWrapper} onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="검색어를 입력해주세요."
          />
          <button type="submit">검색</button>
        </form>
        <table className={styles.resultWrapper}>
          <thead>
            <tr>
              <th>매물형태</th>
              <th>사진</th>
              <th>매물명</th>
              <th>위치</th>
              <th>판매상태</th>
            </tr>
          </thead>
          <tbody className={styles.resultContent}>
            {DUMMY.map((item, index) => (
              <MyTradeCard key={index} tradeItem={item} />
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
