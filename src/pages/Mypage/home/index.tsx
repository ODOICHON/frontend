import { Link } from 'react-router-dom';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import NoPosts from '@/components/Community/NoPosts';
import MyHomeCard from '@/components/MyPage/MyHomeCard';
import MyHomePopularCard from '@/components/MyPage/MyHomePopularCard';
import TradeBoard from '@/components/Trade/Board';
import { QueryKeys, restFetcher } from '@/queryClient';
import { BoardPageType } from '@/types/Board/boardType';
import { CommunityBoardPageType } from '@/types/Board/communityType';
import { IntroBoardType } from '@/types/Board/introType';
import { TradeBoardType } from '@/types/Board/tradeType';
import userStore from '@/store/userStore';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import styles from './styles.module.scss';

type myBoardType = Omit<
  IntroBoardType,
  'code' | 'nickName' | 'commentCount' | 'fixed'
>;

function MyPageHome() {
  const { user } = userStore();

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

  const { data: myScrapBoardListData } = useQuery<
    ApiResponseWithDataType<BoardPageType<TradeBoardType>>
  >([QueryKeys.MINE, QueryKeys.TRADE_BOARD], () =>
    restFetcher({
      method: 'GET',
      path: 'houses/scrap',
      params: { page: 0 },
    }),
  );

  const fetchBoardList = () => {
    const params = {
      prefix: 'DEFAULT',
      order: 'POPULAR',
      page: 0,
    };
    return restFetcher({ method: 'GET', path: 'boards', params });
  };

  const { data: boardPopularListData } = useQuery<
    ApiResponseWithDataType<CommunityBoardPageType>
  >([QueryKeys.COMMUNITY_BOARD, QueryKeys.MINE, 'POPULAR'], () =>
    fetchBoardList(),
  );

  return (
    <section className={styles.container}>
      <article>
        <div className={styles.titleContainer}>
          <span>{user?.userName}님의 마이페이지</span>
        </div>
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
      </article>

      <article>
        <div className={styles.titleContainer}>
          <span className={styles.title}>스크랩한 글</span>
          <Link to="/mypage/trade/scrap">
            더보기
            <MdOutlineArrowForwardIos />
          </Link>
        </div>
        {myScrapBoardListData &&
        myScrapBoardListData.data.content.length > 0 ? (
          <ul className={styles.boardWrapper}>
            {myScrapBoardListData.data.content.slice(0, 2).map((content) => (
              <TradeBoard
                key={content.houseId}
                houseId={content.houseId}
                rentalType={content.rentalType}
                city={content.city}
                price={content.price}
                monthlyPrice={content.monthlyPrice}
                isCompleted={content.isCompleted}
                nickName={content.nickName}
                createdAt={content.createdAt}
                imageUrl={content.imageUrl}
                title={content.title}
                recommendedTagName={content.recommendedTagName}
              />
            ))}
          </ul>
        ) : (
          <NoPosts />
        )}
      </article>

      <article>
        <div className={styles.titleContainer}>
          <span className={styles.title}>이번주 인기 게시글</span>
          {/* TODO: location으로 넘겨서 조건 처리로 우선 적용 ( 고민중 ) */}
          <Link to="/community/free_board" state={{ location: '/mypage/home' }}>
            더보러가기 <MdOutlineArrowForwardIos />
          </Link>
        </div>
        {boardPopularListData &&
        boardPopularListData.data.content.length > 0 ? (
          <ul className={styles.boardPopularWrapper}>
            {boardPopularListData.data.content.slice(0, 3).map((content) => (
              <MyHomePopularCard
                key={content.boardId}
                houseId={content.boardId}
                title={content.title}
                imgUrl={content.imageUrl}
                nickName={content.nickName}
                createdAt={content.createdAt}
              />
            ))}
          </ul>
        ) : (
          <NoPosts />
        )}
      </article>
    </section>
  );
}

export default MyPageHome;
