import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Loading from '@/components/Common/Loading';
import NoPosts from '@/components/Common/NoPosts';
import TradeBoard from '@/components/Trade/Board';
import CategorySelect from '@/components/Trade/CategorySelect';
import FilterOption from '@/components/Trade/FilterOption';
import SearchBar from '@/components/Trade/SearchBar';
import { restFetcher, QueryKeys } from '@/queryClient';
import {
  RecommendedTagType,
  TradeBoardPageType,
  TradeBoardType,
} from '@/types/Board/tradeType';
import userStore from '@/store/userStore';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function TradePage() {
  const navigate = useNavigate();
  const { token } = userStore();

  const [boardListData, setBoardListData] = useState<TradeBoardType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const [houseType, setHouseType] = useState('');
  const [rentalType, setRentalType] = useState('');
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');
  const [recommendedTags, setRecommendedTags] = useState<RecommendedTagType[]>(
    [],
  );
  const [dealState, setDealState] = useState<'ALL' | 'ONGOING'>('ALL');

  const fetchBoardList = (page = 0) => {
    const params = {
      ...(search && { search }),
      ...(rentalType !== '' && { rentalType }),
      ...(city !== '' && { city }),
      ...(recommendedTags.length > 0 && {
        recommendedTag: recommendedTags.join(','),
      }),
      ...(dealState !== 'ALL' && { dealState }),
      page,
    };
    return restFetcher({ method: 'GET', path: 'houses', params });
  };

  const { refetch: fetchBoard, isLoading: isBoardLoading } = useQuery<
    ApiResponseWithDataType<TradeBoardPageType>
  >([QueryKeys.TRADE_BOARD], () => fetchBoardList(), {
    onSuccess: (response) => {
      setBoardListData(response.data.content);
      setIsLastPage(response.data.last);
    },
  });
  const { isInitialLoading: isMoreBoardLoading } = useQuery<
    ApiResponseWithDataType<TradeBoardPageType>
  >([QueryKeys.TRADE_BOARD, currentPage], () => fetchBoardList(currentPage), {
    enabled: currentPage !== 0,
    onSuccess: (response) => {
      setBoardListData((prev) => [...prev, ...response.data.content]);
      setIsLastPage(response.data.last);
    },
    staleTime: 0,
  });

  const handleMoreBoards = () => {
    if (!isLastPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setBoardListData([]);
    fetchBoard();
    setCurrentPage(0);
  }, [recommendedTags, dealState]);

  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
      <section className={styles.titleContainer}>
        <div className={styles.title}>
          <h1>농가거래</h1>
          <pre>
            주말농장 토지나 시골집을 등록하고
            <br /> 구경할 수 있는 공간입니다.
          </pre>
        </div>
      </section>
      <section className={styles.contentWrapper}>
        <SearchBar
          houseType={houseType}
          rentalType={rentalType}
          city={city}
          search={search}
          setHouseType={setHouseType}
          setRentalType={setRentalType}
          setCity={setCity}
          setSearch={setSearch}
          setCurrentPage={setCurrentPage}
          fetchBoard={fetchBoard}
        />
        <CategorySelect
          recommendedTags={recommendedTags}
          setRecommendedTags={setRecommendedTags}
        />
        <FilterOption dealState={dealState} setDealState={setDealState} />
        <div className={styles.line} />

        {isBoardLoading && <Loading />}
        {boardListData && boardListData.length > 0 ? (
          <ul className={styles.boardWrapper}>
            {boardListData.map((content) => (
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
        <button
          className={styles.writeButton}
          type="button"
          onClick={() => {
            token ? navigate(`/trade/write`) : navigate('/login');
          }}
        >
          글쓰기
        </button>
        {isMoreBoardLoading ? (
          <Loading />
        ) : (
          !isLastPage && (
            <button
              type="button"
              className={styles.moreButton}
              onClick={handleMoreBoards}
            >
              더 많은 매물 보기
            </button>
          )
        )}
      </section>
    </motion.div>
  );
}
