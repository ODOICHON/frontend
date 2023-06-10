import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewBoard from '@/components/Introduce/ReviewBoard';
import TrendBoard from '@/components/Introduce/TrendBoard';
import { QueryKeys, restFetcher } from '@/queryClient';
import 'swiper/css';
import 'swiper/css/scrollbar';
import userStore from '@/store/userStore';
import { BoardMainResponse } from '@/types/boardType';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function IntroducePage() {
  const { user } = userStore();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const fetchTrendList = (nowPage: number) => {
    const params = {
      prefix: 'INTRO',
      limit: 4 * nowPage,
      category: 'TREND',
    };
    return restFetcher({ method: 'GET', path: 'boards/preview', params });
  };

  const { data: trendData } = useQuery<BoardMainResponse>(
    [QueryKeys.INTRO_BOARD, 'TREND', page],
    () => fetchTrendList(page),
  );

  const { data: prefetchTrendData } = useQuery<BoardMainResponse>(
    [QueryKeys.INTRO_BOARD, 'TREND', page + 1],
    () => fetchTrendList(page + 1),
  );

  const { data: reviewData } = useQuery<BoardMainResponse>(
    [QueryKeys.INTRO_BOARD, 'REVIEW'],
    () =>
      restFetcher({
        method: 'GET',
        path: 'boards/preview',
        params: {
          prefix: 'INTRO',
          limit: 100,
          category: 'REVIEW',
        },
      }),
  );

  const handleMoreTrend = () => {
    setPage((prev) => prev + 1);
  };

  const goToAdminWritePage = () => {
    navigate('/intro_write');
  };

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
            <button type="button" onClick={goToAdminWritePage}>
              관리자 글쓰기
            </button>
          )}
        </div>
        <p>
          {`‘오도이촌' 막상 준비하려 하니 무엇부터 해야 할지 모르시겠다고요?
주말의집이 이런 분들을 위해 준비했습니다. 오도이촌의 다양한 트렌드를 빠르게 제공해 드립니다.`}
        </p>
        <div className={styles.trendWrapper}>
          {trendData?.data.map((board) => (
            <TrendBoard key={board.boardId} {...board} />
          ))}
        </div>
        {trendData?.data.length !== prefetchTrendData?.data.length && (
          <button
            type="button"
            className={styles.button}
            onClick={handleMoreTrend}
          >
            더 많은 트렌드 보기
          </button>
        )}
      </section>
      <section className={styles.reviewSectionContainer}>
        <div className={styles.reviewSection}>
          <div className={styles.titleWrapper}>
            <h2>오도이촌 후기</h2>
            {user?.authority === 'ADMIN' && (
              <button type="button" onClick={goToAdminWritePage}>
                관리자 글쓰기
              </button>
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
            {reviewData?.data.map((board) => (
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
