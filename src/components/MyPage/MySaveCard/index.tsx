import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import clipImage from '@/assets/common/paperclip.svg';
import { QueryKeys, restFetcher } from '@/queryClient';
import { TradeBoardDetailType, TradeBoardType } from '@/types/Board/tradeType';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import styles from './styles.module.scss';

type MySaveCardProps = {
  saveData: TradeBoardType;
};

export default function MySaveCard({ saveData }: MySaveCardProps) {
  const navigate = useNavigate();

  const { data: detailData } = useQuery<
    ApiResponseWithDataType<TradeBoardDetailType>
  >(
    [QueryKeys.TRADE_BOARD, saveData.houseId],
    () =>
      restFetcher({
        method: 'GET',
        path: `/houses/user-scrap/${saveData.houseId}`,
      }),
    {
      staleTime: 0,
    },
  );
  const handleEditButtonClick = (data: TradeBoardDetailType | undefined) => {
    if (!data) return;
    navigate(`/trade/write`, {
      state: { data: { ...data, tmpYn: true } },
    });
  };
  return (
    <li
      role="presentation"
      className={styles.wrapper}
      onClick={() => handleEditButtonClick(detailData?.data)}
    >
      <h1 className={styles.title}>
        {saveData.title}
        <img src={clipImage} alt="클립이미지" />
      </h1>
      <p>{dayjs(saveData.createdAt).format('YYYY.MM.DD')}</p>
    </li>
  );
}
