import styles from './styles.module.scss';

type MyHomeCardProps = {
  title: string;
  count: number;
};

function MyHomeCard({ title, count }: MyHomeCardProps) {
  return (
    <li key={title} className={styles.card}>
      <span>{title}</span>
      <span>{count}</span>
    </li>
  );
}

export default MyHomeCard;
