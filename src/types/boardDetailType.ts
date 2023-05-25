export type Comment = {
  commentId: number;
  nickName: string;
  content: string;
  createdAt: Date;
};
export type BoardDetailData = {
  boardId: number;
  title: string;
  code: string;
  nickName: string;
  createdAt: Date;
  imageUrls: string[];
  loveCount: number;
  category: string;
  prefixCategory: string;
  commentCount: number;
  comments: Comment[];
};
export type GetLikeResponse = {
  code: string;
  message: string;
  data: boolean;
};
export type BoardDetailResponse = {
  code: string;
  message: string;
  data: BoardDetailData;
};
