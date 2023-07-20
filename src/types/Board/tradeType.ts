import { BoardPageType } from './boardType';

export type TradeBoardForm = {
  rentalType: string;
  city: string;
  zipCode: string;
  size: string;
  purpose: string;
  floorNum: number;
  contact: string;
  createdDate: Date;
  price: number;
  monthlyPrice: number;
  agentName: string;
  title: string;
  code: string;
  imageUrls: string[];
  tmpYn: boolean;
};

export type TradeBoardType = {
  houseId: number;
  rentalType: string;
  city: string;
  price: number;
  monthlyPrice: number;
  nickName: string;
  createdAt: Date;
  isCompleted: boolean;
  imageUrl: string;
};

export type TradeBoardDetailType = {
  houseId: number;
  rentalType: string;
  city: string;
  zipcode: string;
  size: string;
  purpose: string;
  floorNum: number;
  contact: string;
  createdDate: Date;
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

export type MenuType = 'none' | 'type' | 'location' | 'category' | 'search';
