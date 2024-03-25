import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import ModalPortal from '@/components/Common/ModalPortal';
import ToastMessageModal from '@/components/Common/ToastMessageModal';
import { QueryKeys, restFetcher } from '@/queryClient';
import { CommentType } from '@/types/Board/boardType';
import userStore from '@/store/userStore';
import useModalState from '@/hooks/useModalState';
import useToastMessageType from '@/hooks/useToastMessageType';
import styles from './styles.module.scss';

type CommentDetailProps = {
  comment: CommentType;
  boardId: number;
  intro?: boolean;
};

export default function CommentDetail({
  comment,
  boardId,
  intro,
}: CommentDetailProps) {
  const { user } = userStore();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateContent, setUpdateContent] = useState(comment.content);
  const { modalState, handleModalOpen, handleModalClose } = useModalState();
  const { toastMessageProps, handleToastMessageProps } = useToastMessageType();
  console.log(modalState, 'modalState');
  console.log(toastMessageProps, 'toastMessageProps');

  const { mutate: deleteComment } = useMutation(
    () =>
      restFetcher({ method: 'DELETE', path: `comments/${comment.commentId}` }),
    {
      onSuccess: () => {
        // TODO: 이후 소개 페이지가 아닐 시 실행할 쿼리키 등록
        handleToastMessageProps('DELETE_COMMENT_SUCCESS', () =>
          handleModalClose(() => {
            queryClient.refetchQueries([
              intro ? QueryKeys.INTRO_BOARD : QueryKeys.COMMUNITY_BOARD,
            ]);
          }),
        );
        // queryClient.refetchQueries([
        //   intro ? QueryKeys.INTRO_BOARD : QueryKeys.COMMUNITY_BOARD,
        // ]);
      },
      onError: () => {
        handleToastMessageProps('DELETE_COMMENT_ERROR', handleModalClose);
      },
    },
  );
  const { mutate: updateComment } = useMutation(
    () =>
      restFetcher({
        method: 'PUT',
        path: `comments/${comment.commentId}`,
        body: {
          boardId,
          content: updateContent,
        },
      }),
    {
      onSuccess: () => {
        // TODO: 이후 소개 페이지가 아닐 시 실행할 쿼리키 등록
        return queryClient
          .refetchQueries([
            intro ? QueryKeys.INTRO_BOARD : QueryKeys.COMMUNITY_BOARD,
          ])
          .then(() => setIsUpdating(false));
      },
    },
  );
  const resizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      if (e.currentTarget.value.length > 400) return;
      setUpdateContent(e.target.value);
    }
  };
  const onClickUpdate = () => {
    setIsUpdating(true);
  };
  const onClickCancel = () => {
    setIsUpdating(false);
    setUpdateContent(comment.content);
  };
  useEffect(() => {
    const len = inputRef.current?.textLength;
    if (!len) return;
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(len, len);
  }, [isUpdating]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.metaDataWrapper}>
        <span className={styles.metaData}>
          <h3>{comment.nickName}</h3>
          <p>{dayjs(comment.createdAt).format('YYYY.MM.DD')}</p>
        </span>
        {(user?.nick_name === comment.nickName ||
          user?.authority === 'ADMIN') &&
          (isUpdating ? (
            <span className={styles.buttonWrapper}>
              <button
                className={styles.active}
                type="button"
                onClick={() => updateComment()}
              >
                수정
              </button>
              <div>|</div>
              <button type="button" onClick={onClickCancel}>
                취소
              </button>
            </span>
          ) : (
            <span className={styles.buttonWrapper}>
              {user?.nick_name === comment.nickName && (
                <button type="button" onClick={onClickUpdate}>
                  수정
                </button>
              )}
              <div>|</div>
              <button
                type="button"
                onClick={() => {
                  deleteComment();
                  handleModalOpen();
                }}
              >
                삭제
              </button>
            </span>
          ))}
      </div>
      {isUpdating ? (
        <textarea
          ref={inputRef}
          className={styles.updateInput}
          value={updateContent}
          onChange={resizeHeight}
        />
      ) : (
        <p className={styles.content}>{comment.content}</p>
      )}
      {modalState && toastMessageProps && (
        <ModalPortal>
          <ToastMessageModal {...toastMessageProps} />
        </ModalPortal>
      )}
    </div>
  );
}
