import { Comment } from '@/types/boardDetailType';
import styles from './styles.module.scss';
import useInput from '@/hooks/useInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import userStore from '@/store/userStore';

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
  const [content, handleContent, setContent] = useInput('');
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
        intro ? queryClient.refetchQueries([QueryKeys.INTRO_BOARD]) : null;
      },
    },
  );
  const onClickButton = () => {
    if (!user) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    setContent('');
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
          placeholder="로그인 후 댓글을 달아보세요!"
        />
        <span>
          <p>{content.length}/400</p>
          <button onClick={onClickButton}>등록</button>
        </span>
      </div>
    </div>
  );
}
