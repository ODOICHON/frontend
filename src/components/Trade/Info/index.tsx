import dayjs from 'dayjs';
import { TradeBoardDetailType } from '@/types/Board/tradeType';
import { getHouseName, getRentalName, priceCount } from '@/utils/utils';
import styles from './styles.module.scss';

// TODO: undefined 처리하기
type TradeBoardInfoProps = {
  info: TradeBoardDetailType | undefined;
};

function TradeBoardInfo({ info }: TradeBoardInfoProps) {
  return (
    <section className={styles.infoContainer}>
      <article>
        <span>임대정보 및 판매자 정보</span>
        <div>
          유형 <p>{info?.houseType && getHouseName(info?.houseType)}</p>
        </div>
        <div>
          위치 <p>{info?.city}</p>
        </div>
        <div>
          가격{' '}
          <p>
            {info?.rentalType && getRentalName(info?.rentalType)}{' '}
            {info?.price && priceCount(info?.price)}
          </p>
        </div>
        <div>
          전화번호 <p>{info?.contact}</p>
        </div>
      </article>
      <article>
        <span>기본정보</span>
        <div>
          면적{' '}
          <p>
            {info?.size}㎡
            {info?.size &&
              `(약 ${parseFloat((Number(info?.size) / 3.3).toFixed(1))}평)`}
          </p>
        </div>
        <div>
          준공연도 <p>{dayjs(info?.createdDate).format('YYYY')}년</p>
        </div>
        <div>
          용도 <p>{info?.purpose}</p>
        </div>
      </article>
    </section>
  );
}

export default TradeBoardInfo;
