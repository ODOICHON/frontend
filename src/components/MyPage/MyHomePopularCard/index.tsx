import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import logoImg from '@/assets/common/logo.svg';
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
      <img
        className={styles.imgWrapper}
        src={imgUrl || logoImg}
        alt="thumbnail"
        style={
          imgUrl
            ? { objectFit: 'cover' }
            : { objectFit: 'contain', backdropFilter: 'brightness(0.95)' }
        }
      />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.sub}>
        {nickName} | {dayjs(createdAt).format('YYYY.MM.DD')}
      </p>
    </article>
  );
}

export default MyHomePopularCard;
