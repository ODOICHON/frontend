import { useQuery } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import { BoardPageType } from '@/types/Board/boardType';
import { IntroBoardType } from '@/types/Board/introType';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import MyHomeCard from '../../MyHomeCard';
import styles from '../styles.module.scss';

type myBoardType = Omit<
  IntroBoardType,
  'code' | 'nickName' | 'commentCount' | 'fixed'
>;

export default function InfoCard() {
  const { data: myBoardListData } = useQuery<
    ApiResponseWithDataType<BoardPageType<myBoardType>>
  >([QueryKeys.MINE, QueryKeys.COMMUNITY_BOARD], () =>
    restFetcher({
      method: 'GET',
      path: 'boards/my',
      params: { page: 0, limit: 3 },
    }),
  );

  const { data: myCommentListData } = useQuery<
    ApiResponseWithDataType<BoardPageType<myBoardType>>
  >([QueryKeys.MINE, QueryKeys.COMMENT], () =>
    restFetcher({
      method: 'GET',
      path: 'boards/my/comment',
      params: { page: 0 },
    }),
  );

  const { data: myLikeListData } = useQuery<
    ApiResponseWithDataType<BoardPageType<myBoardType>>
  >([QueryKeys.MINE, QueryKeys.LIKE], () =>
    restFetcher({
      method: 'GET',
      path: 'boards/my/love',
      params: { page: 0 },
    }),
  );
  return (
    <ul className={styles.cardWrapper}>
      <MyHomeCard
        key="내가 쓴 글"
        title="내가 쓴 글"
        count={myBoardListData?.data.totalElements || 0}
      />
      <MyHomeCard
        key="내가 쓴 댓글"
        title="내가 쓴 댓글"
        count={myCommentListData?.data.totalElements || 0}
      />
      <MyHomeCard
        key="좋아요한 글"
        title="좋아요한 글"
        count={myLikeListData?.data.totalElements || 0}
      />
    </ul>
  );
}
