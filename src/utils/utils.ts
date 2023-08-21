import axios from 'axios';
import { TradeBoardForm } from '@/types/Board/tradeType';

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

// 매매 타입 이름 가져오기
export const getRentalName = (rental: string) => {
  switch (rental) {
    case 'MONTHLYRENT':
      return '월세';
    case 'JEONSE':
      return '전세';
    case 'SALE':
      return '매매';
    default:
      return '';
  }
};

// 매매 타입에 따른 가격 이름
export const getRentalPriceType = (rental: string) => {
  switch (rental) {
    case 'MONTHLYRENT':
      return '보증금';
    case 'JEONSE':
      return '임대 가격';
    case 'SALE':
      return '매매 가격';
    default:
      return '임대 가격';
  }
};

// 일반회원, 중개사 회원 구분 함수
export const getUserType = (userType: string) => {
  switch (userType) {
    case 'NONE':
      return '일반회원';
    case 'AGENT':
      return '중개사';
    default:
      return '';
  }
};

// 입주가능, 입주불가 구분 함수
export const getMoveInType = (isCompleted: boolean) => {
  return isCompleted ? '입주가능' : '입주불가';
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

// 빈집거래 글쓰기 필수 입력사항 체크
export const checkBeforeTradePost = (
  user: User,
  tradeBoardForm: TradeBoardForm,
) => {
  const {
    imageUrls,
    city,
    zipCode,
    price,
    monthlyPrice,
    contact,
    agentName,
    size,
    createdDate,
    purpose,
    title,
    code,
  } = tradeBoardForm;

  if (imageUrls[0] === '') {
    alert('썸네일을 등록해주세요.');
    return false;
  }
  if (city === '') {
    alert('시/도를 선택해주세요.');
    return false;
  }
  if (zipCode === '') {
    alert('우편번호를 입력해주세요.');
    return false;
  }
  if (price === 0) {
    alert('매매가를 입력해주세요.');
    return false;
  }
  if (tradeBoardForm.rentalType === 'MONTHLYRENT' && monthlyPrice === 0) {
    alert('월세를 입력해주세요.');
    return false;
  }
  if (contact === '') {
    alert('연락처를 입력해주세요.');
    return false;
  }
  if (contact.includes('-')) {
    alert('연락처를 - 없이 입력해주세요.');
    return false;
  }
  if (user.userType === 'AGENT' && agentName === '') {
    alert('중개사 이름을 입력해주세요.');
    return false;
  }
  if (size === '') {
    alert('평수를 입력해주세요.');
    return false;
  }
  if (createdDate === '') {
    alert('준공일을 입력해주세요.');
    return false;
  }
  if (purpose === '') {
    alert('용도를 입력해주세요.');
    return false;
  }
  if (title === '') {
    alert('제목을 입력해주세요.');
    return false;
  }
  if (code === '') {
    alert('내용을 입력해주세요.');
    return false;
  }
  if (imageUrls.length <= 5) {
    alert('이미지는 5개 이상 등록해주세요.');
    return false;
  }

  return true;
};

// 카카오 map api를 이용하여 주소 파라미터로 받고 좌표로 변환하는 함수
export const getLatLng = async (address: string) => {
  if (address === '') return { lat: 0, lng: 0 };

  const data = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
    {
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_MAP_REST_API_KEY}`,
      },
    },
  );
  const { x, y } = data.data.documents[0].address;
  return { lat: +y, lng: +x };
};
