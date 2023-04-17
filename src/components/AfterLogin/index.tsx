import styles from './styles.module.scss';
import arrowImage from '@/assets/common/dropdown.svg';
import homeImage from '@/assets/common/home.svg';
import logOutImage from '@/assets/common/log-out.svg';
import { useEffect, useRef, useState } from 'react';
import userStore from '@/store/userStore';
import { LogoutAPI } from '@/apis/logout';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import { GetUserData } from '@/types/userType';
import { menuToggleStore } from '@/store/menuToggleStore';
import useWindowSize from '@/hooks/useWindowSize';
import { AnimatePresence, motion } from 'framer-motion';
import { dropdownVariants } from '@/constants/variants';

export default function AfterLogin() {
  const queryClient = useQueryClient();
  const { logout, setUser } = userStore();
  const { data } = useQuery<GetUserData>(
    [QueryKeys.USER],
    () => restFetcher({ method: 'GET', path: '/users' }),
    {
      onSuccess: (data) => {
        setUser(data.data);
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
    if (response.code === 'SUCCESS') {
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

  function DesktopMenu() {
    const dropdownRef = useRef<HTMLUListElement>(null);
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
    }, [dropdownRef]);
    return (
      <div className={styles.wrapper}>
        <span className={styles.dropdownWrapper} onClick={onMenuClick}>
          <h1>{data?.data.nick_name}님</h1>
          <img
            src={arrowImage}
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
              ref={dropdownRef}
            >
              <li
                className={styles.dropdownMenu}
                onClick={() => navigate('/mypage')}
              >
                <img className={styles.image} src={homeImage} />
                <p>마이페이지</p>
              </li>
              <li className={styles.dropdownMenu} onClick={handleLogout}>
                <img className={styles.image} src={logOutImage} />
                <p>로그아웃</p>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }
  function MobileMenu() {
    return (
      <div className={styles.mobileWrapper}>
        <Link to="/mypage">마이페이지</Link>
        <p onClick={handleLogout}>로그아웃</p>
      </div>
    );
  }

  return windowSize.width <= 500 ? <MobileMenu /> : <DesktopMenu />;
}
