import styles from './styles.module.scss';

type MarketingTermProps = {
  onToggleClick: () => void;
};

export default function MarketingTerm({ onToggleClick }: MarketingTermProps) {
  return (
    <div className={styles.termsContainer}>
      <h1>마케팅 활용 및 광고성 정보 수신 동의(선택)</h1>
      <div>
        <p style={{ marginTop: '2rem', marginBottom: '3rem' }}>
          전자적 전송매체(SMS/MMS/이메일 등)를 통해, 주말내집이 제공하는
          이벤트/혜택 등 다양한 정보(뉴스레터 포함)를 수신하실 수 있고, 기타
          유용한 광고나 정보를 수신하실 수 있습니다.
        </p>
        <p style={{ marginBottom: '3rem' }}>
          본 마케팅 활용 및 광고성 정보수신 등의 항목은 선택사항이므로 동의를
          거부하는 경우에도 주말내집 서비스의 이용에는 영향이 없습니다. 다만
          거부시 동의를 통해 제공 가능한 각종 혜택, 이벤트 안내를 받아 보실 수
          없습니다.
        </p>
        <p style={{ marginBottom: '3rem' }}>
          본 수신 동의를 철회하고자 할 경우에는 고객센터(주말내집 이메일)를 통해
          언제든 수신동의를 철회를 요청하실 수 있습니다.
        </p>
      </div>
      <button type="button" onClick={onToggleClick}>
        확인
      </button>
    </div>
  );
}
