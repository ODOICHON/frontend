import styles from './styles.module.scss';

type PrivacyTermProps = {
  onToggleClick: () => void;
};

export default function PrivacyTerm({ onToggleClick }: PrivacyTermProps) {
  return (
    <div className={styles.termsContainer}>
      <h1>개인정보 수집 및 이용 동의(선택)</h1>
      <div>
        <article style={{ marginTop: '2rem' }}>
          <h1 className={styles.title}>1. 개인정보의 수집·이용 목적</h1>
          <p>마케팅에의 활용.</p>
        </article>
        <article style={{ marginTop: '2rem' }}>
          <h1 className={styles.title}>2. 개인정보 보유 및 이용기간</h1>
          <p>회원 탈퇴 시까지</p>
        </article>
        <article style={{ marginTop: '2rem' }}>
          <h1 className={styles.title}>3. 처리하는 개인정보 항목</h1>
          <p>□ 이름, 이메일 주소, 전화번호, 주거래 매물, 연령대</p>
        </article>
        <p style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          이는 주말내집이 제공하는 서비스를 보다 원활하게 이용하도록 하기 위해서
          그 수집 및 이용이 필요한 개인정보이므로 해당 항목에 동의를 거부하시는
          경우에도 위 개인정보를 수집 및 이용하는 서비스를 제외하고 나머지
          서비스에 대해서는 이용이 가능합니다.
        </p>
      </div>
      <button type="button" onClick={onToggleClick}>
        확인
      </button>
    </div>
  );
}
