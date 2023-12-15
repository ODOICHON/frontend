import { SettingStep } from '@/types/MyPage/settingType';

type EditMemberProps = {
  setSettingStep: React.Dispatch<React.SetStateAction<SettingStep>>;
};

export default function EditMember({ setSettingStep }: EditMemberProps) {
  console.log(setSettingStep);
  return <div>회원 정보 수정</div>;
}
