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
