import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import { GetLikeResponse } from '@/types/boardDetailType';
import notLove from '@/assets/common/notLove.svg';
import love from '@/assets/common/love.svg';
import styles from './styles.module.scss';
import userStore from '@/store/userStore';

type LikeProps = {
  boardId: number;
  loveCount: number;
  intro?: boolean;
};

export default function Like({ boardId, loveCount, intro }: LikeProps) {
  const { user } = userStore();
  const queryClient = useQueryClient();
  const { data: isLove } = useQuery<GetLikeResponse>(
    [QueryKeys.LIKE],
    () => restFetcher({ method: 'GET', path: `/loves/${boardId}` }),
    {
      enabled: !!user,
    },
  );
  const { mutate: clickLove } = useMutation(
    () => restFetcher({ method: 'PUT', path: `/loves/${boardId}` }),
    {
      onMutate: async () => {
        // 데이터에 대한 모든 퀴리요청을 취소하여 이전 서버 데이터가 낙관적 업데이트를 덮어쓰지 않도록.
        queryClient.cancelQueries([QueryKeys.LIKE]);

        // 이전 값의 snapshot
        const previousLikeData = queryClient.getQueriesData([QueryKeys.LIKE]);

        //  낙관적업데이트는 새로운 사용자 값으로 캐시를 업데이트.
        queryClient.setQueryData([QueryKeys.LIKE], {
          code: 'SUCCESS',
          message: '성공',
          data: true,
        });

        //  snapshot 값이 있는 컨텍스트 객체 반환
        return { previousLikeData };
      },
      onError: (error, newData, context) => {
        // 캐시를 저장된 값으로 롤백
        if (context?.previousLikeData) {
          queryClient.setQueryData([QueryKeys.LIKE], {
            code: 'SUCCESS',
            message: '성공',
            data: false,
          });
        }
      },
      onSettled: () => {
        // 쿼리 함수의 성공, 실패 두 경우 모두 실행.
        queryClient.refetchQueries([QueryKeys.LIKE]);
        // TODO: 이후 소개 페이지가 아닐 시 실행할 쿼리키 등록
        intro ? queryClient.refetchQueries([QueryKeys.INTRO_BOARD]) : null;
      },
    },
  );
  const { mutate: cancelLove } = useMutation(
    () => restFetcher({ method: 'DELETE', path: `/loves/${boardId}` }),
    {
      onMutate: async () => {
        // 데이터에 대한 모든 퀴리요청을 취소하여 이전 서버 데이터가 낙관적 업데이트를 덮어쓰지 않도록.
        queryClient.cancelQueries([QueryKeys.LIKE]);

        // 이전 값의 snapshot
        const previousLikeData = queryClient.getQueriesData([QueryKeys.LIKE]);

        //  낙관적업데이트는 새로운 사용자 값으로 캐시를 업데이트.
        queryClient.setQueryData([QueryKeys.LIKE], {
          code: 'SUCCESS',
          message: '성공',
          data: false,
        });

        //  snapshot 값이 있는 컨텍스트 객체 반환
        return { previousLikeData };
      },
      onError: (error, newData, context) => {
        // 캐시를 저장된 값으로 롤백
        if (context?.previousLikeData) {
          queryClient.setQueryData([QueryKeys.LIKE], {
            code: 'SUCCESS',
            message: '성공',
            data: true,
          });
        }
      },
      onSettled: () => {
        // 쿼리 함수의 성공, 실패 두 경우 모두 실행.
        queryClient.refetchQueries([QueryKeys.LIKE]);
        // TODO: 이후 소개 페이지가 아닐 시 실행할 쿼리키 등록
        intro ? queryClient.refetchQueries([QueryKeys.INTRO_BOARD]) : null;
      },
    },
  );
  const onClickButton = () => {
    if (!user) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    isLove?.data ? cancelLove() : clickLove();
  };
  return (
    <div className={styles.wrapper}>
      <img
        src={isLove?.data ? love : notLove}
        alt="like"
        onClick={onClickButton}
      />
      <p>{loveCount}</p>
    </div>
  );
}
