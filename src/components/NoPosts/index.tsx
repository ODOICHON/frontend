import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import styles from './styles.module.scss';

export default function NoPosts() {
  return (
    <div className={styles.wrapper}>
      <HiOutlineDotsHorizontal className={styles.ellipsis} />
      <p>아직은 글이 없어요</p>
      <p>글을 작성해서 자유롭게 오도이촌 이야기를 해보아요!</p>
    </div>
  );
}
