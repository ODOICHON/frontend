import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './styles.module.scss';
import { Autoplay, Pagination, Navigation } from 'swiper';
import {
  communityData,
  jumbotronData,
  odoiIntroData,
} from '@/constants/main_dummy';
import pin from '@/assets/common/map-pin.svg';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { opacityVariants } from '@/constants/variants';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import userStore from '@/store/userStore';
import { GetUserData } from '@/types/userType';

export default function MainPage() {
  const { setUser } = userStore();
  const {} = useQuery<GetUserData>(
    [QueryKeys.USER],
    () => restFetcher({ method: 'GET', path: '/users' }),
    {
      onSuccess: (res) => {
        setUser(res.data);
      },
    },
  );
  const [_, updateState] = useState(false);
  const introNextRef = useRef<HTMLButtonElement>(null);
  const introPrevRef = useRef<HTMLButtonElement>(null);
  const commuNextRef = useRef<HTMLButtonElement>(null);
  const commuPrevRef = useRef<HTMLButtonElement>(null);
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
        centeredSlides={true}
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
            <h1 dangerouslySetInnerHTML={{ __html: data.title }}></h1>
            <p>{data.content}</p>
            <div className={styles.address}>
              <img src={pin} alt="map-pin" />
              <p>{data.address}</p>
            </div>
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
            <button>트랜드</button>
            <button className={styles.button_disabled}>후기</button>
          </div>
          <div className={styles.odoiIntro_bottom}>
            <Link to="#">더 알아보기</Link>
            <div className={styles.slideButton}>
              <button ref={introPrevRef}>
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
              <button ref={introNextRef}>
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
          slidesPerView={2}
          navigation={{
            nextEl: introNextRef.current,
            prevEl: introPrevRef.current,
          }}
          breakpoints={{
            768: {
              slidesPerView: 1,
            },
            1200: {
              slidesPerView: 2,
            },
          }}
          modules={[Navigation]}
          className={styles.sectionSwiper}
        >
          {odoiIntroData.map((data, idx) => (
            <SwiperSlide key={idx}>
              <div className={styles.odoiTrend}>
                <div className={styles.odoiTrend_text}>
                  <h1>{data.category}</h1>
                  <div>
                    <h3>{data.title}</h3>
                    <p>{data.content}</p>
                  </div>
                </div>
                <img className={styles.odoiTrend_image} src={data.image} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
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
          modules={[Pagination, Navigation]}
          className={styles.communitySwiper}
        >
          {communityData.map((data, idx) => (
            <SwiperSlide style={{ width: '100%' }} key={idx}>
              <div
                className={styles.odoiCommunity}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.35)),
                url(${data.imageUrl})`,
                }}
              >
                <h1>{data.title}</h1>
                <p>{data.content}</p>
                <div className={styles.commuMeta}>
                  <p>{dayjs(data.date).format('YYYY-MM-DD')}</p>
                  <p>{data.author}님</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className={styles.commuPrevBtn} ref={commuPrevRef}>
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
        <button className={styles.commuNextBtn} ref={commuNextRef}>
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
      <Footer />
    </motion.div>
  );
}
