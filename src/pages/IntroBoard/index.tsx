import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Dompurify from 'dompurify';
import { motion } from 'framer-motion';
import { opacityVariants } from '@/constants/variants';
import { BoardDetailResponse } from '@/types/boardDetailType';
import styles from './styles.module.scss';
import { DeleteBoardAPI } from '@/apis/boards';
import Comments from '@/components/BoardComponents/Comments';
import Like from '@/components/BoardComponents/Like';
import { QueryKeys, restFetcher } from '@/queryClient';
import userStore from '@/store/userStore';

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
  const onUpdateClick = () => {
    navigate('/intro_write', {
      state: data?.data,
    });
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
                <button onClick={onUpdateClick}>수정</button> |{' '}
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
            intro
          />
          <Comments
            boardId={data.data.boardId}
            comments={data.data.comments}
            count={data.data.commentCount}
            intro
          />
        </div>
      )}
    </motion.div>
  );
}
