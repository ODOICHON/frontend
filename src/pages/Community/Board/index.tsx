import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import nextArrow from '@/assets/common/nextArrow.svg';
import prevArrow from '@/assets/common/prevArrow.svg';
import CommunityBoard from '@/components/Community/Board';
import useInput from '@/hooks/useInput';
import {
  freeCategory,
  advertiseCategory,
  freeBoardData,
  advertiseBoardData,
} from '@/constants/category';
import { COMMUNITY_BOARD } from '@/constants/community_dummy';
import styles from './styles.module.scss';

const MAX_PAGE_NUM = 7;
const MIN_PAGE_NUM = 1;

export default function CommunityBoardPage() {
  const { category } = useParams();
  const CATEGORY_DATA =
    category === 'free_board' ? freeCategory : advertiseCategory;
  const DESCRIPTION_DATA =
    category === 'free_board' ? freeBoardData : advertiseBoardData;

  const [focusedCategory, setFocusedCategory] = useState('DEFAULT');
  const [focusedFilter, setFocusedFilter] = useState('NEW');
  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, handleSearch, setSearch] = useInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch('');
  };

  const handleCurrentPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = e.currentTarget.id;
    if (buttonId === 'prevPage') {
      if (currentPage === MIN_PAGE_NUM) return;
      setCurrentPage((prev) => prev - 1);
    }
    if (buttonId === 'nextPage') {
      if (currentPage === MAX_PAGE_NUM) return;
      setCurrentPage((prev) => prev + 1);
      return null;
    }
  };

  // FIXME: 페이지네이션 API 연결 전 TotalPage를 설정하기 위한 임시코드. API 연결 후 코드 삭제
  useEffect(() => {
    setTotalPage(Array.from({ length: MAX_PAGE_NUM }, (_, index) => index + 1));
  }, []);

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
                focusedFilter === 'NEW' ? styles.focused : styles.notFocused
              }
              onClick={() => setFocusedFilter('NEW')}
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
          {COMMUNITY_BOARD.data.content.map((content) => (
            <CommunityBoard
              key={content.boardId}
              category={content.category}
              title={content.title}
              oneLineContent={content.oneLineContent}
              imageUrl={content.imageUrl}
              commentCount={content.commentCount}
              nickName={content.nickName}
              createdAt={content.createdAt}
            />
          ))}
        </ul>
        <button className={styles.writeButton} type="button">
          글쓰기
        </button>
        <div className={styles.pagenation}>
          <button
            className={styles.pageButton}
            type="button"
            onClick={handleCurrentPage}
          >
            <img src={prevArrow} alt="prevPageButton" />
          </button>
          {totalPage?.map((page, index) => (
            <button
              id="prevPage"
              type="button"
              className={
                page === currentPage
                  ? styles.focusedPageButton
                  : styles.pageButton
              }
              key={index}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            id="nextPage"
            className={styles.pageButton}
            type="button"
            onClick={handleCurrentPage}
          >
            <img src={nextArrow} alt="nextPageButton" />
          </button>
        </div>
      </section>
    </div>
  );
}
