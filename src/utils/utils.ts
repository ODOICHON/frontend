import axios from 'axios';
import {
  DealStateType,
  HouseType,
  RecommendedTagType,
  RentalType,
  TradeBoardForm,
} from '@/types/Board/tradeType';

export const setInterceptor = (token: string) => {
  if (!token) return false;
  axios.defaults.headers.common.Authorization = token;

  return true;
};

// TODO: 상수 관리 고민
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
    case 'EMPTY':
      return '';
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
export const getRentalName = (rental: RentalType) => {
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

// 매매 타입 이름 가져오기
export const getDealStateName = (dealState: DealStateType) => {
  switch (dealState) {
    case 'APPLYING':
      return '승인중';
    case 'ONGOING':
      return '판매중';
    case 'COMPLETED':
      return '판매완료';
    default:
      return '';
  }
};

// 매매 타입에 따른 가격 이름
export const getRentalPriceType = (rental: RentalType) => {
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
export const getUserType = (userType: UserType) => {
  switch (userType) {
    case 'AGENT':
      return '공인중개사 매물';
    default:
      return '일반회원 매물';
  }
};

// 입주가능, 입주불가 구분 함수
export const getMoveInType = (isCompleted: boolean) => {
  return isCompleted ? '거래완료' : '입주가능';
};

export const checkBeforePost = (
  title: string,
  contents: string,
  thumbnail?: string,
) => {
  if (title === '') {
    alert('제목을 입력해주세요.');
    return false;
  }
  if (contents === '') {
    alert('내용을 입력해주세요.');
    return false;
  }
  if (thumbnail === '') {
    alert('썸네일을 등록해주세요.');
    return false;
  }
  return true;
};

// 농가거래 글쓰기 필수 입력사항 체크
export const checkBeforeTradePost = (
  user: User,
  tradeBoardForm: TradeBoardForm,
) => {
  const {
    imageUrls,
    city,
    zipCode,
    detail,
    price,
    monthlyPrice,
    contact,
    agentName,
    size,
    floorNum,
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
  if (detail === '') {
    alert('상세주소를 입력해주세요.');
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

export const priceCount = (price: number) => {
  const unitWords = ['만', '억', '조', '경'];
  const splitUnit = 10000;
  const splitCount = unitWords.length;
  const resultArray = [];
  let resultString = '';

  for (let i = 0; i < splitCount; i += 1) {
    let unitResult = (price % splitUnit ** (i + 1)) / splitUnit ** i;
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (let i = 0; i < resultArray.length; i += 1) {
    if (resultArray[i])
      resultString = `${String(resultArray[i])}${unitWords[i]} ${resultString}`;
  }

  return `${resultString.trim()}원`;
};

export const convertTagName = (
  tagName: string,
): RecommendedTagType | undefined => {
  if (tagName === '처음부터 인테리어를 하고 싶어요.')
    return 'WANT_TO_INTERIOR_FOR_THE_FIRST_TIME';
  if (tagName === '어느 정도 준비된 집이 좋아요.') return 'WANT_TO_READY_HOUSE';
  if (tagName === '아이가 함께 살아요.') return 'HAVE_CHILDREN';
  if (tagName === '경치가 좋은 집을 원해요.') return 'WANT_TO_LOOK_A_GOOD_VIEW';
  if (tagName === '농사 짓기를 원해요.') return 'WANT_TO_FARM';
};

export const convertRentalTypeName = (typeName: RentalType) => {
  if (typeName === 'SALE') return '매매';
  if (typeName === 'JEONSE') return '전세';
  if (typeName === 'MONTHLYRENT') return '월세';
};

export const convertHouseTypeName = (typeName: HouseType) => {
  if (typeName === 'LAND') return '토지';
  if (typeName === 'HOUSE') return '주택';
  if (typeName === 'FARM_HOUSE') return '농가';
};

// 문자가 자음이거나 모음인지 확인하는 함수
export const isConsonant = (char: string) => {
  const pattern = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
  return pattern.test(char);
};

export const checkTextString = (text: string) => {
  return [...text].map((v) => isConsonant(v)).some((v) => v === true);
};
