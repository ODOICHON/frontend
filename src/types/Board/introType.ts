import { BoardPageType, CommentType } from './boardType';

export type IntroBoardType = {
  boardId: string;
  title: string;
  code: string;
  oneLineContent: string;
  nickName: string;
  createdAt: Date;
  imageUrl: string;
  commentCount: number;
  category: string;
  prefixCategory: string;
  fixed: boolean;
};

export type IntroBoardDetailType = {
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
  comments: CommentType[];
};

export type IntroBoardPageType = BoardPageType<IntroBoardType>;
