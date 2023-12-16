import { EditMode } from '@/constants/myPage';
import styles from './styles.module.scss';

type UserInfoProps = {
  title: string;
  value: string;
  setEditMode?: React.Dispatch<React.SetStateAction<EditMode>>;
};

export default function UserInfo({ title, value, setEditMode }: UserInfoProps) {
  const handleEditMode = () => {
    if (!setEditMode) return;
    switch (title) {
      case '닉네임':
        return setEditMode('nickname');
      case '전화번호':
        return setEditMode('phone');
      case '이메일':
        return setEditMode('email');
      default:
        return setEditMode('none');
    }
  };
  return (
    <li className={styles.wrapper}>
      <p>{title}</p>
      <p>{value}</p>
      {setEditMode && (
        <button type="button" onClick={handleEditMode}>
          수정
        </button>
      )}
    </li>
  );
}
