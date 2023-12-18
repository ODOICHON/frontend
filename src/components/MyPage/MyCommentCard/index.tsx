import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

type MyCommentCardProps = {
  boardId: number;
  title: string;
  commentContent: string;
};

function MyCommentCard({ boardId, title, commentContent }: MyCommentCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/community/free_board/${boardId}`);
  };

  return (
    <>
      <div role="presentation" className={styles.wrapper} onClick={handleClick}>
        <h1 className={styles.title}>게시글 제목: {title}</h1>
        <p className={styles.comment}>{commentContent}</p>
      </div>
      <div className={styles.divider} />
    </>
  );
}

export default MyCommentCard;
