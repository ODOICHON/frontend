import { useCallback, useEffect, useState } from 'react';
import nextArrow from '@/assets/common/nextArrow.svg';
import prevArrow from '@/assets/common/prevArrow.svg';
import styles from './styles.module.scss';

type PagenationProps = {
  totalPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const PAEG_LIMIT = 5; // 한 번에 최대 5개의 페이지가 보여짐

export default function Pagenation({
  totalPage,
  currentPage,
  setCurrentPage,
}: PagenationProps) {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const getPageNumbers = useCallback(
    (total: number, current: number, limit = 5) => {
      const totalPageArr = Array(total)
        .fill(undefined)
        .map((_, idx) => idx + 1);

      const currentPageGroup = Math.floor((current - 1) / limit);
      const lastPageGroup = Math.floor((total - 1) / limit);
      const currentPageGroupStartNumber = currentPageGroup * limit;

      if (currentPageGroup === lastPageGroup) {
        return totalPageArr.slice(currentPageGroupStartNumber, total);
      }
      return totalPageArr.slice(
        currentPageGroupStartNumber,
        currentPageGroupStartNumber + limit,
      );
    },
    [],
  );

  const handleCurrentPage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const buttonId = e.currentTarget.id;
      if (buttonId === 'prevPage') {
        if (currentPage === 1) return;
        setCurrentPage((prev) => prev - 1);
      }
      if (buttonId === 'nextPage') {
        if (currentPage === totalPage) return;
        setCurrentPage((prev) => prev + 1);
        return null;
      }
    },
    [currentPage],
  );

  useEffect(() => {
    setPageNumbers(getPageNumbers(totalPage, currentPage, PAEG_LIMIT));
  }, [totalPage, currentPage]);

  return (
    <div className={styles.pagenation}>
      <button
        id="prevPage"
        className={styles.pageButton}
        type="button"
        disabled={currentPage === 1}
        onClick={handleCurrentPage}
      >
        <img src={prevArrow} alt="prevPageButton" />
      </button>
      {pageNumbers?.map((page) => (
        <button
          id="prevPage"
          type="button"
          className={
            page === currentPage ? styles.focusedPageButton : styles.pageButton
          }
          key={page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        id="nextPage"
        className={styles.pageButton}
        type="button"
        disabled={currentPage === totalPage}
        onClick={handleCurrentPage}
      >
        <img src={nextArrow} alt="nextPageButton" />
      </button>
    </div>
  );
}
