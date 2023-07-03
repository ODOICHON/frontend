import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Dompurify from 'dompurify';
import { motion } from 'framer-motion';
import Comments from '@/components/Board/Comments';
import Like from '@/components/Board/Like';
import { QueryKeys, restFetcher } from '@/queryClient';
import { IntroBoardDetailType } from '@/types/Board/introType';
import NotFoundPage from '@/pages/NotFound';
import { DeleteBoardAPI } from '@/apis/boards';
import userStore from '@/store/userStore';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function IntroBoardPage() {
  const { user } = userStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: boardData, isError } = useQuery<
    ApiResponseWithDataType<IntroBoardDetailType>
  >([QueryKeys.INTRO_BOARD, id], () =>
    restFetcher({ method: 'GET', path: `/boards/${id}` }),
  );
  const deletePost = async () => {
    const response = await DeleteBoardAPI(`${boardData?.data.boardId}`);
    if (response) {
      alert('게시글이 삭제되었습니다.');
      queryClient.refetchQueries([QueryKeys.INTRO_BOARD]);
      navigate('/introduce');
    }
  };
  const onUpdateClick = () => {
    navigate('/intro_write', {
      state: boardData?.data,
    });
  };

  if (isError) return <NotFoundPage />;

  return (
    <motion.div
      variants={opacityVariants}
      initial="initial"
      animate="mount"
      className={styles.container}
    >
      <div
        className={styles.banner}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
        url('${boardData?.data.imageUrls[0]}')`,
        }}
      >
        <div className={styles.innerBanner}>
          <div>
            <p>
              {dayjs(boardData?.data.createdAt).format('YYYY.MM.DD')} |{' '}
              {boardData?.data.nickName}
            </p>
            {user?.authority === 'ADMIN' && (
              <div>
                <button type="button" onClick={onUpdateClick}>
                  수정
                </button>{' '}
                |{' '}
                <button type="button" onClick={deletePost}>
                  삭제
                </button>
              </div>
            )}
          </div>
          <h1>{boardData?.data.title}</h1>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(boardData?.data.code || ''),
          }}
        />
      </div>
      {boardData?.data.category === 'REVIEW' && (
        <div className={styles.commentWrapper}>
          <Like
            boardId={boardData.data.boardId}
            loveCount={boardData.data.loveCount}
            intro
          />
          <Comments
            boardId={boardData.data.boardId}
            comments={boardData.data.comments}
            count={boardData.data.commentCount}
            intro
          />
        </div>
      )}
    </motion.div>
  );
}
