import { EDIT_MODE, EditMode } from '@/constants/myPage';
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
        return setEditMode(EDIT_MODE.NICKNAME);
      case '전화번호':
        return setEditMode(EDIT_MODE.PHONE);
      case '이메일':
        return setEditMode(EDIT_MODE.EMAIL);
      default:
        return setEditMode(EDIT_MODE.NONE);
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
