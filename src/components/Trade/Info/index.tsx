import styles from './styles.module.scss';

function TradeBoardInfo() {
  return (
    <section className={styles.infoContainer}>
      <article>
        <span>기본정보</span>
        <div>
          위치 <p>data</p>
        </div>
        <div>
          면적 <p>data</p>
        </div>
        <div>
          용도 <p>data</p>
        </div>
        <div>
          준공연도 <p>data</p>
        </div>
        <div>
          층수 <p>data</p>
        </div>
      </article>
      <article>
        <span>임대정보 및 판매자 정보</span>
        <div>
          가격 <p>data</p>
        </div>
        <div>
          전화번호 <p>data</p>
        </div>
        <div>
          공인중개사명 <p>data</p>
        </div>
      </article>
    </section>
  );
}

export default TradeBoardInfo;
