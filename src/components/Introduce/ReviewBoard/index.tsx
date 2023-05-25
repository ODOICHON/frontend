import { useNavigate } from 'react-router-dom';
import { BoardContent } from '@/types/boardType';
import styles from './styles.module.scss';

export default function ReviewBoard(props: BoardContent) {
  const navigate = useNavigate();
  return (
    <div
      role="presentation"
      className={styles.wrapper}
      onClick={() => navigate(`/intro_board/${props.boardId}`)}
    >
      <img src={props.imageUrl} alt="backgroundImg" />
      <h3>{props.title}</h3>
      <p>{props.oneLineContent}...</p>
    </div>
  );
}
