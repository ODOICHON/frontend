import { StaticMap } from 'react-kakao-maps-sdk';
import styles from './styles.module.scss';

// type KakaoMapImageProps = {
//   position: { lat: number; lng: number };
// };

function KakaoMapImage() {
  // 카카오 api를 이용하여 주소를 좌표로 변환

  return (
    <StaticMap // 지도를 표시할 Container
      className={styles.KakaoMapImage}
      center={{ lat: 33.450701, lng: 126.570667 }}
      marker={{ position: { lat: 33.450701, lng: 126.570667 } }} // 마커가 표시될 위치
      level={3} // 지도의 확대 레벨
    />
  );
}

export default KakaoMapImage;
