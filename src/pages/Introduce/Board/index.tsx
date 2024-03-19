import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Dompurify from 'dompurify';
import { motion } from 'framer-motion';
import Comments from '@/components/Board/Comments';
import Like from '@/components/Board/Like';
import ModalPortal from '@/components/Common/ModalPortal';
import ToastMessageModal from '@/components/Common/ToastMessageModal';
import { QueryKeys, restFetcher } from '@/queryClient';
import { IntroBoardDetailType } from '@/types/Board/introType';
import NotFoundPage from '@/pages/NotFound';
import { DeleteBoardAPI } from '@/apis/boards';
import userStore from '@/store/userStore';
import useModalState from '@/hooks/useModalState';
import useToastMessageType from '@/hooks/useToastMessageType';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function IntroBoardPage() {
  const { user } = userStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { modalState, handleModalOpen, handleModalClose } = useModalState();
  const { toastMessageProps, handleToastMessageProps } = useToastMessageType();

  const { data: boardData, isError } = useQuery<
    ApiResponseWithDataType<IntroBoardDetailType>
  >([QueryKeys.INTRO_BOARD, id], () =>
    restFetcher({ method: 'GET', path: `/boards/${id}` }),
  );

  const deletePost = async () => {
    const response = await DeleteBoardAPI(`${boardData?.data.boardId}`);
    if (response) {
      queryClient.refetchQueries([QueryKeys.INTRO_BOARD]);
      navigate('/introduce');
    }
  };

  const onClickDelete = async () => {
    handleToastMessageProps(
      'POST_DELETE_QUESTION',
      handleModalClose,
      deletePost,
    );
    handleModalOpen();
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
                <button type="button" onClick={onClickDelete}>
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
      {boardData && (
        <div className={styles.commentWrapper}>
          <Like
            boardId={boardData.data.boardId}
            loveCount={boardData.data.loveCount}
            intro
          />
          {boardData.data.category === 'REVIEW' && (
            <Comments
              boardId={boardData.data.boardId}
              comments={boardData.data.comments}
              count={boardData.data.commentCount}
              intro
            />
          )}
        </div>
      )}
      {modalState && toastMessageProps && (
        <ModalPortal>
          <ToastMessageModal {...toastMessageProps} />
        </ModalPortal>
      )}
    </motion.div>
  );
}
