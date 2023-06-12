import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import userStore from '@/store/userStore';
import { Comment } from '@/types/boardDetailType';
import styles from './styles.module.scss';
import CommentDetail from '../CommentDetail';

type CommentsProps = {
  boardId: number;
  comments: Comment[];
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
        return queryClient.refetchQueries([
          intro ? QueryKeys.INTRO_BOARD : QueryKeys.COMMUNITY_BOARD,
        ]);
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
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    if (content.trim() === '') return;
    PostComment();
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
          <button type="button" onClick={onClickButton}>
            등록
          </button>
        </span>
      </div>
      {comments.map((comment) => (
        <CommentDetail
          key={comment.commentId}
          comment={comment}
          boardId={boardId}
          intro={intro}
        />
      ))}
    </div>
  );
}
