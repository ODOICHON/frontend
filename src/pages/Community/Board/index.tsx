import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import CommunityBoard from '@/components/Community/Board';
import Pagenation from '@/components/Pagenation';
import useInput from '@/hooks/useInput';
import {
  freeCategory,
  advertiseCategory,
  freeBoardData,
  advertiseBoardData,
} from '@/constants/category';
import { COMMUNITY_BOARD } from '@/constants/community_dummy';
import styles from './styles.module.scss';

export default function CommunityBoardPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const CATEGORY_DATA =
    category === 'free_board' ? freeCategory : advertiseCategory;
  const DESCRIPTION_DATA =
    category === 'free_board' ? freeBoardData : advertiseBoardData;

  const [focusedCategory, setFocusedCategory] = useState('DEFAULT');
  const [focusedFilter, setFocusedFilter] = useState('NEW');
  const [search, handleSearch, setSearch] = useInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch('');
  };

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
        <button
          className={styles.writeButton}
          type="button"
          onClick={() => {
            navigate(`/community/write/${category.split('_')[0]}`);
          }}
        >
          글쓰기
        </button>
        <Pagenation totalPage={COMMUNITY_BOARD.data.totalPages} />
      </section>
    </div>
  );
}
