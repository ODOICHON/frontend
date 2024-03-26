import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ModalPortal from '@/components/Common/ModalPortal';
import ToastMessageModal from '@/components/Common/ToastMessageModal';
import { QueryKeys, restFetcher } from '@/queryClient';
import { CommentType } from '@/types/Board/boardType';
import userStore from '@/store/userStore';
import useModalState from '@/hooks/useModalState';
import useToastMessageType from '@/hooks/useToastMessageType';
import styles from './styles.module.scss';
import CommentDetail from '../CommentDetail';

type CommentsProps = {
  boardId: number;
  comments: CommentType[];
  count: number;
  intro?: boolean;
};

export default function Comments({
  boardId,
  comments,
  count,
  intro,
}: CommentsProps) {
  const { user } = userStore();
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const { modalState, handleModalOpen, handleModalClose } = useModalState();
  const { toastMessageProps, handleToastMessageProps } = useToastMessageType();
  const navigate = useNavigate();
  const { mutate: PostComment } = useMutation(
    () =>
      restFetcher({
        method: 'POST',
        path: '/comments',
        body: {
          boardId,
          content,
        },
      }),
    {
      onSuccess: () => {
        // TODO: 이후 소개 페이지가 아닐 시 실행할 쿼리키 등록
        setContent('');
        handleToastMessageProps('POST_COMMENT_SUCCESS', handleModalClose);
        return queryClient.refetchQueries([
          intro ? QueryKeys.INTRO_BOARD : QueryKeys.COMMUNITY_BOARD,
        ]);
      },
      onError: () => {
        handleToastMessageProps('POST_COMMENT_ERROR', handleModalClose);
      },
    },
  );

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    if (value.length > 400) return;
    setContent(value);
  };

  const onClickButton = () => {
    if (!user) {
      handleToastMessageProps('LOGIN_REQUIRED_ERROR', handleModalClose, () =>
        navigate('/login'),
      );
    } else if (content.trim() === '') {
      handleToastMessageProps('COMMENT_EMPTY_ERROR', handleModalClose);
    } else {
      PostComment();
    }
    handleModalOpen();
  };
  return (
    <div className={styles.wrapper}>
      <h1>댓글 {count}</h1>
      <div className={styles.horizon} />
      <div className={styles.commentWrapper}>
        <textarea
          value={content}
          onChange={handleContent}
          placeholder={
            !user ? '로그인 후 댓글을 달아보세요!' : '댓글을 입력하세요'
          }
        />
        <span>
          <p>{content.length}/400</p>
        </span>
      </div>
      <button
        className={styles.commentWrite}
        type="button"
        onClick={onClickButton}
      >
        등록
      </button>
      {comments.map((comment) => (
        <CommentDetail
          key={comment.commentId}
          comment={comment}
          boardId={boardId}
          intro={intro}
        />
      ))}
      {modalState && toastMessageProps && (
        <ModalPortal>
          <ToastMessageModal {...toastMessageProps} />
        </ModalPortal>
      )}
    </div>
  );
}
