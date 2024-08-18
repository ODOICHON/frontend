import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import footer from '@/assets/common/footer.png';
import { QueryKeys, restFetcher } from '@/queryClient';
import { CommunityBoardType } from '@/types/Board/communityType';
import { IntroBoardType } from '@/types/Board/introType';
import { getPrefixCategoryName } from '@/utils/utils';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import { jumbotronData } from '@/constants/main_dummy';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function MainPage() {
  const [_, updateState] = useState(false);
  const [introToggle, setIntroToggle] = useState<'trend' | 'review'>('trend');
  const navigate = useNavigate();
  const introNextRef = useRef<HTMLButtonElement>(null);
  const introPrevRef = useRef<HTMLButtonElement>(null);
  const commuNextRef = useRef<HTMLButtonElement>(null);
  const commuPrevRef = useRef<HTMLButtonElement>(null);
  const { data: introData } = useQuery<
    ApiResponseWithDataType<IntroBoardType[]>
  >([QueryKeys.PREVIEW_BOARD, QueryKeys.INTRO_BOARD, introToggle], () =>
    restFetcher({
      method: 'GET',
      path: 'boards/preview',
      params: {
        prefix: 'INTRO',
        limit: 5,
        category: introToggle.toUpperCase(),
      },
    }),
  );
  const { data: communityData } = useQuery<
    ApiResponseWithDataType<CommunityBoardType[]>
  >([QueryKeys.PREVIEW_BOARD, QueryKeys.COMMUNITY_BOARD], () =>
    restFetcher({
      method: 'GET',
      path: 'boards/preview',
      params: {
        prefix: 'COMMUNITY',
        limit: 5,
      },
    }),
  );

  useEffect(() => {
    updateState(true);
  }, [introNextRef, commuNextRef]);

  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
      <Swiper
        spaceBetween={30}
        touchStartPreventDefault={false}
        centeredSlides
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.swiperContainer}
      >
        {jumbotronData.map((data, idx) => (
          <SwiperSlide
            key={idx}
            className={styles.swiperBox}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
          url(${data.imageUrl})`,
            }}
          >
            <h3>0{idx + 1}</h3>
            <h1 dangerouslySetInnerHTML={{ __html: data.title }} />
            <p>{data.content}</p>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.section1}>
        <div className={styles.odoiIntro}>
          <h3>오도이촌 소개</h3>
          <div className={styles.odoiIntro_title}>
            <h1>도시와 농촌을 오가는 라이프 스타일,</h1>
            <h1>오도이촌에 대한 다양한 소식을</h1>
            <h1>지금 만나보세요.</h1>
          </div>
          <div className={styles.odoiIntro_buttons}>
            <button
              type="button"
              className={introToggle === 'trend' ? '' : styles.button_disabled}
              onClick={() => setIntroToggle('trend')}
            >
              트렌드
            </button>
            <button
              type="button"
              className={introToggle === 'review' ? '' : styles.button_disabled}
              onClick={() => setIntroToggle('review')}
            >
              후기
            </button>
          </div>
          <div className={styles.odoiIntro_bottom}>
            <Link to="/introduce">더 알아보기</Link>
            <div className={styles.slideButton}>
              <button type="button" ref={introPrevRef}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9.125 21.1L.7 12.7q-.15-.15-.213-.325T.425 12q0-.2.063-.375T.7 11.3l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L3.55 12l7.35 7.35q.35.35.35.863t-.375.887q-.375.375-.875.375t-.875-.375Z"
                  />
                </svg>
              </button>
              <button type="button" ref={introNextRef}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7.15 21.1q-.375-.375-.375-.888t.375-.887L14.475 12l-7.35-7.35q-.35-.35-.35-.875t.375-.9q.375-.375.888-.375t.887.375l8.4 8.425q.15.15.213.325T17.6 12q0 .2-.063.375t-.212.325L8.9 21.125q-.35.35-.863.35T7.15 21.1Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <Swiper
          navigation={{
            nextEl: introNextRef.current,
            prevEl: introPrevRef.current,
          }}
          slidesPerView={1}
          breakpoints={{
            520: {
              slidesPerView: 2,
            },
          }}
          touchStartPreventDefault={false}
          modules={[Navigation]}
          className={styles.sectionSwiper}
        >
          {introData?.data.map((data) => (
            <SwiperSlide key={data.boardId}>
              <div
                role="presentation"
                className={styles.odoiIntro_slide}
                onClick={() => navigate(`/intro_board/${data.boardId}`)}
              >
                <div className={styles.odoiIntro_slide_text}>
                  <h1>{data.category}</h1>
                  <div>
                    <h3>{data.title}</h3>
                    <p>{data.oneLineContent}</p>
                  </div>
                </div>
                <img
                  className={styles.odoiIntro_slide_image}
                  // src={data.imageUrl + THUMBNAIL_SIZE_OPTION}
                  src={data.imageUrl}
                  alt="ThumbnailImage"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.section2Container}>
        <div className={styles.section2}>
          <h3>오도이촌 커뮤니티</h3>
          <h1>{`‘오도이촌’이라는 공통의 관심사를 가진 분들과
다양한 이야기를 공유해보세요.`}</h1>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: commuNextRef.current,
              prevEl: commuPrevRef.current,
            }}
            touchStartPreventDefault={false}
            modules={[Pagination, Navigation]}
            className={styles.communitySwiper}
          >
            {communityData?.data.map((data, idx) => (
              <SwiperSlide style={{ width: '100%' }} key={idx}>
                <div
                  role="presentation"
                  className={styles.odoiCommunity}
                  //   style={{
                  //     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.35)),
                  // url(${data.imageUrl + THUMBNAIL_SIZE_OPTION})`,
                  //   }}
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.35)),
                url(${data.imageUrl})`,
                  }}
                  onClick={() => {
                    navigate(
                      `/community/${getPrefixCategoryName(
                        data.prefixCategory,
                      )}/${data.boardId}`,
                    );
                  }}
                >
                  <h1>{data.title}</h1>
                  <p>{data.oneLineContent}</p>
                  <div className={styles.commuMeta}>
                    <p>{dayjs(data.createdAt).format('YYYY-MM-DD')}</p>
                    <p>{data.nickName}님</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            type="button"
            className={styles.commuPrevBtn}
            ref={commuPrevRef}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.125 21.1L.7 12.7q-.15-.15-.213-.325T.425 12q0-.2.063-.375T.7 11.3l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L3.55 12l7.35 7.35q.35.35.35.863t-.375.887q-.375.375-.875.375t-.875-.375Z"
              />
            </svg>
          </button>
          <button
            type="button"
            className={styles.commuNextBtn}
            ref={commuNextRef}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7.15 21.1q-.375-.375-.375-.888t.375-.887L14.475 12l-7.35-7.35q-.35-.35-.35-.875t.375-.9q.375-.375.888-.375t.887.375l8.4 8.425q.15.15.213.325T17.6 12q0 .2-.063.375t-.212.325L8.9 21.125q-.35.35-.863.35T7.15 21.1Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={styles.outro}
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url(${footer}), #FFFFFF`,
        }}
      >
        <p>
          모든 가족들이 주말 만큼은 세상에 단 하나뿐인 집에서 함께할 수 있는
          그날까지
        </p>
        <h1>
          <b>주말내집</b>과 함께해요.
        </h1>
      </div>
    </motion.div>
  );
}
