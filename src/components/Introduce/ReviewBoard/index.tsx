import { useNavigate } from 'react-router-dom';
import { IntroBoardType } from '@/types/Board/introType';
import styles from './styles.module.scss';

type ReviewBoardProps = IntroBoardType;

export default function ReviewBoard(props: ReviewBoardProps) {
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
