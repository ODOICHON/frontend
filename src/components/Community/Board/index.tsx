import dayjs from 'dayjs';
import { getCategoryName } from '@/utils/utils';
import styles from './styles.module.scss';

type CommunityBoardProps = {
  category: string;
  title: string;
  oneLineContent: string;
  imageUrl?: string;
  commentCount: number;
  nickName: string;
  createdAt: Date;
  fixed: boolean;
};

export default function CommunityBoard({
  category,
  title,
  oneLineContent,
  imageUrl,
  commentCount,
  nickName,
  createdAt,
  fixed,
}: CommunityBoardProps) {
  return (
    <>
      <li className={styles.wrapper}>
        <span className={styles.title}>
          {fixed && <span className={styles.advertisement}>광고</span>}
          <h3 className={styles.category}>[{getCategoryName(category)}]</h3>
          <h3 className={styles.titleMessage}>{title}</h3>
        </span>
        <div className={styles.contentWrapper}>
          <div className={styles.textContentWrapper}>
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
        </div>
      </li>
      <div className={styles.divider} />
    </>
  );
}
