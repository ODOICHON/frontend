import styles from './styles.module.scss';

export default function FreeBoardPage() {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.title}>
        <h1>자유게시판</h1>
        <p>{`오도이촌,아직은 잘 모르시겠다고요?
오도이촌에 관심있는 사람들과 함께 자유롭게 이야기해보세요.`}</p>
      </div>
    </div>
  );
}
