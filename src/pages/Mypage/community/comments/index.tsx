import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Common/Loading';
import NoPosts from '@/components/Common/NoPosts';
import Pagination from '@/components/Common/Pagination';
import CommunityBoard from '@/components/Community/Board';
import MyCommentCard from '@/components/MyPage/MyCommentCard';
import { QueryKeys, restFetcher } from '@/queryClient';
import {
  CommunityBoardPageType,
  MyCommentPageType,
} from '@/types/Board/communityType';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import styles from './styles.module.scss';

export default function MyCommentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const fetchBoardList = (page: number) => {
    const params = {
      page: page - 1,
    };
    return restFetcher({ method: 'GET', path: 'boards/my/comment', params });
  };

  const { data: commentsData, isLoading } = useQuery<
    ApiResponseWithDataType<MyCommentPageType>
  >([QueryKeys.COMMUNITY_BOARD, QueryKeys.MY_COMMENTS, currentPage], () =>
    fetchBoardList(currentPage),
  );

  return (
    <section className={styles.container}>
      <article className={styles.titleWrapper}>
        <h1>내가 댓글 글</h1>
        <p>내가 남긴 댓글을 확인할 수 있어요.</p>
      </article>
      <article className={styles.countWrapper}>
        <div className={styles.count}>
          총 {commentsData?.data.totalElements}
        </div>
        <div className={styles.divider} />
      </article>
      <ul>
        {isLoading && <Loading />}
        {commentsData && commentsData.data.content.length > 0 ? (
          commentsData?.data.content.map((content) => (
            <MyCommentCard
              key={content.commentContent}
              boardId={content.boardId}
              title={content.title}
              commentContent={content.commentContent}
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
        {commentsData && commentsData.data.content.length > 0 && (
          <Pagination
            totalPage={commentsData.data.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}
