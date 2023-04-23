import { Comment } from '@/types/boardDetailType';
import styles from './styles.module.scss';
import dayjs from 'dayjs';
import userStore from '@/store/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import useInput from '@/hooks/useInput';
import { useCallback, useEffect, useRef, useState } from 'react';

type CommentDetailProps = {
  comment: Comment;
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
  const [isUpdating, setIsUpdating] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [updateContent, setUpdateContenet] = useState(comment.content);
  const { mutate: deleteComment } = useMutation(
    () =>
      restFetcher({ method: 'DELETE', path: `comments/${comment.commentId}` }),
    {
      onSuccess: () => {
        // TODO: 이후 소개 페이지가 아닐 시 실행할 쿼리키 등록
        intro ? queryClient.refetchQueries([QueryKeys.INTRO_BOARD]) : null;
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
        intro
          ? queryClient
              .refetchQueries([QueryKeys.INTRO_BOARD])
              .then(() => setIsUpdating(false))
          : null;
      },
    },
  );
  const resizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
      if (e.currentTarget.value.length > 400) return;
      setUpdateContenet(e.target.value);
    }
  };
  const onClickUpdate = () => {
    setIsUpdating(true);
  };
  const onClickCancle = () => {
    setIsUpdating(false);
    setUpdateContenet(comment.content);
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
              <button onClick={() => updateComment()}>수정하기</button>
              <button onClick={onClickCancle}>취소</button>
            </span>
          ) : (
            <span className={styles.buttonWrapper}>
              <button onClick={onClickUpdate}>수정</button>
              <button onClick={() => deleteComment()}>삭제</button>
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
