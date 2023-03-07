import styles from './styles.module.scss';
import footer from '@/assets/common/footer.png';

export default function Footer() {
  return (
    <div className={styles.container}>
      <div
        className={styles.upper}
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url(${footer}), #FFFFFF`,
        }}
      >
        <p>
          모든 가족들이 주말 만큼은 세상에 단 하나뿐인 집에서 함께할 수 있는
          그날까지
        </p>
        <h1>
          <b>주말의집</b>과 함께해요.
        </h1>
      </div>
      <div className={styles.lower}>
        <p>주말의 집 by 오이리 © 2022 ALL RIGHTS RESERVED. </p>
      </div>
    </div>
  );
}
