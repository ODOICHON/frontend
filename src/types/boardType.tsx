export interface BoardResponse {
  code: string;
  message: string;
  data: Data;
}

export interface Data {
  content: BoardContent[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  sort: Sort;
  first: boolean;
  number: number;
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
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
