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
