import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from './styles.module.scss';

type MyHomePopularCardProps = {
  houseId: string;
  imgUrl: string;
  title: string;
  nickName: string;
  createdAt: string;
};

function MyHomePopularCard({
  houseId,
  imgUrl,
  title,
  nickName,
  createdAt,
}: MyHomePopularCardProps) {
  const navigate = useNavigate();

  return (
    <article
      role="presentation"
      className={styles.wrapper}
      onClick={() => navigate(`/community/free_board/${houseId}`)}
    >
      <img className={styles.imgWrapper} src={imgUrl} alt="thumbnail" />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.sub}>
        {nickName} | {dayjs(createdAt).format('YYYY.MM.DD')}
      </p>
    </article>
  );
}

export default MyHomePopularCard;
