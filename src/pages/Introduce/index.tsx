import TrendBoard from '@/components/IntroComponents/TrendBoard';
import { opacityVariants } from '@/constants/variants';
import { QueryKeys, restFetcher } from '@/queryClient';
import { BoardResponse } from '@/types/boardType';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import styles from './styles.module.scss';
import ReviewBoard from '@/components/IntroComponents/ReviewBoard';
import Footer from '@/components/Footer';

export default function IntroducePage() {
  const { data: trendData } = useQuery<BoardResponse>(
    [QueryKeys.BOARD, 'TREND'],
    () =>
      restFetcher({
        method: 'GET',
        path: 'boards',
        params: { category: 'INTRO' },
      }),
  );
  const { data: reviewData } = useQuery<BoardResponse>(
    [QueryKeys.BOARD, 'DEFAULT'],
    () =>
      restFetcher({
        method: 'GET',
        path: 'boards',
        params: { category: 'DEFAULT' },
      }),
  );
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
        <h2>오도이촌 트렌드</h2>
        <pre>
          {`‘오도이촌' 막상 준비하려 하니 무엇부터 해야 할지 모르시겠다고요?
주말의집이 이런 분들을 위해 준비했습니다. 오도이촌의 다양한 트렌드를 빠르게 제공해 드립니다.`}
        </pre>
        <div>
          {trendData?.data.content.map((board) => (
            <TrendBoard key={board.boardId} {...board} />
          ))}
        </div>
        <button className={styles.button}>더 많은 트렌드 보기</button>
      </section>
      <section className={styles.reviewSectionContainer}>
        <div className={styles.reviewSection}>
          <h2>오도이촌 후기</h2>
          <pre>
            {`오도이촌, 준비해야 하는 것이 많은 만큼 걱정되는 것도 많은데요.
그렇다면 직접 ‘오도이촌' 해본 분의 다양한 후기를 접해보고 소통해보세요!`}
          </pre>
          <Swiper
            scrollbar={{
              hide: false,
            }}
            slidesPerView={2}
            spaceBetween={60}
            modules={[Scrollbar]}
            className={styles.mySwiper}
          >
            {reviewData?.data.content.map((board) => (
              <SwiperSlide key={board.boardId}>
                <ReviewBoard {...board} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <Footer />
    </motion.div>
  );
}
