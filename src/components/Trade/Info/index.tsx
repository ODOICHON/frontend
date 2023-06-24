import dayjs from 'dayjs';
import { TradeBoardDetailData } from '@/types/Board/Trade/boardDetailType';
import { getRentalName } from '@/utils/utils';
import styles from './styles.module.scss';

// TODO: undefined 처리하기
type TradeBoardInfoProps = {
  info: TradeBoardDetailData | undefined;
};

function TradeBoardInfo({ info }: TradeBoardInfoProps) {
  return (
    <section className={styles.infoContainer}>
      <article>
        <span>기본정보</span>
        <div>
          위치 <p>{info?.city}</p>
        </div>
        <div>
          면적{' '}
          <p>
            {info?.size}m<sup>2</sup>
          </p>
        </div>
        <div>
          용도 <p>{info?.purpose}</p>
        </div>
        <div>
          준공연도 <p>{dayjs(info?.createdDate).format('YYYY.MM.DD')}</p>
        </div>
        <div>
          층수{' '}
          <p>
            {info?.floorNum}층/{info?.sumFloor}층
          </p>
        </div>
      </article>
      <article>
        <span>임대정보 및 판매자 정보</span>
        <div>
          가격{' '}
          <p>
            {getRentalName(info?.rentalType || '')} {info?.price}만원
          </p>
        </div>
        <div>
          전화번호 <p>{info?.contact}</p>
        </div>
        <div>
          공인중개사명 <p>{info?.agentName}</p>
        </div>
      </article>
    </section>
  );
}

export default TradeBoardInfo;
