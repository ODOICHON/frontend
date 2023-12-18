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
  withdrawal: {
    title: '회원 탈퇴',
    subTitle: '회원 탈퇴 신청에 앞서 아래 내용을 반드시 확인해주세요.',
  },
  password: {
    title: '회원 정보 수정',
    subTitle: '회원 정보를 수정할 수 있어요.',
  },
};

export const MEMBERSHIP_WITHDRAWAL_NOTE_LIST = [
  '회원탈퇴 후 주말내집 서비스에 입력한 게시물 및 댓글은 삭제되지 않으며, 회원정보 삭제로 인해 작성자 본인을 확인할 수 없으므로 게시물 편집 및 삭제 처리가 원천적으로 불가능합니다. 게시물 삭제를 원하실 경우에는 먼저 해당 게시물을 삭제 하신 후 , 탈퇴를 신청하시기 바랍니다.',
  '회사는 해당 요청을 확인한 후 탈퇴를 처리합니다.',
  '회사는 탈퇴로 인해 발생한 피해에 대해 어떠한 책임도 지지 않습니다.',
];

export const MEMBERSHIP_WITHDRAWAL_REASON = {
  ROW_USE: '이용빈도 낮음',
  RE_JOIN: '재가입',
  INSUFFICIENT_CONTENT: '콘텐츠 및 정보 부족',
  PERSONAL_PROTECTION: '개인 정보 보호',
  ETC: '기타',
} as const;

export type MembershipWithdrawalReason =
  keyof typeof MEMBERSHIP_WITHDRAWAL_REASON;

export const MAX_LENGTH_MEMBERSHIP_WITHDRAWAL_REASON_CONTENT = 1000;
