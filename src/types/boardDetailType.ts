export interface GetLikeResponse {
  code: string;
  message: string;
  data: boolean;
}
export interface BoardDetailResponse {
  code: string;
  message: string;
  data: BoardDetailData;
}

export interface BoardDetailData {
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
}

export interface Comment {
  commentId: number;
  nickName: string;
  content: string;
  createdAt: Date;
}
