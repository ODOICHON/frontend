import { RecommendedTagType } from '@/types/Board/tradeType';
import { convertTagName } from '@/utils/utils';
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
