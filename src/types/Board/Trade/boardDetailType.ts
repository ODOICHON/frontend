export type TradeBoardDetailData = {
  houseId: number;
  rentalType: string;
  city: string;
  zipcode: string;
  size: string;
  purpose: string;
  floorNum: number;
  sumFloor: number;
  contact: string;
  createdDate: Date;
  price: number;
  monthlyPrice: number;
  agentName: string;
  title: string;
  code: string;
  imageUrls: string[];
  nickName: string;
  createdAt: Date;
  userType: string;
  isCompleted: boolean;
  isScraped: boolean;
};

export type TradeBoardDetailResponse = {
  code: string;
  message: string;
  data: TradeBoardDetailData;
};
