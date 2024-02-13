import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Common/Loading';
import NoPosts from '@/components/Common/NoPosts';
import Pagination from '@/components/Common/Pagination';
import MySaveCard from '@/components/MyPage/MySaveCard';
import { QueryKeys, restFetcher } from '@/queryClient';
import { BoardPageType } from '@/types/Board/boardType';
import { TradeBoardType } from '@/types/Board/tradeType';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import styles from './styles.module.scss';

export default function MySavesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMySaves = (page: number) => {
    const params = {
      page: page - 1,
    };
    return restFetcher({ method: 'GET', path: 'houses/tmp-save', params });
  };
  const { data: mySavesData, isLoading } = useQuery<
    ApiResponseWithDataType<BoardPageType<TradeBoardType>>
  >([QueryKeys.MY_SAVES, currentPage], () => fetchMySaves(currentPage));

  return (
    <section className={styles.container}>
      <article className={styles.titleWrapper}>
        <h1>임시저장</h1>
        <p>임시저장 해놓은 글을 확인할 수 있어요.</p>
      </article>
      <article className={styles.resultWrapper}>
        <h3>총 {mySavesData?.data.totalElements}개</h3>
        <ul className={styles.cardWrapper}>
          {isLoading && <Loading />}
          {mySavesData &&
            (mySavesData?.data.content.length > 0 ? (
              mySavesData?.data.content.map((data) => (
                <MySaveCard key={data.houseId} saveData={data} />
              ))
            ) : (
              <NoPosts text="임시저장 중인 글이 없어요." />
            ))}
        </ul>
        {mySavesData && mySavesData.data.content.length > 0 && (
          <Pagination
            totalPage={mySavesData.data.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </article>
    </section>
  );
}
