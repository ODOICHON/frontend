import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CommunityBoard from '@/components/Community/Board';
import { restFetcher, QueryKeys } from '@/queryClient';
import Pagenation from '@/components/Pagenation';
import useInput from '@/hooks/useInput';
import { BoardData, BoardResponse } from '@/types/boardType';
import {
  freeCategory,
  advertiseCategory,
  freeBoardData,
  advertiseBoardData,
} from '@/constants/category';
import styles from './styles.module.scss';

export default function CommunityBoardPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const CATEGORY_DATA =
    category === 'free_board' ? freeCategory : advertiseCategory;
  const DESCRIPTION_DATA =
    category === 'free_board' ? freeBoardData : advertiseBoardData;

  const [categoryData, setCategoryData] = useState<BoardData | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [focusedCategory, setFocusedCategory] = useState('ALL');
  const [focusedFilter, setFocusedFilter] = useState('RECENT');
  const [search, handleSearch, setSearch] = useInput('');

  const { data: _, refetch } = useQuery<BoardResponse>(
    [QueryKeys.BOARD, category],
    () => {
      const params = {
        prefix: category === 'free_board' ? 'DEFAULT' : 'ADVERTISEMENT',
        ...(focusedCategory !== 'ALL' && { category: focusedCategory }),
        ...(search && { search }),
        order: focusedFilter,
        page: currentPage - 1,
      };
      return restFetcher({ method: 'GET', path: 'boards', params });
    },
    {
      onSuccess: (res) => {
        setCategoryData(res.data);
      },
    },
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
    setSearch('');
  };

  useEffect(() => {
    refetch();
  }, [category, focusedCategory, focusedFilter, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, focusedCategory, focusedFilter, search]);

  if (category !== 'free_board' && category !== 'advertisement_board')
    return <Navigate to="/community" />;
  return (
    <div className={styles.container}>
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
          {categoryData?.content.map((content) => (
            <CommunityBoard
              key={content.boardId}
              category={content.category}
              title={content.title}
              oneLineContent={content.oneLineContent}
              imageUrl={content.imageUrl}
              commentCount={content.commentCount}
              nickName={content.nickName}
              createdAt={content.createdAt}
              fixed={content.fixed}
            />
          ))}
        </ul>
        <button
          className={styles.writeButton}
          type="button"
          onClick={() => {
            navigate(`/community/write/${category.split('_')[0]}`);
          }}
        >
          글쓰기
        </button>
        {categoryData && categoryData.content.length > 0 && (
          <Pagenation
            totalPage={categoryData.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </section>
    </div>
  );
}
