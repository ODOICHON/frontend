import styles from './styles.module.scss';

type AgentTermProps = {
  onToggleClick: () => void;
};

export default function AgentTerm({ onToggleClick }: AgentTermProps) {
  return (
    <div className={styles.termsContainer}>
      <h1>공인중개사 식별 개인정보 수집 이용 동의(필수)</h1>
      <div>
        <p>
          주말내집에서는 개인정보보호법 제15조, 제22조에 근거하여 주말내집
          회원정보를 수집하고 있습니다.
        </p>
        <article style={{ marginTop: '2rem' }}>
          <h1 className={styles.title}>1. 개인정보의 수집·이용 목적</h1>
          <p>
            공인중개사 회원에 대한 확인을 통해 원활한 주말내집 서비스 제공을
            위함.
          </p>
        </article>
        <article style={{ marginTop: '2rem' }}>
          <h1 className={styles.title}>2. 개인정보 보유 및 이용기간</h1>
          <p>회원 탈퇴 시까지</p>
        </article>
        <article style={{ marginTop: '2rem' }}>
          <h1 className={styles.title}>3. 처리하는 개인정보 항목</h1>
          <p>
            □ 필수항목 : 성명, 전화번호, 공인중개사 등록번호, 사업자 등록번호,
            공인중개사 사무소 상호명, 대표자 이름, 공인중개사 사무소 대표
            전화번호, 중개 보조원명, 공인중개사 사무소 주소, 이메일
          </p>
        </article>
        <article style={{ marginTop: '2rem' }}>
          <h1 className={styles.title}>
            4. 동의거부 권리 및 동의거부 시 불이익 안내
          </h1>
          <p>
            귀하는 개인정보에 수집·이용에 대한 동의를 거부할 권리가 있습니다.
            다만, 필수항목에 대한 동의 거부 시에는 회원가입이 불가능합니다.
          </p>
        </article>
      </div>
      <button type="button" onClick={onToggleClick}>
        확인
      </button>
    </div>
  );
}
