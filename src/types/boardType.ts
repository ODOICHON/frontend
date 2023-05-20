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
export type BoardContent = {
  boardId: number;
  title: string;
  code: string;
  oneLineContent: string;
  nickName: string;
  createdAt: Date;
  imageUrl?: string;
  commentCount: number;
  category: string;
  prefixCategory: string;
  fixed: boolean;
};

export type BoardData = {
  content: BoardContent[];
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
export type BoardResponse = {
  code: string;
  message: string;
  data: BoardData;
};

export type BoardForm = {
  title: string;
  code: string;
  category: string;
  imageUrls: string[];
  prefixCategory: string;
  fixed: boolean;
};
