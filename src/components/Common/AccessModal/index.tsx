import { Link } from 'react-router-dom';
import logo from '@/assets/common/logo.svg';
import styles from './styles.module.scss';

function AccessModal() {
  return (
    <div className={styles.wrapper}>
      <img src={logo} alt="logo" />
      <div style={{ lineHeight: '1.8rem' }}>
        <p>로그인이 필요한 기능입니다.</p>
        <p>회원가입을 하시면 매물 상세 정보 확인이 가능합니다.</p>
      </div>
      <Link to="/signup">회원가입 하러가기</Link>
      <p>회원가입을 하시면 주말내집의 다양한 서비스를 이용하실 수 있습니다.</p>
    </div>
  );
}

export default AccessModal;
