import styles from './styles.module.scss';

function ScrapPage() {
  return (
    <section className={styles.container}>
      <article className={styles.titleWrapper}>
        <h1>내 매물 관리</h1>
        <p>내가 거래하고 있는 매물들을 관리할 수 있어요.</p>
      </article>
    </section>
  );
}

export default ScrapPage;
