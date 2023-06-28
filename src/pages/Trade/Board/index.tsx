import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsBookmark } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Dompurify from 'dompurify';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import TradeBoardInfo from '@/components/Trade/Info';
import KakaoMapImage from '@/components/Trade/KakaoMapImage';
import { QueryKeys, restFetcher } from '@/queryClient';
import { TradeBoardDetailResponse } from '@/types/Board/Trade/boardDetailType';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import userStore from '@/store/userStore';
import { getRentalName } from '@/utils/utils';
import styles from './styles.module.scss';

export default function TradeBoardPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = userStore();
  const { data } = useQuery<TradeBoardDetailResponse>(
    [QueryKeys.TRADE_BOARD, id],
    () => restFetcher({ method: 'GET', path: `/houses/${id}` }),
  );
  const [_, updateState] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateState(true);
  }, []);

  // const [position, setPosition] = useState({ lat: 0, lng: 0 });

  // useEffect(() => {
  //   const geocoder = new window.kakao.maps.services.Geocoder();
  //   geocoder.addressSearch(
  //     data?.data.city || '제주특별시 제주시 첨단로 242',
  //     (result: any, status: any) => {
  //       if (status === window.kakao.maps.services.Status.OK) {
  //         console.log(+result[0].x, +result[0].y);
  //         const a = new window.kakao.maps.LatLng(+result[0].x, +result[0].y);
  //         console.log(a.getLat(), a.getLng());
  //         setPosition({ lat: +result[0].y, lng: +result[0].x });
  //       }
  //     },
  //   );
  // }, [data]);

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <div className={styles.innerTitle}>
          <ul className={styles.categoryList}>
            <li>{getRentalName(data?.data.rentalType || '')}</li>
            {/* TODO: 공인중개사 매물인지 확인하는 태그 구현하기, 피그마 참고 */}
          </ul>
          <h1>{data?.data.title}</h1>
          <div>
            <p>
              {data?.data.nickName}
              <span> | {data?.data.agentName}</span>
            </p>
            <p>
              작성일
              <span> | {dayjs(data?.data.createdAt).format('YYYY.MM.DD')}</span>
            </p>
            {user?.nick_name === data?.data.nickName ? (
              <div>
                <span>수정</span> | <span>삭제</span>
              </div>
            ) : null}
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
        {data?.data.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={url} alt="trade_board_img" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.pagination} ref={ref} />

      <section className={styles.infoContainer}>
        <TradeBoardInfo info={data?.data} />
      </section>

      <div className={styles.contentWrapper}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(data?.data.code || ''),
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
    </section>
  );
}
