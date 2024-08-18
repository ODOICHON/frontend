import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import closeImg from '@/assets/common/close.svg';
import { menuToggleStore } from '@/store/menuToggleStore';
import userStore from '@/store/userStore';
import { toggleVariants } from '@/constants/variants';
import styles from './styles.module.scss';
import AfterLogin from '../../Login/AfterLogin';
import BeforeLogin from '../../Login/BeforeLogin';

export default function ToggleMenu() {
  const { token } = userStore();
  const { setToggle } = menuToggleStore();
  const onToggleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === 'overlay') {
      setToggle(false);
    }
  };

  return (
    <motion.div
      variants={toggleVariants}
      initial="initial"
      animate="visiable"
      exit="exit"
      id="overlay"
      className={styles.overlay}
      onClick={onToggleMenu}
    >
      <div
        role="presentation"
        id="container"
        className={styles.buttonContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          role="presentation"
          className={styles.closeImg}
          onClick={() => setToggle(false)}
          src={closeImg}
          alt="close"
        />
        <Link to="/introduce">오도이촌 소개</Link>
        <Link to="/trade">농가거래</Link>
        <Link to="/community/free_board">커뮤니티</Link>
        {token ? <AfterLogin /> : <BeforeLogin />}
      </div>
    </motion.div>
  );
}
