import {
  HouseType,
  RecommendedTagType,
  RentalType,
} from '@/types/Board/tradeType';

export type TradeCategoryType = {
  content: string;
  type: RentalType | '';
};

export type TradeHouseType = {
  content: string;
  type: HouseType | '';
};

export const houseCategory: TradeHouseType[] = [
  { content: '전체', type: '' },
  { content: '토지', type: 'LAND' },
  { content: '주택', type: 'HOUSE' },
  { content: '농가', type: 'FARM_HOUSE' },
];

export const tradeCategory: TradeCategoryType[] = [
  { content: '전체', type: '' },
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
  { content: '어느 정도 준비된 집이 좋아요.', type: 'WANT_TO_READY_HOUSE' },
  { content: '아이가 함께 살아요.', type: 'HAVE_CHILDREN' },
  { content: '경치가 좋은 집을 원해요.', type: 'WANT_TO_LOOK_A_GOOD_VIEW' },
  { content: '농사 짓기를 원해요.', type: 'WANT_TO_FARM' },
];

export type TradeCityType = {
  content: string;
  type: '수도권' | '강원' | '충청' | '경상' | '전라' | '제주' | '';
};

export const tradeCity: TradeCityType[] = [
  { content: '전체', type: '' },
  {
    content: '수도권',
    type: '수도권',
  },
  { content: '강원', type: '강원' },
  { content: '충청', type: '충청' },
  { content: '경상', type: '경상' },
  { content: '전라', type: '전라' },
  { content: '제주', type: '제주' },
];
