import { QueryKeys, restFetcher } from '@/queryClient';
import { BoardDetailResponse } from '@/types/boardDetailType';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Dompurify from 'dompurify';
import styles from './styles.module.scss';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { opacityVariants } from '@/constants/variants';
import userStore from '@/store/userStore';
import { DeleteBoardAPI } from '@/apis/boards';
import Like from '@/components/BoardComponents/Like';
import Comments from '@/components/BoardComponents/Comments';

export default function IntroBoardPage() {
  const { user } = userStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery<BoardDetailResponse>(
    [QueryKeys.INTRO_BOARD, id],
    () => restFetcher({ method: 'GET', path: `/boards/${id}` }),
  );
  const deletePost = async () => {
    const response = await DeleteBoardAPI(`${data?.data.boardId}`);
    if (response) {
      alert('게시글이 삭제되었습니다.');
      queryClient.refetchQueries([QueryKeys.BOARD]);
      navigate('/introduce');
    }
  };
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
        url('${data?.data.imageUrls[0]}')`,
        }}
      >
        <div className={styles.innerBanner}>
          <div>
            <p>
              {dayjs(data?.data.createdAt).format('YYYY.MM.DD')} |{' '}
              {data?.data.nickName}
            </p>
            {user?.authority === 'ADMIN' && (
              <div>
                <button>수정</button> |{' '}
                <button onClick={deletePost}>삭제</button>
              </div>
            )}
          </div>
          <h1>{data?.data.title}</h1>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(data?.data.code!),
          }}
        />
      </div>
      {data?.data.category === 'REVIEW' && (
        <div className={styles.commentWrapper}>
          <Like
            boardId={data.data.boardId}
            loveCount={data.data.loveCount}
            intro={true}
          />
          <Comments
            boardId={data.data.boardId}
            comments={data.data.comments}
            count={data.data.commentCount}
            intro={true}
          />
        </div>
      )}
    </motion.div>
  );
}
