import { Link } from 'react-router-dom';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import NoPosts from '@/components/Common/NoPosts';
import AgentInfoCard from '@/components/MyPage/Home/AgentInfoCard';
import InfoCard from '@/components/MyPage/Home/InfoCard';
import MyHomePopularCard from '@/components/MyPage/MyHomePopularCard';
import TradeBoard from '@/components/Trade/Board';
import { QueryKeys, restFetcher } from '@/queryClient';
import { BoardPageType } from '@/types/Board/boardType';
import { CommunityBoardPageType } from '@/types/Board/communityType';
import { TradeBoardType } from '@/types/Board/tradeType';
import userStore from '@/store/userStore';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import styles from './styles.module.scss';

function MyHomePage() {
  const { user } = userStore();
  const { data: myScrapBoardListData } = useQuery<
    ApiResponseWithDataType<BoardPageType<TradeBoardType>>
  >([QueryKeys.MY_SCRAPS, QueryKeys.MINE, QueryKeys.TRADE_BOARD], () =>
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
          <h1>
            {user?.nick_name}님의{' '}
            {user?.userType === 'AGENT' ? '농가거래 활동' : '마이페이지'}
          </h1>
        </div>
        {user?.userType === 'AGENT' ? <AgentInfoCard /> : <InfoCard />}
      </article>

      <article>
        <div className={styles.titleContainer}>
          <h2>스크랩한 글</h2>
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
          <NoPosts text="스크랩한 공고가 없어요." padding={false} />
        )}
      </article>

      <article>
        <div className={styles.titleContainer}>
          <h2>이번주 인기 게시글</h2>
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
          <NoPosts
            text="아직은 글이 없어요."
            subText="글을 작성해서 자유롭게 오도이촌 이야기를 해보아요!"
            padding={false}
          />
        )}
      </article>
    </section>
  );
}

export default MyHomePage;
