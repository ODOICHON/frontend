import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function CommunityPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFocus = (menu: string) => {
    const path = location.pathname.split('/')[2];
    if (path && path.includes(menu)) {
      return styles.focusMenu;
    }
    return styles.menu;
  };
  useEffect(() => {
    navigate('/community/free_board');
  }, []);
  return (
    <motion.div variants={opacityVariants} initial="initial" animate="mount">
      <nav className={styles.container}>
        <div className={styles.innerContainer}>
          <p>커뮤니티</p>
          <div className={styles.divider} />
          <span className={styles.menuWrapper}>
            <Link className={isFocus('free')} to="/community/free_board">
              자유게시판
            </Link>
            <Link
              className={isFocus('advertisement')}
              to="/community/advertisement_board"
            >
              홍보게시판
            </Link>
          </span>
        </div>
      </nav>
      <Outlet />
    </motion.div>
  );
}
