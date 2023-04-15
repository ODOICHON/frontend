import { BoardContent } from '@/types/boardType';
import styles from './styles.module.scss';

export default function ReviewBoard(props: BoardContent) {
  return (
    <div className={styles.wrapper}>
      <img src={props.imageUrl} />
      <h3>{props.title}</h3>
      <p>{props.oneLineContent}</p>
    </div>
  );
}
