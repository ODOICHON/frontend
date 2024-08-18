import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Dompurify from 'dompurify';
import { motion } from 'framer-motion';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import AccessModal from '@/components/Common/AccessModal';
import ModalPortal from '@/components/Common/ModalPortal';
import ToastMessageModal from '@/components/Common/ToastMessageModal';
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
import { DeleteHouseAPI } from '@/apis/houses';
import userStore from '@/store/userStore';
import useModalState from '@/hooks/useModalState';
import useToastMessageType from '@/hooks/useToastMessageType';
import { getMoveInType, getUserType } from '@/utils/utils';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function TradeBoardPage() {
  const navigate = useNavigate();
  const { modalState, handleModalOpen, handleModalClose } = useModalState();
  const { toastMessageProps, handleToastMessageProps } = useToastMessageType();
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

  const handleDeleteButtonClick = async (houseId: number) => {
    if (houseId === 0) throw new Error('없는 농가거래 게시물입니다.');
    await DeleteHouseAPI(houseId);
    handleToastMessageProps('POST_DELETE_SUCCESS', () => {
      handleModalClose();
      navigate('/trade');
    });
    handleModalOpen();
  };

  const handleEditButtonClick = () => {
    navigate(`/trade/write`, {
      state: { data: data?.data },
    });
  };

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
            <li
              className={
                data?.data.isCompleted
                  ? styles.isCompletedTrade
                  : styles.isNotCompletedTrade
              }
            >
              {getMoveInType(data?.data.isCompleted || false)}
            </li>
            <li
              className={
                data?.data.userType === 'AGENT'
                  ? styles.userTypeAgent
                  : styles.userTypeNormal
              }
            >
              {getUserType(data?.data.userType || 'NONE')}
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
                <button
                  type="button"
                  onClick={() => {
                    handleEditButtonClick();
                  }}
                >
                  수정
                </button>{' '}
                |{' '}
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteButtonClick(data?.data.houseId || 0);
                  }}
                >
                  삭제
                </button>
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
        <section className={styles.recommendedTag}>
          <article>
            <span>매물 특징</span>
            <ul>
              {data?.data.recommendedTagName.map((tag) => (
                <div key={tag}>{tag}</div>
              ))}
            </ul>
          </article>
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
          <span>농가거래 프로세스가 궁금하신가요?</span>
          <button
            type="button"
            onClick={() => {
              navigate('/trade/process');
            }}
          >
            중개 프로세스 확인하기
          </button>
        </section>
      </section>
      {modalState && toastMessageProps && (
        <ModalPortal>
          <ToastMessageModal {...toastMessageProps} />
        </ModalPortal>
      )}
    </motion.div>
  );
}
