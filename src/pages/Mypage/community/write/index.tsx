import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Common/Loading';
import NoPosts from '@/components/Common/NoPosts';
import Pagination from '@/components/Common/Pagination';
import CommunityBoard from '@/components/Community/Board';
import { QueryKeys, restFetcher } from '@/queryClient';
import { CommunityBoardPageType } from '@/types/Board/communityType';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import styles from './styles.module.scss';

export default function MyWritePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const fetchBoardList = (page: number) => {
    const params = {
      page: page - 1,
    };
    return restFetcher({ method: 'GET', path: 'boards/my', params });
  };

  const { data: boardListData, isLoading } = useQuery<
    ApiResponseWithDataType<CommunityBoardPageType>
  >([QueryKeys.COMMUNITY_BOARD, QueryKeys.MY_HOUSES, currentPage], () =>
    fetchBoardList(currentPage),
  );

  return (
    <section className={styles.container}>
      <article className={styles.titleWrapper}>
        <h1>내가 쓴 글</h1>
        <p>내가 남긴 글을 확인할 수 있어요.</p>
      </article>
      <article className={styles.countWrapper}>
        <div className={styles.count}>
          총 {boardListData?.data.totalElements}
        </div>
        <div className={styles.divider} />
      </article>
      <ul>
        {isLoading && <Loading />}
        {boardListData && boardListData.data.content.length > 0 ? (
          boardListData?.data.content.map((content) => (
            <CommunityBoard
              key={content.boardId}
              boardId={content.boardId}
              category={content.category}
              prefixCategory={content.category || ''}
              title={content.title}
              oneLineContent={content.oneLineContent}
              imageUrl={content.imageUrl}
              commentCount={content.commentCount}
              nickName={content.nickName}
              createdAt={content.createdAt}
              fixed={content.fixed}
            />
          ))
        ) : (
          <NoPosts
            text="아직은 글이 없어요."
            subText="글을 작성해서 자유롭게 오도이촌 이야기를 해보아요!"
          />
        )}
      </ul>
      <div className={styles.paginationWrapper}>
        {boardListData && boardListData.data.content.length > 0 && (
          <Pagination
            totalPage={boardListData.data.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}
