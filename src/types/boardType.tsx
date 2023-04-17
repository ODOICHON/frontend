export interface BoardResponse {
  code: string;
  message: string;
  data: Data;
}

export interface Data {
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
}

export interface BoardContent {
  boardId: number;
  title: string;
  code: string;
  oneLineContent: string;
  nickName: string;
  createdAt: Date;
  imageUrl: string;
  commentCount: number;
  category: string;
  prefixCategory: string;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
