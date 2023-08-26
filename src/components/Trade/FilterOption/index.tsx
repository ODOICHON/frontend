import styles from './styles.module.scss';

type FilterOptionProps = {
  dealState: 'ALL' | 'ONGOING';
  setDealState: React.Dispatch<React.SetStateAction<'ALL' | 'ONGOING'>>;
};

export default function FilterOption({
  dealState,
  setDealState,
}: FilterOptionProps) {
  return (
    <ul className={styles.optionWrapper}>
      <li
        role="presentation"
        className={dealState === 'ALL' ? styles.focused : styles.notFocused}
        onClick={() => setDealState('ALL')}
      >
        전체
      </li>
      <div className={styles.divider} />
      <li
        role="presentation"
        className={dealState === 'ONGOING' ? styles.focused : styles.notFocused}
        onClick={() => setDealState('ONGOING')}
      >
        거래중인 매물
      </li>
    </ul>
  );
}
