import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { QueryKeys, restFetcher } from '@/queryClient';
import { CommentType } from '@/types/Board/boardType';
import userStore from '@/store/userStore';
import styles from './styles.module.scss';

type CommentDetailProps = {
  comment: CommentType;
  boardId: number;
  intro?: boolean;
  handleDeleteComment: () => void;
};

export default function CommentDetail({
  comment,
  boardId,
  intro,
  handleDeleteComment,
}: CommentDetailProps) {
  const { user } = userStore();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateContent, setUpdateContent] = useState(comment.content);

  const { mutate: deleteComment } = useMutation(
    () =>
      restFetcher({ method: 'DELETE', path: `comments/${comment.commentId}` }),
    {
      onSuccess: () => {
        // TODO: 이후 소개 페이지가 아닐 시 실행할 쿼리키 등록
        handleDeleteComment();
        return queryClient.refetchQueries([
          intro ? QueryKeys.INTRO_BOARD : QueryKeys.COMMUNITY_BOARD,
        ]);
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
    </div>
  );
}
