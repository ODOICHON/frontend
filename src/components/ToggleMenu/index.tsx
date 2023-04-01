import styles from './styles.module.scss';
import AfterLogin from '../AfterLogin';
import BeforeLogin from '../BeforeLogin';
import userStore from '@/store/userStore';
import closeImg from '@/assets/common/close.svg';
import { menuToggleStore } from '@/store/menuToggleStore';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toggleVariants } from '@/constants/variants';

export default function ToggleMenu() {
  const { tokens } = userStore();
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
        id="container"
        className={styles.buttonContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          className={styles.closeImg}
          onClick={() => setToggle(false)}
          src={closeImg}
          alt="close"
        />
        <Link to="/introduce">오도이촌 소개</Link>
        <Link to="/trade">빈집거래</Link>
        <Link to="/community">커뮤니티</Link>
        {tokens ? <AfterLogin /> : <BeforeLogin />}
      </div>
    </motion.div>
  );
}
