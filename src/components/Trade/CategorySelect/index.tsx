import { CATEGORY_MENU } from '@/constants/trade';
import styles from './styles.module.scss';

type CategorySelectProps = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function CategorySelect({
  selectedCategories,
  setSelectedCategories,
}: CategorySelectProps) {
  const onSelectCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const categoryName = e.currentTarget.id;
    if (selectedCategories.includes(categoryName)) {
      const filteredCategories = selectedCategories.filter(
        (category) => category !== categoryName,
      );
      setSelectedCategories(filteredCategories);
    } else {
      setSelectedCategories((prev) => [...prev, categoryName]);
    }
  };

  const isSelectedCategory = (id: string) => {
    return selectedCategories.includes(id);
  };

  return (
    <section className={styles.container}>
      {CATEGORY_MENU.map((menu) => (
        <button
          key={menu}
          id={menu}
          onClick={onSelectCategory}
          className={
            isSelectedCategory(menu) ? styles.selectedMenuItem : styles.menuItem
          }
          type="button"
        >
          {menu}
        </button>
      ))}
    </section>
  );
}
