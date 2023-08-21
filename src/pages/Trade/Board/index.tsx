import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Dompurify from 'dompurify';
import { motion } from 'framer-motion';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import AccessModal from '@/components/Common/AccessModal';
import TradeBoardInfo from '@/components/Trade/Info';
import KakaoMapImage from '@/components/Trade/KakaoMapImage';
import ReportIcon from '@/components/Trade/Report/ReportIcon';
import ReportModal from '@/components/Trade/Report/ReportModal';
import ScrapIcon from '@/components/Trade/ScrapIcon';
import { QueryKeys, restFetcher } from '@/queryClient';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { TradeBoardDetailType } from '@/types/Board/tradeType';
import userStore from '@/store/userStore';
import { getMoveInType, getRentalName, getUserType } from '@/utils/utils';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function TradeBoardPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = userStore();
  const { data } = useQuery<ApiResponseWithDataType<TradeBoardDetailType>>(
    [QueryKeys.TRADE_BOARD, id],
    () =>
      restFetcher({
        method: 'GET',
        path: `/houses${user ? '/user-scrap' : ''}/${id}`,
      }),
  );
  const [_, updateState] = useState(false);
  const [modal, setModal] = useState(false);
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
      {modal && (
        <ReportModal
          id={data?.data.houseId || 0}
          setModal={setModal}
          title={data?.data.title || ''}
          nickName={data?.data.nickName || ''}
        />
      )}

      <div className={styles.title}>
        <div className={styles.innerTitle}>
          <ul className={styles.categoryList}>
            <li>{getRentalName(data?.data.rentalType || '')}</li>
            <li>{getMoveInType(data?.data.isCompleted || false)}</li>
            <li className={styles.userType}>
              {getUserType(data?.data.userType || '')}
            </li>
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
        {user ? (
          <article>
            <ReportIcon setModal={setModal} />
            <ScrapIcon
              boardId={id || ''}
              isScraped={data?.data.isScraped || false}
            />
          </article>
        ) : null}
        {user ? null : <AccessModal />}
      </div>
      <div className={styles.line} />

      <section className={user ? undefined : styles.mainContainer}>
        <Swiper
          className={styles.swiperContainer}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ el: ref.current }}
          scrollbar={{ draggable: true }}
        >
          {data?.data.imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <img src={url} alt="trade_board_img" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.pagination} ref={ref} />
        <section
          className={styles.infoContainer}
          style={user ? undefined : { visibility: 'hidden' }}
        >
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
          <KakaoMapImage address={data?.data.city || ''} />
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
    </motion.div>
  );
}
