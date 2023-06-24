export type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type Pageable = {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
};

export type TradeBoardContent = {
  houseId: number;
  rentalType: string;
  city: string;
  price: number;
  monthlyPrice: number;
  nickName: string;
  createdAt: Date;
  isCompleted: boolean;
};
export type TradeBoardData = {
  content: TradeBoardContent[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  number: number;
  sort: Sort;
  size: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};
