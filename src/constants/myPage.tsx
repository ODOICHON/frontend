import { SettingInfo } from '@/types/MyPage/settingType';

export const settingStep = ['certification', 'editInfo', 'withdraw'] as const;
export const editMode = ['none', 'nickname', 'phone', 'email'] as const;

export type SettingStep = (typeof settingStep)[number];
export type EditMode = (typeof editMode)[number];

export const settingInfo: SettingInfo = {
  certification: {
    title: '회원 정보 수정',
    subTitle:
      '회원님의 정보를 안전하게 보호하기 위해 먼저 현재 비밀번호를 입력해주세요.',
  },
  editInfo: {
    title: '회원 정보 수정',
    subTitle: '회원 정보를 수정할 수 있어요.',
  },
  withdraw: {
    title: '회원 탈퇴',
    subTitle: '회원 탈퇴 신청에 앞서 아래 내용을 반드시 확인해주세요.',
  },
};