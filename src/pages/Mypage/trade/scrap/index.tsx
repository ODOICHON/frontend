import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Common/Loading';
import NoPosts from '@/components/Common/NoPosts';
import Pagenation from '@/components/Common/Pagenation';
import TradeBoard from '@/components/Trade/Board';
import { QueryKeys, restFetcher } from '@/queryClient';
import { BoardPageType } from '@/types/Board/boardType';
import { TradeBoardType } from '@/types/Board/tradeType';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import styles from './styles.module.scss';

function ScrapPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: scrapBoardListData, isLoading: isScrapBoardListData } =
    useQuery<ApiResponseWithDataType<BoardPageType<TradeBoardType>>>(
      [QueryKeys.TRADE_BOARD, QueryKeys.MINE, currentPage],
      () =>
        restFetcher({
          method: 'GET',
          path: 'houses/scrap',
          params: { page: currentPage - 1 },
        }),
    );

  return (
    <section className={styles.container}>
      <article className={styles.titleWrapper}>
        <h1>스크랩</h1>
        <p>관심있는 빈집을 확인 할 수 있어요.</p>
      </article>
      <article className={styles.wrapper}>
        <button
          className={styles.button}
          type="button"
          onClick={() => alert('준비중입니다.')}
        >
          ✔ 거래 중인 매물만 보기
        </button>
        <div className={styles.line} />
      </article>
      <article>
        {isScrapBoardListData && <Loading />}
        {scrapBoardListData && scrapBoardListData.data.content.length > 0 ? (
          <ul className={styles.scrapBoardWrapper}>
            {scrapBoardListData.data.content.map((content) => (
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
          <NoPosts text="아직은 글이 없어요." />
        )}
      </article>
      <article className={styles.pagination}>
        {scrapBoardListData && scrapBoardListData.data.content.length > 0 && (
          <Pagenation
            totalPage={scrapBoardListData.data.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </article>
    </section>
  );
}

export default ScrapPage;
