export type SortType = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type PageableType = {
  sort: SortType;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
};

export type BoardPageType<T> = {
  content: T[];
  pageable: PageableType;
  last: boolean;
  totalPages: number;
  totalElements: number;
  number: number;
  sort: SortType;
  size: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type BoardFormType = {
  title: string;
  code: string;
  category: string;
  imageUrls: string[];
  prefixCategory: string;
  fixed: boolean;
};

export type CommentType = {
  commentId: number;
  nickName: string;
  content: string;
  createdAt: Date;
};
