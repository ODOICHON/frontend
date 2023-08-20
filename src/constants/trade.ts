import { RecommendedTagType, RentalType } from '@/types/Board/tradeType';

type TradeCategoryType = {
  content: string;
  type: RentalType;
};

export const tradeCategory: TradeCategoryType[] = [
  { content: '매매', type: 'SALE' },
  { content: '전세', type: 'JEONSE' },
  { content: '월세', type: 'MONTHLYRENT' },
];

type SpecialCategoryType = {
  content: string;
  type: RecommendedTagType;
};

export const specialCategory: SpecialCategoryType[] = [
  {
    content: '처음부터 인테리어를 하고 싶어요.',
    type: 'WANT_TO_INTERIOR_FOR_THE_FIRST_TIME',
  },
  { content: '어느 정도 준비된 점이 좋아요.', type: 'WANT_TO_READY_HOUSE' },
  { content: '아이가 함께 살아요.', type: 'HAVE_CHILDREN' },
  { content: '경치가 좋은 집을 원해요.', type: 'WANT_TO_LOOK_A_GOOD_VIEW' },
  { content: '농사 짓기를 원해요.', type: 'WANT_TO_FARM' },
];
