import { useEffect, useState } from 'react';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Loading from '@/components/Common/Loading';
import NoPosts from '@/components/Common/NoPosts';
import Pagination from '@/components/Common/Pagination';
import CommunityBoard from '@/components/Community/Board';
import { restFetcher, QueryKeys } from '@/queryClient';
import { CommunityBoardPageType } from '@/types/Board/communityType';
import userStore from '@/store/userStore';
import useInput from '@/hooks/useInput';
import { checkTextString } from '@/utils/utils';
import { ApiResponseWithDataType } from '@/types/apiResponseType';
import {
  freeCategory,
  advertiseCategory,
  freeBoardData,
  advertiseBoardData,
} from '@/constants/category';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function CommunityBoardPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { token } = userStore();
  const { state } = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [focusedCategory, setFocusedCategory] = useState('ALL');
  const [focusedFilter, setFocusedFilter] = useState(
    state?.location === '/mypage/home' ? 'POPULAR' : 'RECENT',
  );
  const [search, handleSearch, setSearch] = useInput('');

  const queryClient = useQueryClient();

  const CATEGORY_DATA =
    category === 'free_board' ? freeCategory : advertiseCategory;
  const DESCRIPTION_DATA =
    category === 'free_board' ? freeBoardData : advertiseBoardData;

  const fetchBoardList = (page: number) => {
    const params = {
      prefix: category === 'free_board' ? 'DEFAULT' : 'ADVERTISEMENT',
      ...(focusedCategory !== 'ALL' && { category: focusedCategory }),
      ...(search && { search }),
      order: focusedFilter,
      page: page - 1,
    };
    return restFetcher({ method: 'GET', path: 'boards', params });
  };

  const {
    data: boardListData,
    refetch,
    isLoading,
  } = useQuery<ApiResponseWithDataType<CommunityBoardPageType>>(
    [
      QueryKeys.COMMUNITY_BOARD,
      category,
      focusedCategory,
      focusedFilter,
      currentPage,
    ],
    () => fetchBoardList(currentPage),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (checkTextString(search)) {
      alert(`${search}는 검색어로 사용할 수 없습니다.`);
    } else {
      refetch();
      setSearch('');
      setCurrentPage(1);
    }
  };

  // 게시판 이동시 카테고리 초기화
  useEffect(() => {
    setFocusedCategory('ALL');
  }, [category]);

  // 현재 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [category, focusedCategory, focusedFilter]);

  // 게시글 페이지 데이터 API 재요청
  useEffect(() => {
    refetch();
  }, [category, focusedCategory, focusedFilter, currentPage]);
  // 게시글 다음 페이지 데이터 프리페칭
  useEffect(() => {
    if (boardListData && currentPage < boardListData.data.totalPages) {
      queryClient.prefetchQuery(
        [
          QueryKeys.COMMUNITY_BOARD,
          category,
          focusedCategory,
          focusedFilter,
          currentPage + 1,
        ],
        () => fetchBoardList(currentPage + 1),
      );
    }
  }, [currentPage, boardListData]);

  if (category !== 'free_board' && category !== 'advertisement_board')
    return <Navigate to="/community" />;
  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
      <section className={styles.titleContainer}>
        <div className={styles.title}>
          <h1>{DESCRIPTION_DATA.title}</h1>
          <p>{DESCRIPTION_DATA.description}</p>
        </div>
      </section>
      <section className={styles.contentWrapper}>
        <ul className={styles.categoryWrapper}>
          {CATEGORY_DATA.map((menu) => (
            <li
              className={
                focusedCategory === menu.name
                  ? styles.focusCategory
                  : styles.category
              }
              role="presentation"
              key={menu.name}
              onClick={() => setFocusedCategory(menu.name)}
            >
              {menu.code}
            </li>
          ))}
        </ul>
        <div className={styles.optionWrapper}>
          <ul>
            <li
              role="presentation"
              className={
                focusedFilter === 'RECENT' ? styles.focused : styles.notFocused
              }
              onClick={() => setFocusedFilter('RECENT')}
            >
              최신순
            </li>
            <div className={styles.divider} />
            <li
              role="presentation"
              className={
                focusedFilter === 'POPULAR' ? styles.focused : styles.notFocused
              }
              onClick={() => setFocusedFilter('POPULAR')}
            >
              인기순
            </li>
          </ul>
          <form className={styles.searchWrapper} onSubmit={handleSubmit}>
            <input
              value={search}
              onChange={handleSearch}
              type="text"
              placeholder="검색어를 입력해주세요."
            />
            <button type="submit">검색</button>
          </form>
        </div>
        <div className={styles.line} />
        <ul>
          {isLoading && <Loading />}
          {boardListData && boardListData.data.content.length > 0 ? (
            boardListData?.data.content.map((content) => (
              <CommunityBoard
                key={content.boardId}
                boardId={content.boardId}
                category={content.category}
                prefixCategory={content.prefixCategory}
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
              subText={
                category === 'free_board'
                  ? '글을 작성해서 자유롭게 오도이촌 이야기를 해보아요!'
                  : '오도이촌에 필요한 업체를 소개해보세요. '
              }
            />
          )}
        </ul>
        <button
          className={styles.writeButton}
          type="button"
          onClick={() => {
            token
              ? navigate(`/community/write/${category}`)
              : navigate('/login');
          }}
        >
          글쓰기
        </button>
        {boardListData && boardListData.data.content.length > 0 && (
          <Pagination
            totalPage={boardListData.data.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </section>
    </motion.div>
  );
}
