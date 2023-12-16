import { useEffect, useState } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import EditEmailInfo from '@/components/MyPage/EditInfo/EditEmailInfo';
import EditNicknameInfo from '@/components/MyPage/EditInfo/EditNicknameInfo';
import EditPhoneInfo from '@/components/MyPage/EditInfo/EditPhoneInfo';
import UserInfo from '@/components/MyPage/UserInfo';
import { certificateStore } from '@/store/certificateStore';
import userStore from '@/store/userStore';
import { EditMode, SettingStep } from '@/constants/myPage';
import styles from './styles.module.scss';

type SettingOutletContext = {
  settingStep: SettingStep;
  setSettingStep: React.Dispatch<React.SetStateAction<SettingStep>>;
};

export default function EditMember() {
  const { isCertificated } = certificateStore();
  const { user } = userStore();
  const { setSettingStep } = useOutletContext<SettingOutletContext>();

  const [editMode, setEditMode] = useState<EditMode>('none');

  useEffect(() => {
    if (isCertificated) {
      setSettingStep('editInfo');
    }
  }, []);

  if (!isCertificated) return <Navigate to="/mypage/setting" />;
  return (
    <div className={styles.container}>
      {user && (
        <section>
          <h1 className={styles.title}>기본정보</h1>
          <ul className={styles.infoWrapper}>
            <UserInfo title="아이디" value={user?.userName} />

            {editMode === 'nickname' ? (
              <EditNicknameInfo
                currentNickname={user?.nick_name}
                setEditMode={setEditMode}
              />
            ) : (
              <UserInfo
                title="닉네임"
                value={user?.nick_name}
                setEditMode={setEditMode}
              />
            )}

            {editMode === 'phone' ? (
              <EditPhoneInfo
                currentPhoneNum={user?.phone_num}
                setEditMode={setEditMode}
              />
            ) : (
              <UserInfo
                title="전화번호"
                value={user?.phone_num}
                setEditMode={setEditMode}
              />
            )}

            {editMode === 'email' ? (
              <EditEmailInfo
                currentEmail={user.email}
                setEditMode={setEditMode}
              />
            ) : (
              <UserInfo
                title="이메일"
                value={user?.email}
                setEditMode={setEditMode}
              />
            )}
          </ul>
        </section>
      )}
      <section>
        <h1 className={styles.title}>보안정보</h1>
        <li className={styles.securityInfoWrapper}>
          <p>비밀번호</p>
          <button type="button">수정</button>
        </li>
      </section>
    </div>
  );
}
