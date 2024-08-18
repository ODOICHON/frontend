import { useState } from 'react';
import { ToastMessageModalProps } from '@/components/Common/ToastMessageModal';

type ToastMessageKeyType =
  | 'POST_COMMENT_SUCCESS'
  | 'DELETE_COMMENT_SUCCESS'
  | 'POST_COMMENT_ERROR'
  | 'DELETE_COMMENT_ERROR'
  | 'COMMENT_EMPTY_ERROR'
  | 'LOGIN_REQUIRED_ERROR'
  | 'POST_DELETE_SUCCESS'
  | 'POST_DELETE_QUESTION'
  | 'SIGN_UP_SUCCESS'
  | 'AGENT_SIGN_UP_SUCCESS'
  | 'POST_UPDATE_SUCCESS'
  | 'POST_UPDATE_ERROR'
  | 'POST_DELETE_ERROR'
  | 'POST_CREATE_SUCCESS'
  | 'POST_CREATE_ERROR'
  | 'SEARCH_STRING_ERROR';

type ToastMessageType = {
  [key in ToastMessageKeyType]: ToastMessageModalProps;
};

export const TOAST_MESSAGE: ToastMessageType = {
  POST_COMMENT_SUCCESS: {
    message: '댓글이 등록되었습니다.',
    subMessage: undefined,
    iconType: 'SUCCESS',
  },
  DELETE_COMMENT_SUCCESS: {
    message: '댓글이 삭제되었습니다.',
    subMessage: undefined,
    iconType: 'SUCCESS',
  },
  POST_COMMENT_ERROR: {
    message: '댓글 등록에 실패했습니다.',
    subMessage: '잠시 후 다시 시도해주세요.',
    iconType: 'ERROR',
  },
  DELETE_COMMENT_ERROR: {
    message: '댓글 삭제에 실패했습니다.',
    subMessage: '잠시 후 다시 시도해주세요.',
    iconType: 'ERROR',
  },
  POST_CREATE_SUCCESS: {
    message: '게시글이 등록되었습니다.',
    subMessage: undefined,
    iconType: 'SUCCESS',
  },
  POST_CREATE_ERROR: {
    message: '게시글 등록에 실패했습니다.',
    subMessage: '잠시 후 다시 시도해주세요.',
    iconType: 'ERROR',
  },
  POST_DELETE_SUCCESS: {
    message: '게시글이 삭제되었습니다.',
    subMessage: undefined,
    iconType: 'SUCCESS',
  },
  POST_DELETE_ERROR: {
    message: '게시글 삭제에 실패했습니다.',
    subMessage: '잠시 후 다시 시도해주세요.',
    iconType: 'ERROR',
  },
  POST_DELETE_QUESTION: {
    message: '해당 게시글을 삭제하시겠습니까?',
    subMessage: '작성한 내용은 저장되지 않고 바로 삭제됩니다.',
    iconType: 'ERROR',
    confirmModal: true,
  },
  POST_UPDATE_SUCCESS: {
    message: '게시글이 수정되었습니다.',
    subMessage: undefined,
    iconType: 'SUCCESS',
  },
  POST_UPDATE_ERROR: {
    message: '게시글 수정에 실패했습니다.',
    subMessage: '잠시 후 다시 시도해주세요.',
    iconType: 'ERROR',
  },
  COMMENT_EMPTY_ERROR: {
    message: '댓글을 입력해주세요.',
    subMessage: '댓글을 입력하지 않으면 등록할 수 없습니다.',
    iconType: 'ERROR',
  },
  LOGIN_REQUIRED_ERROR: {
    message: '로그인이 필요합니다.',
    subMessage: '로그인 페이지로 이동하시겠습니까?',
    iconType: 'DEFAULT',
    confirmModal: true,
  },
  SIGN_UP_SUCCESS: {
    message: '회원가입에 성공하였습니다.',
    subMessage: undefined,
    iconType: 'SUCCESS',
  },
  AGENT_SIGN_UP_SUCCESS: {
    message: '공인중개사 회원가입에 성공하였습니다.',
    subMessage: '공인중개사 회원은 관리자 승인 이후에 로그인이 가능합니다.',
    iconType: 'SUCCESS',
  },
  SEARCH_STRING_ERROR: {
    message: '해당 검색어는 사용할 수 없습니다.',
    subMessage: '자음과 모음만으로 이루어진 검색어는 사용할 수 없습니다.',
    iconType: 'ERROR',
  },
};

const useToastMessageType = () => {
  const [toastMessageProps, setToastMessageProps] =
    useState<ToastMessageModalProps>();

  const handleToastMessageProps = (
    key: ToastMessageKeyType,
    onClose: () => void,
    onConfirm?: () => void,
  ) => {
    setToastMessageProps({ ...TOAST_MESSAGE[key], onClose, onConfirm });
  };

  return { toastMessageProps, handleToastMessageProps };
};

export default useToastMessageType;
