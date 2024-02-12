import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import love from '@/assets/common/love.svg';
import notLove from '@/assets/common/notLove.svg';
import ModalPortal from '@/components/Common/ModalPortal';
import ToastMessageModal from '@/components/Common/ToastMessageModal';
import { QueryKeys, restFetcher } from '@/queryClient';
import { CommunityBoardDetailType } from '@/types/Board/communityType';
import { IntroBoardDetailType } from '@/types/Board/introType';
import userStore from '@/store/userStore';
import useModalState from '@/hooks/useModalState';
import useToastMessageType from '@/hooks/useToastMessageType';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import styles from './styles.module.scss';

type LikeProps = {
  boardId: number;
  loveCount: number;
  intro?: boolean;
};

export default function Like({ boardId, loveCount, intro }: LikeProps) {
  const { user } = userStore();
  const navigate = useNavigate();
  const { modalState, handleModalOpen, handleModalClose } = useModalState();
  const { toastMessageProps, handleToastMessageProps } = useToastMessageType();
  const queryClient = useQueryClient();
  const { data: isLove } = useQuery<ApiResponseWithDataType<boolean>>(
    [QueryKeys.LIKE, boardId],
    () => restFetcher({ method: 'GET', path: `/loves/${boardId}` }),
    { enabled: !!user },
  );
  const { mutate: clickLove } = useMutation(
    () =>
      restFetcher({
        method: isLove?.data ? 'DELETE' : 'PUT',
        path: `/loves/${boardId}`,
      }),
    {
      onMutate: async () => {
        // 데이터에 대한 모든 퀴리요청을 취소하여 이전 서버 데이터가 낙관적 업데이트를 덮어쓰지 않도록.
        queryClient.cancelQueries([QueryKeys.LIKE]);

        // 이전 값의 snapshot
        const previousLikeData = queryClient.getQueriesData<
          ApiResponseWithDataType<boolean>
        >([QueryKeys.LIKE, boardId])[0][1];

        const previousBoardData = queryClient.getQueriesData<
          ApiResponseWithDataType<
            IntroBoardDetailType | CommunityBoardDetailType
          >
        >([
          intro ? QueryKeys.INTRO_BOARD : QueryKeys.COMMUNITY_BOARD,
          `${boardId}`,
        ])[0][1];

        //  낙관적업데이트는 새로운 사용자 값으로 캐시를 업데이트.
        queryClient.setQueryData([QueryKeys.LIKE, boardId], {
          ...previousLikeData,
          data: !previousLikeData?.data,
        });

        queryClient.setQueryData(
          [
            intro ? QueryKeys.INTRO_BOARD : QueryKeys.COMMUNITY_BOARD,
            `${boardId}`,
          ],
          {
            ...previousBoardData,
            data: {
              ...previousBoardData?.data,
              loveCount: previousLikeData?.data
                ? previousBoardData!.data.loveCount - 1
                : previousBoardData!.data.loveCount + 1,
            },
          },
        );
        //  snapshot 값이 있는 컨텍스트 객체 반환
        return { previousLikeData, previousBoardData };
      },
      onError: (error, newData, context) => {
        // 캐시를 저장된 값으로 롤백
        queryClient.setQueryData([QueryKeys.LIKE, boardId], {
          ...context?.previousLikeData,
        });

        queryClient.setQueryData(
          [intro ? QueryKeys.INTRO_BOARD : QueryKeys.COMMUNITY_BOARD, boardId],
          {
            ...context?.previousBoardData,
          },
        );
      },
    },
  );
  const onClickButton = () => {
    if (!user) {
      handleToastMessageProps('LOGIN_REQUIRED_ERROR', handleModalClose, () =>
        navigate('/login'),
      );
      handleModalOpen();
      return;
    }
    clickLove();
  };
  return (
    <div className={styles.wrapper}>
      <img
        role="presentation"
        src={isLove?.data ? love : notLove}
        alt="like"
        onClick={onClickButton}
      />
      <p>{loveCount}</p>
      {modalState && toastMessageProps && (
        <ModalPortal>
          <ToastMessageModal {...toastMessageProps} />
        </ModalPortal>
      )}
    </div>
  );
}
