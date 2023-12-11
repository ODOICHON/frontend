import { useState } from 'react';
import { ToastMessageModalProps } from '@/components/Common/ToastMessageModal';

type ToastMessageKeyType =
  | 'POST_COMMENT_SUCCESS'
  | 'POST_COMMENT_ERROR'
  | 'COMMENT_EMPTY_ERROR'
  | 'LOGIN_REQUIRED_ERROR';

type ToastMessageType = {
  [key in ToastMessageKeyType]: ToastMessageModalProps;
};

const toastMessage: ToastMessageType = {
  POST_COMMENT_SUCCESS: {
    message: '댓글이 등록되었습니다.',
    subMessage: undefined,
    iconType: 'SUCCESS',
  },
  POST_COMMENT_ERROR: {
    message: '댓글 등록에 실패했습니다.',
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
};

const useToastMessageType = () => {
  const [toastMessageProps, setToastMessageProps] =
    useState<ToastMessageModalProps>();

  const handleToastMessageProps = (
    key: ToastMessageKeyType,
    onClose: () => void,
    onConfirm?: () => void,
  ) => {
    setToastMessageProps({ ...toastMessage[key], onClose, onConfirm });
  };

  return { toastMessageProps, handleToastMessageProps };
};

export default useToastMessageType;
