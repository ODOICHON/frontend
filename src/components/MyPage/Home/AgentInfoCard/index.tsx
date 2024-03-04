import { useQuery } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import { BoardPageType } from '@/types/Board/boardType';
import {
  TradeBoardPageWithCountType,
  TradeBoardType,
} from '@/types/Board/tradeType';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import MyHomeCard from '../../MyHomeCard';
import styles from '../styles.module.scss';

export default function AgentInfoCard() {
  const { data: myTradeHouseListData } = useQuery<
    ApiResponseWithDataType<TradeBoardPageWithCountType>
  >([QueryKeys.MY_TRADE, QueryKeys.TRADE_BOARD], () =>
    restFetcher({
      method: 'GET',
      path: 'houses/agent',
      params: { page: 0 },
    }),
  );

  const { data: mySavesData } = useQuery<
    ApiResponseWithDataType<BoardPageType<TradeBoardType>>
  >([QueryKeys.MY_SAVES, 0], () =>
    restFetcher({
      method: 'GET',
      path: 'houses/tmp-save',
      params: { page: 0 },
    }),
  );

  return (
    <ul className={styles.cardWrapper}>
      <MyHomeCard
        key="내 전체 매물"
        title="내 전체 매물"
        count={myTradeHouseListData?.data.count.all || 0}
      />
      <MyHomeCard
        key="거래 중 매물"
        title="거래 중 매물"
        count={myTradeHouseListData?.data.count.ongoing || 0}
      />
      <MyHomeCard
        key="임시저장"
        title="임시저장"
        count={mySavesData?.data.totalElements || 0}
      />
    </ul>
  );
}
