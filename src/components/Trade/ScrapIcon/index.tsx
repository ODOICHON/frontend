import { useMutation, useQueryClient } from '@tanstack/react-query';
import ToggleButton from '@/components/Common/ToggleButton';

import BookmarkFillIcon from '@/components/icons/BookMark/BookmarkFillIcon';
import BookmarkIcon from '@/components/icons/BookMark/BookmarkIcon';
import { QueryKeys } from '@/queryClient';
import { TradeBoardDetailType } from '@/types/Board/tradeType';
import { DeleteScrapAPI, PutScrapAPI } from '@/apis/boards';
import { ApiResponseWithDataType } from '@/types/apiResponseType';

type ScrapProps = {
  isScraped: boolean;
  boardId: string;
};

function Scrap({ isScraped, boardId }: ScrapProps) {
  const queryClient = useQueryClient();
  // react-query로 낙관적 업데이트 하기
  const { mutate } = useMutation(isScraped ? DeleteScrapAPI : PutScrapAPI, {
    onMutate: async () => {
      // 이전 값의 snapshot
      const previousScrapData = queryClient.getQueriesData<
        ApiResponseWithDataType<TradeBoardDetailType>
      >([QueryKeys.TRADE_BOARD, boardId])[0][1];

      // 새로운 값으로 업데이트
      queryClient.setQueriesData([QueryKeys.TRADE_BOARD, boardId], {
        ...previousScrapData,
        data: {
          ...previousScrapData?.data,
          isScraped: !isScraped,
        },
      });

      return { previousScrapData };
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.MY_SCRAPS],
      });
    },
    onError: (error, newData, context) => {
      // 캐시를 저장된 값으로 롤백
      queryClient.setQueriesData([QueryKeys.TRADE_BOARD, boardId], {
        ...context?.previousScrapData,
      });
    },
  });

  return (
    <div>
      <ToggleButton
        toggled={isScraped}
        onToggle={() => mutate(+boardId)}
        onIcon={<BookmarkFillIcon color="#ec6130" size="2.5rem" />}
        offIcon={<BookmarkIcon size="2.5rem" />}
      />
      <span>스크랩</span>
    </div>
  );
}

export default Scrap;
