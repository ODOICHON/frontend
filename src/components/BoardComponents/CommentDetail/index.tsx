import { Comment } from '@/types/boardDetailType';
import styles from './styles.module.scss';
import dayjs from 'dayjs';
import userStore from '@/store/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';

type CommentDetailProps = {
  comment: Comment;
  intro?: boolean;
};

export default function CommentDetail({ comment, intro }: CommentDetailProps) {
  const { user } = userStore();
  const queryClient = useQueryClient();
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
  return (
    <div className={styles.wrapper}>
      <div className={styles.metaDataWrapper}>
        <span className={styles.metaData}>
          <h3>{comment.nickName}</h3>
          <p>{dayjs(comment.createdAt).format('YYYY.MM.DD')}</p>
        </span>
        {(user?.nick_name === comment.nickName ||
          user?.authority === 'ADMIN') && (
          <span className={styles.buttonWrapper}>
            <button>수정</button>
            <button onClick={() => deleteComment()}>삭제</button>
          </span>
        )}
      </div>
      <p className={styles.content}>{comment.content}</p>
    </div>
  );
}
