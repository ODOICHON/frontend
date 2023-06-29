import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineAlert } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Dompurify from 'dompurify';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import TradeBoardInfo from '@/components/Trade/Info';
import KakaoMapImage from '@/components/Trade/KakaoMapImage';
import ReportModal from '@/components/Trade/ReportModal';
import { QueryKeys, restFetcher } from '@/queryClient';
import { TradeBoardDetailResponse } from '@/types/Board/Trade/boardDetailType';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { DeleteScrapAPI, PutScrapAPI } from '@/apis/boards';
import userStore from '@/store/userStore';
import { getMoveInType, getRentalName, getUserType } from '@/utils/utils';
import styles from './styles.module.scss';

export default function TradeBoardPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = userStore();
  const { data, refetch } = useQuery<TradeBoardDetailResponse>(
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
    <section className={styles.container}>
      {modal && (
        <ReportModal id={data?.data.houseId || 0} setModal={setModal} />
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
            <div>
              <AiOutlineAlert
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => setModal(true)}
              />
              <span>신고하기</span>
            </div>
            <div>
              <BsBookmark
                style={{
                  cursor: 'pointer',
                  color: data?.data.isScraped ? '#ec6130' : '',
                }}
                onClick={async () => {
                  if (data?.data.isScraped === true) {
                    await DeleteScrapAPI(data?.data.houseId);
                    await refetch();
                  } else if (data?.data.isScraped === false) {
                    await PutScrapAPI(data?.data.houseId);
                    await refetch();
                  }
                }}
              />
              <span>스크랩</span>
            </div>
          </article>
        ) : null}
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
  );
}
