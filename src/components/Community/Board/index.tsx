import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { CommunityBoardType } from '@/types/Board/communityType';
import { getCategoryName, getPrefixCategoryName } from '@/utils/utils';
import { THUMBNAIL_SIZE_OPTION } from '@/constants/image';
import styles from './styles.module.scss';

type CommunityBoardProps = Omit<CommunityBoardType, 'code'>;

export default function CommunityBoard({
  boardId,
  title,
  category,
  prefixCategory,
  oneLineContent,
  imageUrl,
  commentCount,
  nickName,
  createdAt,
  fixed,
}: CommunityBoardProps) {
  const navigate = useNavigate();

  const handleClick = (check: string, id: string) => {
    if (check === 'INTRO') navigate(`/intro_board/${id}`);
    else navigate(`/community/${getPrefixCategoryName(prefixCategory)}/${id}`);
  };

  return (
    <>
      <li
        role="presentation"
        className={styles.wrapper}
        onClick={() => handleClick(prefixCategory, boardId)}
      >
        <span className={styles.title}>
          {fixed && <span className={styles.advertisement}>광고</span>}
          {getCategoryName(category) && (
            <h3 className={styles.category}>[{getCategoryName(category)}]</h3>
          )}
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
              src={imageUrl + THUMBNAIL_SIZE_OPTION}
              alt="thumbnail"
            />
          )}
        </div>
      </li>
      <div className={styles.divider} />
    </>
  );
}
