import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBookmark } from 'react-icons/bs';
import Dompurify from 'dompurify';
import { motion } from 'framer-motion';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import TradeBoardInfo from '@/components/Trade/Info';
import KakaoMapImage from '@/components/Trade/KakaoMapImage';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

// TODO: 실제 데이터로 바꾸기
const HTML_MOCK_DATA =
  '<h2>여러분은 오도이촌에 대해 알고 계신가요? </h2><h2>오도이촌은 요즘 떠오르는 주거 트렌드 중 하나이며 말 그대로 5일은 도시에서, 2일은 농촌에서 보내는 라이프스타일입니다. </h2><h2>그렇다면 오도이촌은 왜 주목되고 있으며, 오도이촌을 위해서는 무엇을 준비하면 좋을까요? </h2><h2>주말의집이 오늘 오도이촌에 대한 궁금증을 풀어 드리겠습니다!</h2><p><br></p><p><br></p><p>앞서도 언급했듯, 오도이촌이란 일주일 중 5일은 생활 기반인 도시에서, 나머지 2일은 농촌에서 자연을 즐기는 라이프스타일을 일컫는 말입니다.</p><p><br></p><p><img src="https://duaily-content.s3.ap-northeast-2.amazonaws.com/laptops-593296_1920%202.png" alt="이미지"></p><p>주52시간 근무제의 적용과 워라밸(일과 삶의 균형)을 중시하는 사회적 분위기에 따라 쉼을 찾는 사람들이 많아졌습니다. 이는 자연스럽게 세컨드하우스, 전원주택 등의 관심으로 이어졌습니다.</p><p>그러나 세컨드하우스의 삶만 추구하기 보다는 생활 기반인 도시를 포기할 수 없기에 평일 5일은 도시에, 주말에는 가족들과 함께 농촌에서 삶을 보내는 삶의 형태로 자리한 것입니다.</p><p><br></p><p><img src="https://duaily-content.s3.ap-northeast-2.amazonaws.com/rice-2812395_1920%201.png" alt="이미지"></p><p>그렇다면 주로 어떤 지역에서 오도이촌 살이를 하고 있을까요?</p><p>사람마다 다르지만 서울 근교 가평, 양평 등의 지역 또는 강원도와 같이 도시 생활권과 멀지 않은 곳에서 오도이촌을 선택하는 경우가 많습니다.</p><p><br></p><p>그러나, 주말을 시골에서 보내는 일이 쉬운 일만은 아닙니다. 주말에 살 수 있는 집을&nbsp;</p><p>다양한 지역에서 오도이촌을 위한 정책을 펼치고도 있는데요.</p><p><br></p><p><img src="https://duaily-content.s3.ap-northeast-2.amazonaws.com/to-gbe1543ec0_1920%202.png" alt="이미지"></p><p>강원도는 ‘강원도에서 한 달 살기’, ‘강원도에서 반년 살기’ 등의 프로그램을 진행하며 오도이촌을 돕는 다양한 프로그램을 운영한 바가 있습니다.&nbsp;</p><p><br></p><p>그러나 아직 오도이촌의 개념이 자리한지 얼마 되지 않았기 때문에 많은 사람들이 오도이촌에 대해 잘 모르는 것이 사실입니다. 그럼에도 현재 오도이촌을 통해 많은 가족들이 삶의 행복을 찾고 있는 가족들도 많습니다.</p><p><br></p><p>떠오르는 주거 트렌드, 오도이촌! 짧게라도 이번 주말에 시골에 방문해 보는 것은 어떨까요?</p><p>오도이촌에 대해 궁금한 모든 것들을 주말의집 자유 게시판에서 질문해 보는 것도 좋을 것 같네요!</p><p><br></p>';

export default function TradeBoardPage() {
  const navigate = useNavigate();
  const [_, updateState] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateState(true);
  }, []);

  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
      <div className={styles.title}>
        <div className={styles.innerTitle}>
          <ul className={styles.categoryList}>
            {/* TODO: 실제 데이터로 바꾸기 */}
            {['매매', '전세', '월세'].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h1>바다 앞에 위치한 포근한 집, 듀얼리 하우스 2호점</h1>
          <div>
            <p>
              작성자<span> | 해피부동산</span>
            </p>
            <p>
              작성일
              <span> | 2023.06.15</span>
            </p>
          </div>
        </div>
        <BsBookmark style={{ cursor: 'pointer' }} />
      </div>
      <div className={styles.line} />

      <Swiper
        className={styles.swiperContainer}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ el: ref.current }}
        scrollbar={{ draggable: true }}
      >
        {/* TODO: 실제 데이터로 바꾸기, /test.png 삭제하기 */}
        {[1, 2, 3].map((index) => (
          <SwiperSlide key={index}>
            <img src="/trade_board_test.png" alt="trade_board_img" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.pagination} ref={ref} />

      <section className={styles.infoContainer}>
        <TradeBoardInfo />
      </section>

      <div className={styles.contentWrapper}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(HTML_MOCK_DATA || ''),
          }}
        />
      </div>

      <section className={styles.kakao}>
        <span>지도 API</span>
        <KakaoMapImage />
      </section>

      <section className={styles.process}>
        <span>빈집거래 프로세스가 궁금하신가요?</span>
        <button
          type="button"
          onClick={() => {
            navigate('/trade/process');
          }}
        >
          중계 프로세스 확인하기
        </button>
      </section>
    </motion.div>
  );
}
