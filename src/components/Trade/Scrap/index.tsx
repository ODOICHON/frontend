import React from 'react';
import { BsBookmark } from 'react-icons/bs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/queryClient';
import { DeleteScrapAPI, PutScrapAPI } from '@/apis/boards';

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
      const previousLikeData = queryClient.getQueriesData([
        QueryKeys.TRADE_BOARD,
        boardId,
      ]);

      // 새로운 값으로 업데이트
      queryClient.setQueriesData(
        [QueryKeys.TRADE_BOARD, boardId],
        (old: any) => ({
          ...old,
          data: {
            ...old.data,
            isScraped: !isScraped,
          },
        }),
      );
    },
  });

  return (
    <div>
      <BsBookmark
        style={{
          cursor: 'pointer',
          color: isScraped ? '#ec6130' : '',
        }}
        onClick={() => mutate(+boardId)}
      />
      <span>스크랩</span>
    </div>
  );
}

export default Scrap;
