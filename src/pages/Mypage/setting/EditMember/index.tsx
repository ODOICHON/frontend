import { useEffect } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import { certificateStore } from '@/store/certificateStore';
import { SettingStep } from '@/constants/myPage';

type SettingOutletContext = {
  settingStep: SettingStep;
  setSettingStep: React.Dispatch<React.SetStateAction<SettingStep>>;
};

export default function EditMember() {
  const { isCertificated } = certificateStore();
  const { setSettingStep } = useOutletContext<SettingOutletContext>();

  useEffect(() => {
    if (isCertificated) {
      setSettingStep('editInfo');
    }
  }, []);

  if (!isCertificated) return <Navigate to="/mypage/setting" />;
  return <div>회원 정보 수정</div>;
}
