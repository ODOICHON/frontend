import styles from './styles.module.scss';
import logo from '@/assets/common/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import BeforeLogin from '../BeforeLogin';
import AfterLogin from '../AfterLogin';
import userStore from '@/store/userStore';
import { useEffect, useRef } from 'react';

export default function Navbar() {
  const { tokens } = userStore();
  const location = useLocation();
  const underlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLAnchorElement>(null);
  const tradeRef = useRef<HTMLAnchorElement>(null);
  const communityRef = useRef<HTMLAnchorElement>(null);

  const handleUnderline = (ref: React.RefObject<HTMLAnchorElement>) => {
    underlineRef.current!.style.left = ref.current!.offsetLeft + 'px';
    underlineRef.current!.style.width = ref.current!.offsetWidth + 'px';
    underlineRef.current!.style.top =
      ref.current!.offsetTop + ref.current!.offsetHeight + 'px';
  };

  const isFocus = (menu: string) => {
    if (location.pathname.split('/')[1] === menu) {
      return styles.focusMenu;
    } else {
      return '';
    }
  };

  useEffect(() => {
    const menu = location.pathname.split('/')[1];
    switch (menu) {
      case 'introduce':
        handleUnderline(introRef);
        break;
      case 'trade':
        handleUnderline(tradeRef);
        break;
      case 'community':
        handleUnderline(communityRef);
        break;
      default:
        underlineRef.current!.style.width = '0px';
        underlineRef.current!.style.left = '0px';
    }
  }, [location.pathname]);
  return (
    <nav className={styles.container}>
      <div className={styles.innerContainer}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
        <div className={styles.buttonContainer}>
          <div ref={underlineRef} className={styles.underline} />
          <Link className={isFocus('introduce')} ref={introRef} to="/introduce">
            오도이촌 소개
          </Link>
          <Link className={isFocus('trade')} ref={tradeRef} to="/trade">
            빈집거래
          </Link>
          <Link
            className={isFocus('community')}
            ref={communityRef}
            to="/community"
          >
            커뮤니티
          </Link>
          {tokens ? <AfterLogin /> : <BeforeLogin />}
        </div>
      </div>
    </nav>
  );
}
