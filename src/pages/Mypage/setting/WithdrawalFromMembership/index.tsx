import { useEffect } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import { certificateStore } from '@/store/certificateStore';
import { SettingStep } from '@/constants/myPage';

type SettingOutletContext = {
  settingStep: SettingStep;
  setSettingStep: React.Dispatch<React.SetStateAction<SettingStep>>;
};

export default function WithdrawalFromMembership() {
  const { isCertificated } = certificateStore();
  const { setSettingStep } = useOutletContext<SettingOutletContext>();

  useEffect(() => {
    if (isCertificated) {
      setSettingStep('withdraw');
    }
  }, []);

  if (!isCertificated) return <Navigate to="/mypage/setting" />;
  return <div>회원 탈퇴</div>;
}
