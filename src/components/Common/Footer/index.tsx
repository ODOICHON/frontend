import styles from './styles.module.scss';

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.lower}>
        <p>주말내집 by 오이리 © 2022 ALL RIGHTS RESERVED. </p>
        <p>문의사항 : 5do2chonri@gmail.com </p>
        <span className={styles.buttonWrapper}>
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              window.open(
                'https://third-platypus-163.notion.site/4e45911e3e2141afa3ca3be8173d90c7?pvs=4',
              );
            }}
          >
            서비스 이용약관
          </button>
          <div className={styles.divider} />
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              window.open(
                'https://third-platypus-163.notion.site/7f9b1c68a6174b64b859575163981a24?pvs=4',
              );
            }}
          >
            공인중개사 개인정보 처리방침
          </button>
          <div className={styles.divider} />
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              window.open(
                'https://third-platypus-163.notion.site/29002251361d409888c17161ec11fdf1?pvs=4',
              );
            }}
          >
            빈집거래 서비스 관련
          </button>
        </span>
      </div>
    </div>
  );
}
