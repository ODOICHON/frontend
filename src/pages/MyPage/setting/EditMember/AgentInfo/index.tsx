import UserInfo from '@/components/MyPage/MySetting/UserInfo';
import styles from '../styles.module.scss';

type AgentInfoProps = {
  user: User;
};

export default function AgentInfo({ user }: AgentInfoProps) {
  return (
    <div className={styles.container}>
      <section>
        <h1 className={styles.title}>회원정보</h1>
        <ul className={styles.infoWrapper}>
          <UserInfo title="공인중개사 등록번호" value={user.agentCode || '-'} />
          <UserInfo title="공인중개사 상호명" value={user.companyName || '-'} />
          <UserInfo
            title="공인중개사 사무소 주소"
            value={user.companyAddress || '-'}
          />
          <UserInfo
            title="공인중개사 사무소 대표 전화번호"
            value={user.companyPhoneNum || '-'}
          />
          <UserInfo title="대표자 이름" value={user.agentName || '-'} />
          <UserInfo title="중개 보조원명" value={user.assistantName || '-'} />
        </ul>
      </section>
    </div>
  );
}
