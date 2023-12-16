import { useEffect } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import EditInfo from '@/components/MyPage/EditInfo';
import { certificateStore } from '@/store/certificateStore';
import userStore from '@/store/userStore';
import { SettingStep } from '@/constants/myPage';
import styles from './styles.module.scss';

type SettingOutletContext = {
  settingStep: SettingStep;
  setSettingStep: React.Dispatch<React.SetStateAction<SettingStep>>;
};

export default function EditMember() {
  const { isCertificated } = certificateStore();
  const { user } = userStore();
  const { setSettingStep } = useOutletContext<SettingOutletContext>();

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
            <EditInfo title="아이디" value={user?.userName} />
            <EditInfo title="닉네임" value={user?.nick_name} editable />
            <EditInfo title="전화번호" value={user?.phone_num} editable />
            <EditInfo title="이메일" value={user?.email} editable />
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
