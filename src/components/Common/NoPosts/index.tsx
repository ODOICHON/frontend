import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import styles from './styles.module.scss';

type NoPostsProps = {
  text: string;
  subText?: string;
  padding?: boolean;
};

export default function NoPosts({
  text,
  subText,
  padding = true,
}: NoPostsProps) {
  return (
    <div
      className={styles.wrapper}
      style={padding ? { padding: '10rem 0' } : {}}
    >
      <HiOutlineDotsHorizontal className={styles.ellipsis} />
      <p>{text}</p>
      {subText && <p>{subText}</p>}
    </div>
  );
}
