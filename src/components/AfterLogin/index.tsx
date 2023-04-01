import styles from './styles.module.scss';
import arrowImage from '@/assets/common/dropdown.svg';
import homeImage from '@/assets/common/home.svg';
import logOutImage from '@/assets/common/log-out.svg';
import { useEffect, useState } from 'react';
import userStore from '@/store/userStore';
import { LogoutAPI } from '@/apis/logout';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import { GetUserData } from '@/types/userType';
import { menuToggleStore } from '@/store/menuToggleStore';
import useWindowSize from '@/hooks/useWindowSize';

export default function AfterLogin() {
  const queryClient = useQueryClient();
  const { data } = useQuery<GetUserData>([QueryKeys.USER], () =>
    restFetcher({ method: 'GET', path: '/users' }),
  );

  const { logout } = userStore();
  const { toggle, setToggle } = menuToggleStore();
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
    return (
      <div className={styles.wrapper}>
        <span className={styles.dropdownWrapper} onClick={onMenuClick}>
          <h1>{data?.data.nick_name}님</h1>
          <img
            src={arrowImage}
            className={isClicked ? styles.clicked : styles.notClicked}
          />
        </span>
        {isClicked && (
          <ul className={styles.dropdown}>
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
          </ul>
        )}
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
