import axios from 'axios';

export const setInterceptor = (token: string) => {
  if (!token) return false;
  axios.defaults.headers.common.Authorization = token;

  return true;
};

export const getCategoryName = (category: string) => {
  switch (category) {
    case 'TREND':
      return '트렌드';
    case 'REVIEW':
      return '후기';
    case 'INTERIOR':
      return '인테리어';
    case 'ESTATE':
      return '토지';
    case 'REAL_ESTATE':
      return '부동산';
    case 'QUESTION':
      return '질문';
    case 'DAILY':
      return '일상';
    default:
      return '';
  }
};

export const getPrefixCategoryName = (category: string) => {
  switch (category) {
    case 'DEFAULT':
      return 'free_board';
    case 'ADVERTISEMENT':
      return 'advertisement_board';
    default:
      return '';
  }
};

export const checkBeforePost = (
  title: string,
  contents: string,
  category: string,
  imageUrl?: string[],
) => {
  if (title === '') {
    alert('제목을 입력해주세요.');
    return false;
  }
  if (contents === '') {
    alert('내용을 입력해주세요.');
    return false;
  }
  if (category === '') {
    alert('말머리를 선택해주세요.');
    return false;
  }
  if (imageUrl && imageUrl[0] === '') {
    alert('썸네일을 등록해주세요.');
    return false;
  }
  return true;
};
