import styles from './styles.module.scss';
import logo from '@/assets/common/logo.svg';
import { Link } from 'react-router-dom';

const LOGIN_STATUS = true; // 임시 상태코드

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <div className={styles.innerContainer}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
        <div className={styles.buttonContainer}>
          <Link to="#">오도이촌 소개</Link>
          <Link to="#">빈집거래</Link>
          <Link to="#">커뮤니티</Link>
          {LOGIN_STATUS ? <BeforeLogin /> : <AfterLogin />}
        </div>
      </div>
    </nav>
  );
}

function BeforeLogin() {
  return (
    <span className={styles.loginContainer}>
      <Link className={styles.button} to="/login">
        로그인
      </Link>
      <Link className={styles.button} to="/signup">
        회원가입
      </Link>
    </span>
  );
}

function AfterLogin() {
  return (
    <span className={styles.buttonContainer}>
      <Link to="#">??</Link>
      <Link to="#">??</Link>
    </span>
  );
}
