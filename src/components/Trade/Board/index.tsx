import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { RentalType, TradeBoardType } from '@/types/Board/tradeType';
import { convertRentalTypeName, getHouseName, priceCount } from '@/utils/utils';
import styles from './styles.module.scss';

type TradeBoardProps = Omit<TradeBoardType, 'recommendedTag'>;

export default function TradeBoard({
  houseId,
  houseType,
  rentalType,
  city,
  price,
  monthlyPrice,
  isCompleted,
  nickName,
  createdAt,
  imageUrl,
  title,
  recommendedTagName,
}: TradeBoardProps) {
  const navigate = useNavigate();

  const [visibleTags, setVisibleTags] = useState<string[]>(recommendedTagName);
  const [hiddenTags, setHiddenTags] = useState<string[]>([]);
  const ulRef = useRef<HTMLUListElement>(null);

  const checkAndManageTags = () => {
    if (ulRef.current) {
      const containerWidth = ulRef.current.offsetWidth;

      let totalWidth = 0;
      const newVisibleTags: string[] = [];
      const newHiddenTags: string[] = [];

      recommendedTagName.forEach((tag) => {
        const tagWidth = tag.length * 12; // 대략적인 글자 폭
        if (totalWidth + tagWidth <= containerWidth) {
          newVisibleTags.push(tag);
          totalWidth += tagWidth;
        } else {
          newHiddenTags.push(tag);
        }
      });

      setVisibleTags(newVisibleTags);
      setHiddenTags(newHiddenTags);
    }
  };

  const rentalStyle = (type: RentalType) => {
    if (type === 'SALE') return styles.saleType;
    if (type === 'JEONSE') return styles.jeonseType;
    if (type === 'MONTHLYRENT') return styles.monthlyRentType;
  };

  useEffect(() => {
    checkAndManageTags();
    const handleResize = () => {
      checkAndManageTags();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ulRef.current]);

  return (
    <article
      role="presentation"
      className={styles.wrapper}
      onClick={() => navigate(`/trade/trade_board/${houseId}`)}
    >
      <div
        className={isCompleted ? styles.completedThumbnail : styles.thumbnail}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, ${
            isCompleted ? '0.6' : '0.35'
          }), rgba(0, 0, 0, ${isCompleted ? '0.6' : '0.35'})),
      url('${imageUrl}')`,
        }}
      >
        {isCompleted && (
          <h1>
            해당 매물은
            <br />
            거래가 완료되었습니다.
          </h1>
        )}
        {!isCompleted && (
          <div className={rentalStyle(rentalType)}>
            {convertRentalTypeName(rentalType)}
          </div>
        )}
      </div>
      <div className={styles.contentsWrapper}>
        <h1>
          [{getHouseName(houseType)}] {title}
        </h1>
        <p>
          <strong>위치</strong> : {city}
        </p>
        <p>
          <strong>가격</strong> :{' '}
          {convertRentalTypeName(rentalType) === '월세'
            ? `보증금 ${priceCount(price)} / 월세 ${priceCount(monthlyPrice)}`
            : `${convertRentalTypeName(rentalType)} ${priceCount(price)}`}
        </p>
        <ul ref={ulRef} className={styles.tagWrapper}>
          {visibleTags.map((tag, index) => (
            <li className={styles.tag} key={index}>
              {tag}
            </li>
          ))}
          {hiddenTags.length > 0 && <li className={styles.tag}>...</li>}
        </ul>
        <div className={styles.line} />
      </div>
      <div className={styles.desc}>
        <p>{nickName}</p>
        <p>{dayjs(createdAt).format('YYYY.MM.DD')}</p>
      </div>
    </article>
  );
}
