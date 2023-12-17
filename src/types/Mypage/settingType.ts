import { MEMBERSHIP_WITHDRAWAL_REASON } from '@/constants/myPage';

export type MembershipWithdrawalReasonKeyType =
  keyof typeof MEMBERSHIP_WITHDRAWAL_REASON;

export type MembershipWithdrawalReasonValueType =
  (typeof MEMBERSHIP_WITHDRAWAL_REASON)[keyof typeof MEMBERSHIP_WITHDRAWAL_REASON];
