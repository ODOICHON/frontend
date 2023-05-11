import dayjs from 'dayjs';
import styles from './styles.module.scss';

type CommunityBoardProps = {
  category: string;
  title: string;
  oneLineContent: string;
  imageUrl?: string;
  commentCount: number;
  nickName: string;
  createdAt: Date;
};

export default function CommunityBoard({
  category,
  title,
  oneLineContent,
  imageUrl,
  commentCount,
  nickName,
  createdAt,
}: CommunityBoardProps) {
  return (
    <>
      <li className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          <span className={styles.title}>
            <h3>[{category}]</h3>
            <h3>{title}</h3>
          </span>
          <p className={styles.oneLineContent}>{oneLineContent}</p>
          <span className={styles.description}>
            <p>댓글 {commentCount}</p>
            <p>{nickName}</p>
            <p>{dayjs(createdAt).format('YYYY.MM.DD')}</p>
          </span>
        </div>
        {imageUrl && (
          <img
            className={styles.thumbnailImage}
            src={imageUrl}
            alt="thumbnail"
          />
        )}
      </li>
      <div className={styles.divider} />
    </>
  );
}
