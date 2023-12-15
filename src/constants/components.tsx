import CertificateMember from '@/components/MyPage/MySetting/CertificateMember';
import EditMember from '@/components/MyPage/MySetting/EditMember';
import WithdrawalFromMembership from '@/components/MyPage/MySetting/WithdrawalFromMembership';
import { SettingInfo } from '@/types/MyPage/settingType';

export const settingInfo: SettingInfo = {
  certification: {
    title: '회원 정보 수정',
    subTitle:
      '회원님의 정보를 안전하게 보호하기 위해 먼저 현재 비밀번호를 입력해주세요.',
    component: (setState) => <CertificateMember setSettingStep={setState} />,
  },
  editInfo: {
    title: '회원 정보 수정',
    subTitle: '회원 정보를 수정할 수 있어요.',
    component: (setState) => <EditMember setSettingStep={setState} />,
  },
  withdraw: {
    title: '회원 탈퇴',
    subTitle: '회원 탈퇴 신청에 앞서 아래 내용을 반드시 확인해주세요.',
    component: (setState) => (
      <WithdrawalFromMembership setSettingStep={setState} />
    ),
  },
};
