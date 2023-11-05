import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Common/Loading';
import NoPosts from '@/components/Common/NoPosts';
import Pagination from '@/components/Common/Pagination';
import DealStateModal from '@/components/MyPage/DealStateModal';
import MyTradeCard from '@/components/MyPage/MyTradeCard';
import { QueryKeys, restFetcher } from '@/queryClient';
import { BoardPageType } from '@/types/Board/boardType';
import { Count, MyTradeHouseType } from '@/types/Board/tradeType';
import useInput from '@/hooks/useInput';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import styles from './styles.module.scss';

export default function MyselfPage() {
  const [search, handleSearch, setSearch] = useInput('');

  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [clickedHouseId, setClickedHouseId] = useState(0);

  const fetchMyHouseList = (page: number) => {
    const params = {
      ...(search && { keyword: search }),
      page: page - 1,
    };
    return restFetcher({ method: 'GET', path: 'houses/my', params });
  };

  const {
    data: myHouseData,
    refetch,
    isLoading,
  } = useQuery<
    ApiResponseWithDataType<BoardPageType<MyTradeHouseType> & { count: Count }>
  >([QueryKeys.MY_HOUSES, currentPage], () => fetchMyHouseList(currentPage));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
    setCurrentPage(1);
    setSearch('');
  };
  return (
    <section className={styles.container}>
      {modal && (
        <DealStateModal clickedHouseId={clickedHouseId} setModal={setModal} />
      )}
      <article className={styles.titleWrapper}>
        <h1>내 매물 관리</h1>
        <p>내가 거래하고 있는 매물들을 관리할 수 있어요.</p>
      </article>
      <article className={styles.countBoxWrapper}>
        <div>
          <p>승인 중인 매물</p>
          <strong>{myHouseData?.data.count.applying}</strong>
        </div>
        <div>
          <p>판매 중인 매물</p>
          <strong>{myHouseData?.data.count.ongoing}</strong>
        </div>
        <div>
          <p>판매완료된 매물</p>
          <strong>{myHouseData?.data.count.completed}</strong>
        </div>
      </article>
      <article>
        <form className={styles.searchWrapper} onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="검색어를 입력해주세요."
          />
          <button type="submit">검색</button>
        </form>
        <table className={styles.resultWrapper}>
          <thead>
            <tr>
              <th>매물형태</th>
              <th>사진</th>
              <th>매물명</th>
              <th>위치</th>
              <th>판매상태</th>
            </tr>
          </thead>
          <tbody className={styles.resultContent}>
            {isLoading && (
              <tr style={{ backgroundColor: '#f8fafb' }}>
                <td colSpan={5}>
                  <Loading />
                </td>
              </tr>
            )}
            {myHouseData && myHouseData?.data.content.length > 0 ? (
              myHouseData?.data.content.map((item, index) => (
                <MyTradeCard
                  key={index}
                  tradeItem={item}
                  onClickButton={() => {
                    setClickedHouseId(item.houseId);
                    setModal(true);
                  }}
                />
              ))
            ) : (
              <tr style={{ backgroundColor: '#f8fafb' }}>
                <td colSpan={5}>
                  <NoPosts text="관리 중인 매물이 없어요." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {myHouseData && myHouseData.data.content.length > 0 && (
          <Pagination
            totalPage={myHouseData.data.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </article>
    </section>
  );
}
