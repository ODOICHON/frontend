import styles from './styles.module.scss';

export default function AdvertisementBoardPage() {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.title}>
        <h1>홍보게시판</h1>
        <p>{`오도이촌 실현을 위한
다양한 업체를 소개해 드립니다.`}</p>
      </div>
    </div>
  );
}
