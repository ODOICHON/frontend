import { StaticMap } from 'react-kakao-maps-sdk';

function KakaoMapImage() {
  return (
    <StaticMap // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        maxWidth: '44.5rem',
        height: '44.5rem',
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
