import styles from './styles.module.scss';
import arrowImage from '@/assets/common/dropdown.svg';
import homeImage from '@/assets/common/home.svg';
import logOutImage from '@/assets/common/log-out.svg';
import { useState } from 'react';
import userStore from '@/store/userStore';
import { LogoutAPI } from '@/apis/logout';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';

type GetUserData = {
  code: string;
  message: string;
  data: User;
};

export default function AfterLogin() {
  const { user, setTokens, setUser } = userStore();
  const {} = useQuery<GetUserData>(
    [QueryKeys.USER],
    () => restFetcher({ method: 'GET', path: '/api/v1/users' }),
    {
      onSuccess: (res) => {
        setUser(res.data);
      },
    },
  );
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const onMenuClick = () => {
    setIsClicked((prev) => !prev);
  };
  const handleLogout = async () => {
    const response = await LogoutAPI();
    if (response.code === 'SUCCESS') {
      setTokens(null);
      setUser(null);
    }
    setIsClicked(false);
    navigate('/');
  };
  return (
    <div className={styles.wrapper}>
      <span className={styles.dropdownWrapper} onClick={onMenuClick}>
        <h1>{user?.nick_name}님</h1>
        <img
          src={arrowImage}
          className={isClicked ? styles.clicked : styles.notClicked}
        />
      </span>
      {isClicked && (
        <ul className={styles.dropdown}>
          <li className={styles.dropdownMenu}>
            <img className={styles.image} src={homeImage} />
            <p onClick={() => navigate('/mypage')}>마이페이지</p>
          </li>
          <li className={styles.dropdownMenu}>
            <img className={styles.image} src={logOutImage} />
            <p onClick={handleLogout}>로그아웃</p>
          </li>
        </ul>
      )}
    </div>
  );
}
