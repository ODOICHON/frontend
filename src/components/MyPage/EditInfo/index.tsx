import styles from './styles.module.scss';

type EditInfoProps = {
  title: string;
  value: string;
  editable?: boolean;
};

export default function EditInfo({
  title,
  value,
  editable = false,
}: EditInfoProps) {
  return (
    <li className={styles.wrapper}>
      <p>{title}</p>
      <p>{value}</p>
      {editable && <button type="button">수정</button>}
    </li>
  );
}
