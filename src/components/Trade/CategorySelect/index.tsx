import { RecommendedTagType } from '@/types/Board/tradeType';
import { specialCategory } from '@/constants/trade';
import styles from './styles.module.scss';

type CategorySelectProps = {
  recommendedTags: RecommendedTagType[];
  setRecommendedTags: React.Dispatch<
    React.SetStateAction<RecommendedTagType[]>
  >;
};

export default function CategorySelect({
  recommendedTags,
  setRecommendedTags,
}: CategorySelectProps) {
  const convertTagName = (tagName: string): RecommendedTagType | undefined => {
    if (tagName === '처음부터 인테리어를 하고 싶어요.')
      return 'WANT_TO_INTERIOR_FOR_THE_FIRST_TIME';
    if (tagName === '어느 정도 준비된 집이 좋아요.')
      return 'WANT_TO_READY_HOUSE';
    if (tagName === '아이가 함께 살아요.') return 'HAVE_CHILDREN';
    if (tagName === '경치가 좋은 집을 원해요.')
      return 'WANT_TO_LOOK_A_GOOD_VIEW';
    if (tagName === '농사 짓기를 원해요.') return 'WANT_TO_FARM';
  };

  const onSelectCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const categoryName = convertTagName(e.currentTarget.id);
    if (!categoryName) return;

    if (recommendedTags.includes(categoryName)) {
      const filteredCategories = recommendedTags.filter(
        (category) => category !== categoryName,
      );
      setRecommendedTags(filteredCategories);
    } else {
      setRecommendedTags((prev) => [...prev, categoryName]);
    }
  };

  const isSelectedCategory = (id: string) => {
    const categoryName = convertTagName(id);
    if (!categoryName) return;
    return recommendedTags.includes(categoryName);
  };

  return (
    <section className={styles.container}>
      {specialCategory.map((menu) => (
        <button
          key={menu.content}
          id={menu.content}
          onClick={onSelectCategory}
          className={
            isSelectedCategory(menu.content)
              ? styles.selectedMenuItem
              : styles.menuItem
          }
          type="button"
        >
          {menu.content}
        </button>
      ))}
    </section>
  );
}
