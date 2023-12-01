import { BoardPageType } from './boardType';
import {
  IntroBoardDetailType,
  IntroBoardPageType,
  IntroBoardType,
} from './introType';

export type CommunityBoardType = IntroBoardType;

export type CommunityBoardDetailType = IntroBoardDetailType;

export type CommunityBoardPageType = IntroBoardPageType;

export type MyCommentType = {
  commentId: number;
  boardId: number;
  title: string;
  commentContent: string;
  // category: string;
  // prefixCategory: string;
};

export type MyCommentPageType = BoardPageType<MyCommentType>;
