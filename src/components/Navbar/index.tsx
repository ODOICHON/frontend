import styles from './styles.module.scss';
import logo from '@/assets/common/logo.svg';
import { Link } from 'react-router-dom';
import BeforeLogin from '../BeforeLogin';
import AfterLogin from '../AfterLogin';
import userStore from '@/store/userStore';

export default function Navbar() {
  const { tokens } = userStore();
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
          {tokens ? <AfterLogin /> : <BeforeLogin />}
        </div>
      </div>
    </nav>
  );
}
