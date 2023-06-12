import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Dompurify from 'dompurify';
import Comments from '@/components/Board/Comments';
import Like from '@/components/Board/Like';
import { QueryKeys, restFetcher } from '@/queryClient';
import NotFoundPage from '@/pages/NotFound';
import { DeleteBoardAPI } from '@/apis/boards';
import userStore from '@/store/userStore';
import { getCategoryName, getPrefixCategoryName } from '@/utils/utils';
import { BoardDetailResponse } from '@/types/boardDetailType';
import styles from './styles.module.scss';

export default function CommunityBoardDetailPage() {
  const { user } = userStore();
  const { category, id } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data: boardData, isError } = useQuery<BoardDetailResponse>(
    [QueryKeys.COMMUNITY_BOARD, id],
    () => restFetcher({ method: 'GET', path: `/boards/${id}` }),
  );

  const deletePost = async () => {
    const response = await DeleteBoardAPI(`${boardData?.data.boardId}`);
    if (response) {
      alert('게시글이 삭제되었습니다.');
      queryClient.refetchQueries([QueryKeys.BOARD]);
      navigate(`/community/${category}`);
    }
  };
  const onUpdateClick = () => {
    navigate(`/community/write/${category}`, {
      state: boardData?.data,
    });
  };

  if (
    boardData &&
    category !== getPrefixCategoryName(boardData.data.prefixCategory)
  ) {
    const prefixCategory = getPrefixCategoryName(
      boardData?.data.prefixCategory,
    );
    return <Navigate to={`/community/${prefixCategory}/${id}`} />;
  }

  if (isError) return <NotFoundPage />;

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <div className={styles.innerTitle}>
          <h1>
            [{getCategoryName(boardData?.data.category || '')}]{' '}
            {boardData?.data.title}
          </h1>
          <div>
            <p>
              작성자<span> | {boardData?.data.nickName}</span>
            </p>
            <p>
              작성일
              <span>
                {' '}
                | {dayjs(boardData?.data.createdAt).format('YYYY.MM.DD')}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.line} />

      <div className={styles.contentWrapper}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(boardData?.data.code || ''),
          }}
        />
      </div>

      {boardData && (
        <div className={styles.commentWrapper}>
          <Like
            boardId={boardData.data.boardId}
            loveCount={boardData.data.loveCount}
          />

          <div className={styles.line} />
          {user?.nick_name === boardData.data.nickName && (
            <div className={styles.buttonBox}>
              <button type="button" onClick={onUpdateClick}>
                수정
              </button>
              <button type="button" onClick={deletePost}>
                삭제
              </button>
            </div>
          )}
          <Comments
            boardId={boardData.data.boardId}
            comments={boardData.data.comments}
            count={boardData.data.commentCount}
          />
          <div className={styles.link}>
            <Link to={`/community/${category}`}>목록</Link>
          </div>
        </div>
      )}
    </section>
  );
}
