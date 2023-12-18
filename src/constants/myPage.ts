import { SettingInfo } from '@/types/MyPage/settingType';

export const SETTING_STEP = {
  CERTIFICATION: 'certification',
  EDIT_INFO: 'editInfo',
  WITHDRAWAL: 'withdrawal',
  PASSWORD: 'password',
} as const;

export const EDIT_MODE = {
  NONE: 'none',
  NICKNAME: 'nickname',
  PHONE: 'phone',
  EMAIL: 'email',
} as const;
export type SettingStep = (typeof SETTING_STEP)[keyof typeof SETTING_STEP];
export type EditMode = (typeof EDIT_MODE)[keyof typeof EDIT_MODE];

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
  password: {
    title: '회원 정보 수정',
    subTitle: '회원 정보를 수정할 수 있어요.',
  },
};
