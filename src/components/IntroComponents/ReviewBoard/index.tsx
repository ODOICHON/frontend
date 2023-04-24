import { BoardContent } from '@/types/boardType';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

export default function ReviewBoard(props: BoardContent) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.wrapper}
      onClick={() => navigate(`/intro_board/${props.boardId}`)}
    >
      <img src={props.imageUrl} />
      <h3>{props.title}</h3>
      <p>{props.oneLineContent}...</p>
    </div>
  );
}
