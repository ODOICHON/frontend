import styles from './styles.module.scss';

type FilterOptionProps = {
  focusedFilter: string;
  setFocusedFilter: React.Dispatch<React.SetStateAction<string>>;
};

export default function FilterOption({
  focusedFilter,
  setFocusedFilter,
}: FilterOptionProps) {
  return (
    <ul className={styles.optionWrapper}>
      <li
        role="presentation"
        className={focusedFilter === 'ALL' ? styles.focused : styles.notFocused}
        onClick={() => setFocusedFilter('ALL')}
      >
        전체
      </li>
      <div className={styles.divider} />
      <li
        role="presentation"
        className={
          focusedFilter === 'TRADING' ? styles.focused : styles.notFocused
        }
        onClick={() => setFocusedFilter('TRADING')}
      >
        거래중인 매물
      </li>
    </ul>
  );
}
