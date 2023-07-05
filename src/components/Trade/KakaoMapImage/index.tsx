import { StaticMap } from 'react-kakao-maps-sdk';
import styles from './styles.module.scss';

function KakaoMapImage() {
  return (
    <StaticMap // 지도를 표시할 Container
      className={styles.kakaoMapImage}
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      marker={{
        position: {
          // 마커의 위치
          lat: 33.450701,
          lng: 126.570667,
        },
      }}
      level={3} // 지도의 확대 레벨
    />
  );
}

export default KakaoMapImage;
