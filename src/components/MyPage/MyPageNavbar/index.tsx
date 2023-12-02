import { Link, Navigate, useLocation } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { FiMap, FiMessageSquare, FiSettings } from 'react-icons/fi';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { myPageMenuVariants } from '@/constants/variants';
import styles from './styles.module.scss';

type NavListType = {
  title: string;
  path: string;
  icon: JSX.Element;
  arrowUp: JSX.Element | null;
  arrowDown: JSX.Element | null;
  subList: {
    title: string;
    path: string;
  }[];
};

const navList: NavListType[] = [
  {
    title: '마이 페이지',
    path: '/mypage/home',
    icon: <AiOutlineHome />,
    arrowUp: null,
    arrowDown: null,
    subList: [],
  },
  {
    title: '빈집중개',
    path: '/mypage/trade/myself',
    icon: <FiMap />,
    arrowUp: <MdKeyboardArrowUp />,
    arrowDown: <MdKeyboardArrowDown />,
    subList: [
      {
        title: '내 매물 관리',
        path: '/mypage/trade/myself',
      },
      {
        title: '임시저장',
        path: '/mypage/trade/saves',
      },
      {
        title: '스크랩',
        path: '/mypage/trade/scrap',
      },
    ],
  },
  {
    title: '커뮤니티',
    path: '/mypage/community/write',
    icon: <FiMessageSquare />,
    arrowUp: <MdKeyboardArrowUp />,
    arrowDown: <MdKeyboardArrowDown />,
    subList: [
      {
        title: '내가 쓴 글',
        path: '/mypage/community/write',
      },
      {
        title: '내가 쓴 댓글',
        path: '/mypage/community/comment',
      },
      {
        title: '내가 좋아한 게시글',
        path: '/mypage/community/likes',
      },
    ],
  },
  {
    title: '회원 정보 수정',
    path: '/mypage/setting',
    icon: <FiSettings />,
    arrowUp: null,
    arrowDown: null,
    subList: [],
  },
];

function MyPageNavbar() {
  const location = useLocation();

  if (location.pathname === '/mypage') return <Navigate to="/mypage/home" />;

  return (
    <ul className={styles.ulContainer}>
      {navList.map((nav, index) => (
        <li key={index}>
          <Link
            to={nav.path}
            className={[
              location.pathname.includes(nav.path.split('/')[2])
                ? styles.selectMenu
                : undefined,
              styles.menuItem,
            ].join(' ')}
          >
            <span>{nav.icon}</span>
            <span>{nav.title}</span>
            {nav.path
              .split('/')
              .includes(location.pathname.split('/').at(-1) ?? 'nothing')
              ? nav.arrowUp
              : nav.arrowDown}
          </Link>
          <AnimatePresence>
            {nav.path
              .split('/')
              .includes(location.pathname.split('/')[2] ?? 'nothing') && (
              <motion.ul
                variants={myPageMenuVariants}
                initial="initial"
                animate="visiable"
                exit="exit"
              >
                {nav.subList.map((sub, i) => (
                  <li
                    key={i}
                    className={[
                      location.pathname === sub.path
                        ? styles.selectSubMenu
                        : undefined,
                      styles.menuSubItem,
                    ].join(' ')}
                  >
                    <Link to={sub.path} style={{ color: 'inherit' }}>
                      {sub.title}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}

export default MyPageNavbar;
