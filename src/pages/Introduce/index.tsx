import TrendBoard from '@/components/IntroComponents/TrendBoard';
import { opacityVariants } from '@/constants/variants';
import { QueryKeys, restFetcher } from '@/queryClient';
import { BoardResponse, BoardContent } from '@/types/boardType';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import styles from './styles.module.scss';
import ReviewBoard from '@/components/IntroComponents/ReviewBoard';
import { useEffect, useState } from 'react';
import userStore from '@/store/userStore';
import { useNavigate } from 'react-router-dom';

export default function IntroducePage() {
  const { user } = userStore();
  const navigate = useNavigate();
  const [trendSliceData, setTrendSliceData] = useState<BoardContent[]>([]);
  const [trendData, setTrendData] = useState<BoardContent[]>([]);
  const [reviewData, setReviewData] = useState<BoardContent[]>([]);
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState(1);
  const { data } = useQuery<BoardResponse>(
    [QueryKeys.BOARD],
    () =>
      restFetcher({
        method: 'GET',
        path: 'boards',
        params: { prefix: 'INTRO' },
      }),
    {
      onSuccess: (data) => {
        const response = data.data.content;
        const trendData = response.filter(
          (content) => content.category === 'TREND',
        );
        const reviewData = response.filter(
          (content) => content.category === 'REVIEW',
        );
        setTrendData(trendData);
        setReviewData(reviewData);
        setPageLength(Math.ceil(trendData.length / 4));
        response.length <= 4
          ? setTrendSliceData(trendData)
          : setTrendSliceData(trendData.slice(0, 4));
      },
    },
  );
  const handleMoreTrend = () => {
    if (pageLength <= page) return;
    setPage((prev) => prev + 1);
  };

  const goToAdminWritePage = () => {
    navigate('/intro_write');
  };

  useEffect(() => {
    const data = trendData;
    page === pageLength
      ? setTrendSliceData(data!)
      : setTrendSliceData(data?.slice(0, page * 4)!);
  }, [page]);
  useEffect(() => {
    if (!data) return;
    const response = data.data.content;
    const trendData = response.filter(
      (content) => content.category === 'TREND',
    );
    const reviewData = response.filter(
      (content) => content.category === 'REVIEW',
    );
    setTrendData(trendData);
    setReviewData(reviewData);
    setPageLength(Math.ceil(trendData.length / 4));
    response.length <= 4
      ? setTrendSliceData(trendData)
      : setTrendSliceData(trendData.slice(0, 4));
  }, []);

  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <h1>{`도시와 농촌을 오가는 라이프 스타일,
오도이촌에 대한 다양한 소식을 만나보세요. `}</h1>
        </div>
      </div>
      <section className={styles.trendSection}>
        <div className={styles.titleWrapper}>
          <h2>오도이촌 트렌드</h2>
          {user?.authority === 'ADMIN' && (
            <button onClick={goToAdminWritePage}>관리자 글쓰기</button>
          )}
        </div>
        <p>
          {`‘오도이촌' 막상 준비하려 하니 무엇부터 해야 할지 모르시겠다고요?
주말의집이 이런 분들을 위해 준비했습니다. 오도이촌의 다양한 트렌드를 빠르게 제공해 드립니다.`}
        </p>
        <div className={styles.trendWrapper}>
          {trendSliceData?.map((board) => (
            <TrendBoard key={board.boardId} {...board} />
          ))}
        </div>
        {pageLength > page && (
          <button className={styles.button} onClick={handleMoreTrend}>
            더 많은 트렌드 보기
          </button>
        )}
      </section>
      <section className={styles.reviewSectionContainer}>
        <div className={styles.reviewSection}>
          <div className={styles.titleWrapper}>
            <h2>오도이촌 후기</h2>
            {user?.authority === 'ADMIN' && (
              <button onClick={goToAdminWritePage}>관리자 글쓰기</button>
            )}
          </div>
          <p>
            {`오도이촌, 준비해야 하는 것이 많은 만큼 걱정되는 것도 많은데요.
그렇다면 직접 ‘오도이촌' 해본 분의 다양한 후기를 접해보고 소통해보세요!`}
          </p>
          <Swiper
            scrollbar={{
              hide: false,
            }}
            spaceBetween={60}
            slidesPerView={1}
            breakpoints={{
              540: {
                slidesPerView: 2,
              },
            }}
            modules={[Scrollbar]}
            className={styles.reviewSwiper}
          >
            {reviewData?.map((board) => (
              <SwiperSlide key={board.boardId}>
                <ReviewBoard {...board} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </motion.div>
  );
}
