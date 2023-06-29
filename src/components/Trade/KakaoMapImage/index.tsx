import React, { useEffect, useState } from 'react';
import { StaticMap } from 'react-kakao-maps-sdk';
import { getLatLng } from '@/utils/utils';
import styles from './styles.module.scss';

type KakaoMapImageProps = {
  address: string;
};

function KakaoMapImage({ address }: KakaoMapImageProps) {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    getLatLng(address).then((res) => {
      setPosition(res);
    });
  }, [address]);

  return (
    <section className={styles.kakaoMapImage}>
      <StaticMap // 지도를 표시할 Container
        style={{ width: '100%', height: '100%' }}
        center={position}
        marker={{ position }} // 마커가 표시될 위치
        level={3} // 지도의 확대 레벨
      />
    </section>
  );
}

export default React.memo(KakaoMapImage);
