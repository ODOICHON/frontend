import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export default function BeforeLogin() {
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
