import { SettingStep } from '@/types/MyPage/settingType';

type CertificateMemberProps = {
  setSettingStep: React.Dispatch<React.SetStateAction<SettingStep>>;
};

export default function CertificateMember({
  setSettingStep,
}: CertificateMemberProps) {
  console.log(setSettingStep);
  return <div>비밀번호 인증</div>;
}
