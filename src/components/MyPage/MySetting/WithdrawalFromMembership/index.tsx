import { SettingStep } from '@/types/MyPage/settingType';

type WithdrawalFromMembershipProps = {
  setSettingStep: React.Dispatch<React.SetStateAction<SettingStep>>;
};

export default function WithdrawalFromMembership({
  setSettingStep,
}: WithdrawalFromMembershipProps) {
  console.log(setSettingStep);
  return <div>회원 탈퇴</div>;
}
