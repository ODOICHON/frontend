import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import hamberger from '@/assets/common/hamberger.svg';
import logo from '@/assets/common/logo.svg';
import { menuToggleStore } from '@/store/menuToggleStore';
import userStore from '@/store/userStore';
import useWindowSize from '@/hooks/useWindowSize';
import styles from './styles.module.scss';
import AfterLogin from '../../Login/AfterLogin';
import BeforeLogin from '../../Login/BeforeLogin';

type DesktopNavbarProps = {
  token: Token | null;
  underlineRef: React.RefObject<HTMLDivElement>;
  introRef: React.RefObject<HTMLAnchorElement>;
  tradeRef: React.RefObject<HTMLAnchorElement>;
  communityRef: React.RefObject<HTMLAnchorElement>;
  isFocus: (menu: string) => string;
};

function DesktopNavbar({
  token,
  underlineRef,
  introRef,
  tradeRef,
  communityRef,
  isFocus,
}: DesktopNavbarProps) {
  return (
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
          to="/community/free_board"
        >
          커뮤니티
        </Link>
        {token ? <AfterLogin /> : <BeforeLogin />}
      </div>
    </div>
  );
}

function MobileNavbar() {
  const { setToggle } = menuToggleStore();
  return (
    <div className={styles.innerContainer}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
      <img
        role="presentation"
        className={styles.hamberger}
        onClick={() => setToggle(true)}
        src={hamberger}
        alt="menu_toggle"
      />
    </div>
  );
}

export default function Navbar() {
  const { token } = userStore();
  const { setToggle } = menuToggleStore();
  const location = useLocation();
  const underlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLAnchorElement>(null);
  const tradeRef = useRef<HTMLAnchorElement>(null);
  const communityRef = useRef<HTMLAnchorElement>(null);

  const [windowSize, windowEventListener] = useWindowSize();

  const handleUnderline = (ref: React.RefObject<HTMLAnchorElement>) => {
    underlineRef.current!.style.left = `${ref.current!.offsetLeft}px`;
    underlineRef.current!.style.width = `${ref.current!.offsetWidth}px`;
    underlineRef.current!.style.top = `${
      ref.current!.offsetTop + ref.current!.offsetHeight
    }px`;
  };

  const isFocus = (menu: string) => {
    if (location.pathname.split('/')[1] === menu) {
      return styles.focusMenu;
    }
    return '';
  };

  useEffect(() => {
    if (windowSize.width <= 500) setToggle(false);
    if (!underlineRef.current) return;
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

  useEffect(() => {
    windowEventListener();
  }, []);

  return (
    <nav className={styles.container}>
      {windowSize.width <= 500 ? (
        <MobileNavbar />
      ) : (
        <DesktopNavbar
          token={token}
          underlineRef={underlineRef}
          introRef={introRef}
          tradeRef={tradeRef}
          communityRef={communityRef}
          isFocus={isFocus}
        />
      )}
    </nav>
  );
}
