import { BoardPageType } from './boardType';

export type RecommendedTagType =
  | 'WANT_TO_INTERIOR_FOR_THE_FIRST_TIME'
  | 'WANT_TO_READY_HOUSE'
  | 'HAVE_CHILDREN'
  | 'WANT_TO_LOOK_A_GOOD_VIEW'
  | 'WANT_TO_FARM';

export type RentalType = 'SALE' | 'JEONSE' | 'MONTHLYRENT';

export type TradeBoardForm = {
  rentalType: RentalType;
  city: string;
  zipCode: string;
  size: string;
  purpose: string;
  floorNum: number;
  contact: string;
  createdDate: string;
  price: number;
  monthlyPrice: number;
  agentName: string;
  title: string;
  code: string;
  imageUrls: string[];
  tmpYn: boolean;
  recommendedTag: RecommendedTagType[];
};

export type TradeBoardType = {
  houseId: number;
  rentalType: RentalType;
  city: string;
  price: number;
  monthlyPrice: number;
  nickName: string;
  createdAt: string;
  isCompleted: boolean;
  imageUrl: string;
  title: string;
  recommendedTag: RecommendedTagType[];
  recommendedTagName: string[];
};

export type TradeBoardDetailType = {
  houseId: number;
  rentalType: RentalType;
  city: string;
  zipcode: string;
  size: string;
  purpose: string;
  floorNum: number;
  contact: string;
  createdDate: string;
  price: number;
  monthlyPrice: number;
  agentName: string;
  title: string;
  code: string;
  imageUrls: string[];
  nickName: string;
  userType: string;
  createdAt: Date;
  isCompleted: boolean;
  isScraped: boolean;
};

export type TradeBoardPageType = BoardPageType<TradeBoardType>;

export type ReportFormType = {
  reportType: string;
  reportReason: string;
};

export type MenuType = 'none' | 'type' | 'location' | 'search';
