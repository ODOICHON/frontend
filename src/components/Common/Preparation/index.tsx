import closedDoorImg from '@/assets/common/closedDoor.svg';
import styles from './styles.module.scss';

export default function Preparation() {
  return (
    <div className={styles.wrapper}>
      <img src={closedDoorImg} alt="preparation" />
      <p>오픈 준비 중..</p>
      <p>곧 해당 페이지도 출시됩니다.</p>
    </div>
  );
}
