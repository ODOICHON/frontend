import { useEffect, useRef, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import arrowImage from '@/assets/common/dropdown.svg';
import homeImage from '@/assets/common/home.svg';
import logOutImage from '@/assets/common/log-out.svg';
import { QueryKeys, restFetcher } from '@/queryClient';
import { LogoutAPI } from '@/apis/logout';
import { menuToggleStore } from '@/store/menuToggleStore';
import userStore from '@/store/userStore';
import useWindowSize from '@/hooks/useWindowSize';
import { GetUserData } from '@/types/userType';
import { dropdownVariants } from '@/constants/variants';
import styles from './styles.module.scss';

type DesktopMenuProps = {
  userInfo: GetUserData | undefined;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  onMenuClick: () => void;
  handleLogout: () => Promise<void>;
  navigate: NavigateFunction;
};

function DesktopMenu({
  userInfo,
  isClicked,
  setIsClicked,
  onMenuClick,
  handleLogout,
  navigate,
}: DesktopMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleCloseModal = (e: Event | React.MouseEvent) => {
      if (
        isClicked &&
        (!dropdownRef.current ||
          !dropdownRef.current!.contains(e.target as Node))
      )
        setIsClicked(false);
    };
    window.addEventListener('mousedown', handleCloseModal);
    return () => {
      window.removeEventListener('mousedown', handleCloseModal);
    };
  }, [dropdownRef, isClicked]);
  return (
    <div ref={dropdownRef} className={styles.wrapper}>
      <span
        role="presentation"
        className={styles.dropdownWrapper}
        onClick={onMenuClick}
      >
        <h1>{userInfo?.data.nick_name}님</h1>
        <img
          src={arrowImage}
          alt="arrowImage"
          className={isClicked ? styles.clicked : styles.notClicked}
        />
      </span>
      <AnimatePresence>
        {isClicked && (
          <motion.ul
            variants={dropdownVariants}
            initial="initial"
            animate="visiable"
            exit="exit"
            id="dropdown"
            className={styles.dropdown}
          >
            <li
              role="presentation"
              className={styles.dropdownMenu}
              onClick={() => navigate('/mypage')}
            >
              <img className={styles.image} src={homeImage} alt="home" />
              <p>마이페이지</p>
            </li>
            <li
              role="presentation"
              className={styles.dropdownMenu}
              onClick={handleLogout}
            >
              <img className={styles.image} src={logOutImage} alt="logout" />
              <p>로그아웃</p>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

type MobileMenuProps = {
  handleLogout: () => Promise<void>;
};

function MobileMenu({ handleLogout }: MobileMenuProps) {
  return (
    <div className={styles.mobileWrapper}>
      <Link to="/mypage">마이페이지</Link>
      <p role="presentation" onClick={handleLogout}>
        로그아웃
      </p>
    </div>
  );
}

export default function AfterLogin() {
  const queryClient = useQueryClient();
  const { logout, setUser } = userStore();
  const { data: userInfo } = useQuery<GetUserData>(
    [QueryKeys.USER],
    () => restFetcher({ method: 'GET', path: '/users' }),
    {
      onSuccess: (response) => {
        setUser(response.data);
      },
    },
  );

  const { setToggle } = menuToggleStore();
  const [windowSize, windowEventListener] = useWindowSize();

  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const onMenuClick = () => {
    setIsClicked((prev) => !prev);
  };
  const handleLogout = async () => {
    const response = await LogoutAPI();
    if (response?.code === 'SUCCESS') {
      queryClient.clear();
      setToggle(false);
      logout();
    }
    setIsClicked(false);
    navigate('/');
  };
  useEffect(() => {
    windowEventListener();
  }, []);

  return windowSize.width <= 500 ? (
    <MobileMenu handleLogout={handleLogout} />
  ) : (
    <DesktopMenu
      userInfo={userInfo}
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      onMenuClick={onMenuClick}
      handleLogout={handleLogout}
      navigate={navigate}
    />
  );
}
