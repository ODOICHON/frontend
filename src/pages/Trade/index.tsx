import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Loading from '@/components/Common/Loading';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [rentalType, setRentalType] = useState('');
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');
  const [recommendedTags, setRecommendedTags] = useState<RecommendedTagType[]>(
    [],
  );
  const [focusedFilter, setFocusedFilter] = useState('ALL');

  const handleMoreBoards = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const fetchBoardList = (page: number) => {
    const params = {
      ...(search && { search }),
      ...(rentalType !== '' && { rentalType }),
      ...(city !== '' && { city }),
      ...(recommendedTags.length > 0 && {
        recommendedTag: recommendedTags.join(','),
      }),
      order: focusedFilter,
      page: page - 1,
    };
    return restFetcher({ method: 'GET', path: 'houses', params });
  };

  const { refetch, isLoading } = useQuery<
    ApiResponseWithDataType<TradeBoardPageType>
  >(
    [
      QueryKeys.TRADE_BOARD,
      rentalType,
      city,
      recommendedTags,
      focusedFilter,
      currentPage,
    ],
    () => fetchBoardList(currentPage),
    {
      onSuccess: (response) => {
        setBoardListData((prev) => [...prev, ...response.data.content]);
        setTotalPage(response.data.totalPages);
      },
    },
  );

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
      <section className={styles.titleContainer}>
        <div className={styles.title}>
          <h1>빈집중개</h1>
          <pre>
            {`자신의 빈집을 등록하거나 다양한 지역의
빈집을 구경할 수 있는 공간입니다.`}
          </pre>
        </div>
      </section>
      <section className={styles.contentWrapper}>
        <SearchBar
          rentalType={rentalType}
          city={city}
          search={search}
          setRentalType={setRentalType}
          setCity={setCity}
          setSearch={setSearch}
        />
        <CategorySelect
          recommendedTags={recommendedTags}
          setRecommendedTags={setRecommendedTags}
        />
        <FilterOption
          focusedFilter={focusedFilter}
          setFocusedFilter={setFocusedFilter}
        />
        <div className={styles.line} />
        <ul className={styles.boardWrapper}>
          {boardListData.map((content) => (
            <TradeBoard
              key={content.houseId}
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
        <button
          className={styles.writeButton}
          type="button"
          onClick={() => {
            token ? navigate(`/trade/write`) : navigate('/login');
          }}
        >
          글쓰기
        </button>
        {isLoading ? (
          <Loading />
        ) : (
          <button
            type="button"
            className={styles.moreButton}
            onClick={handleMoreBoards}
          >
            더 많은 매물 보기
          </button>
        )}
      </section>
    </motion.div>
  );
}
