// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './styles.module.scss';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { jumbotronData } from '@/constants/jumbotron';
import pin from '@/assets/common/map-pin.svg';

export default function MainPage() {
  return (
    <div className={styles.container}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
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
            <h1>{data.title}</h1>
            <p>{data.content}</p>
            <div className={styles.address}>
              <img src={pin} alt="map-pin" />
              <p>{data.address}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
