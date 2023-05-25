import { useLocation, useNavigate } from 'react-router-dom';
import crashLogo from '@/assets/common/crash-logo.svg';
import styles from './styles.module.scss';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isCommunityNotfound = pathname.split('/')[1] === 'community';
  return (
    <div
      className={isCommunityNotfound ? styles.communityWrapper : styles.wrapper}
    >
      <img src={crashLogo} alt="crashLogo" />
      <h1 className={styles.errorCode}>404 ERROR</h1>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
      <button
        className={styles.goToMainButton}
        type="button"
        onClick={() => navigate('/')}
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}
