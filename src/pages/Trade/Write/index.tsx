import { useRef, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { MdUploadFile } from 'react-icons/md';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import AddressModal from '@/components/Trade/AddressModal';
import TradeQuill from '@/components/Trade/Quill';
import {
  HouseType,
  RentalType,
  TradeBoardDetailType,
  TradeBoardForm,
} from '@/types/Board/tradeType';
import { uploadFile } from '@/apis/uploadS3';
import { imageStore } from '@/store/imageStore';
import userStore from '@/store/userStore';
import { getRentalPriceType } from '@/utils/utils';
// import { DEFAULT_OPTIONS } from '@/constants/image';
import {
  houseCategory,
  specialCategory,
  tradeCategory,
} from '@/constants/trade';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

// const { VITE_CLOUD_FRONT_DOMAIN } = import.meta.env;
const { VITE_S3_DOMAIN } = import.meta.env;

export default function TradeWritePage() {
  const { user } = userStore();
  const { setImages } = imageStore();

  const { state }: { state: { data: TradeBoardDetailType } } = useLocation();

  const [form, setForm] = useState<TradeBoardForm>({
    houseType: state ? state.data.houseType : 'LAND',
    rentalType: state ? state.data.rentalType : 'SALE',
    city: state ? state.data.city : '',
    zipCode: state ? state.data.zipCode : '',
    detail: state ? state.data.detail : '',
    size: state ? state.data.size : '',
    purpose: state ? state.data.purpose : '',
    floorNum: state ? state.data.floorNum : 0,
    contact: state ? state.data.contact : '',
    createdDate: state ? state.data.createdDate : '',
    price: state ? state.data.price : 0,
    monthlyPrice: state ? state.data.monthlyPrice : 0,
    agentName: state ? state.data.agentName : '',
    agentDetail: state ? state.data.agentDetail : '',
    title: state ? state.data.title : '',
    code: state ? state.data.code : '',
    imageUrls: state ? state.data.imageUrls : [],
    tmpYn: state ? state.data.tmpYn : false,
    recommendedTag: state ? state.data.recommendedTag : [],
  });

  const [thumbnail, setThumbnail] = useState(
    state ? state.data.imageUrls[0] : '',
  );
  const [thumbnailTitle, setThumbnailTitle] = useState(
    state ? state.data.imageUrls[0].split('/')[3] : '',
  );

  const thumbnailRef = useRef<HTMLInputElement>(null);
  // 매물특징
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const postCodeCallback = (fullAddress: string, zipCodePost?: string) => {
    setForm((prev: TradeBoardForm) => ({
      ...prev,
      city: fullAddress,
      zipCode: zipCodePost ?? '',
    }));
  };

  const onChangeForm = (
    e: React.ChangeEvent<HTMLInputElement>,
    numValue?: number,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: numValue ?? value }));
  };

  const onChangePoints = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let numValue = Number(value.replace(/[^0-9]/g, ''));
    if (!numValue) numValue = 0;
    onChangeForm(e, numValue);
  };

  const onParsingPhoneNumber = (phoneNum: string) => {
    return phoneNum
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  };

  const onParsingDecimal = (decimal: string) => {
    return decimal
      .replace(/[^0-9.]/g, '')
      .replace(/^0+(?!\.)/, '')
      .replace(/(\.\d{2})\d*/, '$1');
  };

  const addComma = (price: number) => {
    if (price === 0) return '';
    const returnString = price
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return returnString;
  };

  const thumbnailHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0];
      setThumbnailTitle(file.name);
      try {
        const res = await uploadFile(file);
        const url = res || '';
        const imageName = url.split(VITE_S3_DOMAIN)[1];
        // const imageUrl = VITE_CLOUD_FRONT_DOMAIN + imageName + DEFAULT_OPTIONS;
        const imageUrl = VITE_S3_DOMAIN + imageName;
        setThumbnail(imageUrl);
        setImages(imageUrl);
      } catch (error) {
        const err = error as AxiosError;
        return { ...err.response, success: false };
      }
    }
  };

  if (!user) return <Navigate to="/login" />;

  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
      {isPostcodeOpen && (
        <AddressModal
          callback={postCodeCallback}
          setIsPostcodeOpen={setIsPostcodeOpen}
        />
      )}
      <article className={styles.waringContainer}>
        <span>매물 등록</span>
        <p>주의사항</p>
        <ul>
          <li>
            일반 회원은 매물 신청 후 관리자의 승인 이후 농가거래 게시물 내
            반영됩니다.
          </li>
          <li>
            허위 매물 업로드 시, 탈퇴 조치 및 법적인 처발을 받으실 수 있습니다.
          </li>
          <li>
            매물 거래 완료 이후에는 <span>마이페이지</span> 내 매물 상태 변경
            부탁드립니다.
          </li>
          <li>
            주의사항을 읽지 않아 일어나는 문제에 대하여 책임은 게시물 신청자에게
            있습니다.
          </li>
        </ul>
      </article>
      <article className={styles.sellerInfoContainer}>
        <span>임대정보 및 판매자 정보</span>
        <p>해당 정보는 필수로 입력해야 하는 값입니다.</p>
        <div>
          <div>
            <label>
              매물 유형<span className={styles.essential}>*</span>
            </label>
            <ul>
              {houseCategory.slice(1).map((item) => (
                <button
                  key={item.type}
                  type="button"
                  className={
                    form.houseType === item.type
                      ? styles.selectRentalType
                      : styles.rentalType
                  }
                  onClick={() => {
                    setForm((prev: TradeBoardForm) => ({
                      ...prev,
                      houseType: item.type as HouseType,
                    }));
                  }}
                >
                  {item.content}
                </button>
              ))}
            </ul>
          </div>
          <div>
            <label>
              거래 형태<span className={styles.essential}>*</span>
            </label>
            <ul>
              {tradeCategory.slice(1).map((item) => (
                <button
                  key={item.type}
                  type="button"
                  className={
                    form.rentalType === item.type
                      ? styles.selectRentalType
                      : styles.rentalType
                  }
                  onClick={() => {
                    setForm((prev: TradeBoardForm) => ({
                      ...prev,
                      rentalType: item.type as RentalType,
                    }));
                  }}
                >
                  {item.content}
                </button>
              ))}
            </ul>
          </div>
          <div>
            <label htmlFor="메인 사진">
              메인 사진<span className={styles.essential}>*</span>
            </label>
            <input
              id="메인 사진"
              type="text"
              placeholder="사진 업로드"
              value={thumbnailTitle}
              readOnly
              onClick={() => {
                thumbnailRef.current?.click();
              }}
            />
            <input
              ref={thumbnailRef}
              style={{ display: 'none' }}
              type="file"
              onChange={thumbnailHandler}
            />
            <button
              type="button"
              onClick={() => {
                thumbnailRef.current?.click();
              }}
            >
              <span>업로드</span>
              <MdUploadFile />
            </button>
          </div>
          <div>
            <label htmlFor="매물 위치">
              매물 위치<span className={styles.essential}>*</span>
            </label>
            <input
              id="매물 위치"
              type="text"
              placeholder="시도 도로명주소 기재"
              name="city"
              readOnly
              onChange={onChangeForm}
              value={form.city}
            />
            <button
              type="button"
              onClick={() => {
                setIsPostcodeOpen((pre) => !pre);
              }}
            >
              <span>주소 찾기</span>
              <FiSearch />
            </button>
          </div>
          <div>
            <label style={{ visibility: 'hidden' }} htmlFor="우편번호">
              우편번호
            </label>
            <input
              id="우편번호"
              type="text"
              placeholder="우편번호"
              name="zipCode"
              readOnly
              value={form.zipCode}
            />
          </div>
          <div>
            <label style={{ visibility: 'hidden' }} htmlFor="상세주소">
              상세주소
            </label>
            <input
              id="상세주소"
              type="text"
              placeholder="상세주소 입력"
              name="detail"
              onChange={onChangeForm}
              value={form.detail}
            />
          </div>
          <div>
            <label htmlFor="임대 가격">
              {getRentalPriceType(form.rentalType)}
              <span className={styles.essential}>*</span>
            </label>
            <input
              id="임대 가격"
              placeholder="만원 단위로 표기"
              name="price"
              value={addComma(form.price) || ''}
              onChange={onChangePoints}
            />
          </div>
          <div
            style={{
              display: form.rentalType === 'MONTHLYRENT' ? '' : 'none',
            }}
          >
            <label htmlFor="월세">
              월세<span className={styles.essential}>*</span>
            </label>
            <input
              id="월세"
              placeholder="만원 단위로 표기"
              name="monthlyPrice"
              value={addComma(form.monthlyPrice) || ''}
              onChange={onChangePoints}
            />
          </div>
          <div>
            <label htmlFor="전화번호">
              전화번호<span className={styles.essential}>*</span>
            </label>
            <input
              id="전화번호"
              type="text"
              placeholder="매물 관련 연락 가능한 연락처"
              name="contact"
              value={form.contact}
              onChange={(event) =>
                onChangeForm({
                  ...event,
                  target: {
                    ...event.target,
                    name: 'contact',
                    value: onParsingPhoneNumber(event.target.value),
                  },
                })
              }
            />
          </div>
          {user?.userType === 'AGENT' && (
            <div>
              <label htmlFor="공인중개사명">
                공인중개사명<span className={styles.essential}>*</span>
              </label>
              <input
                id="공인중개사명"
                type="text"
                placeholder="부동산명 표기"
                name="agentName"
                value={form.agentName}
                onChange={onChangeForm}
              />
            </div>
          )}
          {user?.userType === 'AGENT' && (
            <div>
              <label htmlFor="상세 설명">
                상세 설명<span className={styles.essential}>*</span>
              </label>
              <input
                id="상세 설명"
                type="text"
                placeholder="부동산을 소개할 수 있는 링크 첨부"
                name="agentDetail"
                value={form.agentDetail}
                onChange={onChangeForm}
              />
            </div>
          )}
        </div>
      </article>
      <article className={styles.basicInfoContainer}>
        <span>기본 정보</span>
        <p>*는 필수로 입력해야 하는 값입니다.</p>
        <div>
          <div className={styles.additionalIinfoContainer}>
            <div>
              <label htmlFor="매물 면적">
                매물 면적<span className={styles.essential}>*</span>
              </label>
              <input
                id="매물 면적"
                type="text"
                placeholder="㎡ 단위로 표기"
                name="size"
                value={form.size}
                onChange={(event) =>
                  onChangeForm({
                    ...event,
                    target: {
                      ...event.target,
                      name: 'size',
                      value: onParsingDecimal(event.target.value),
                    },
                  })
                }
              />
            </div>
            <p>*1평은 약 3.3제곱미터(㎡)입니다.</p>
          </div>
          <div>
            <label htmlFor="준공연도">준공연도</label>
            <input
              id="준공연도"
              type="text"
              placeholder="년도로 표기"
              name="createdDate"
              value={form.createdDate}
              onChange={onChangeForm}
            />
          </div>
          <div>
            <label htmlFor="매물 용도">매물 용도</label>
            <input
              id="매물 용도"
              type="text"
              placeholder="용도 및 방 개수, 화장실 개수 포함"
              name="purpose"
              value={form.purpose}
              onChange={onChangeForm}
            />
          </div>
          {/* <div>
            <label htmlFor="층수">층수</label>
            <input
              id="층수"
              type="number"
              placeholder="아파트, 빌라와 같은 다가구 주택만 작성"
              name="floorNum"
              value={form.floorNum}
              onChange={onChangeForm}
            />
          </div> */}
        </div>
      </article>
      <article className={styles.specialInfoContainer}>
        <span>매물 특징</span>
        <p>
          해당 매물을 추천하는 사람의 특징에 해당하는 것에 모두 선택해주세요.
        </p>
        <ul>
          {specialCategory.map((category) => (
            <button
              key={category.type}
              type="button"
              className={
                form.recommendedTag.includes(category.type)
                  ? styles.selectSpecial
                  : styles.special
              }
              onClick={() => {
                if (form.recommendedTag.includes(category.type)) {
                  setForm((prev) => ({
                    ...prev,
                    recommendedTag: prev.recommendedTag.filter(
                      (item) => item !== category.type,
                    ),
                  }));
                } else {
                  setForm((prev) => ({
                    ...prev,
                    recommendedTag: [...prev.recommendedTag, category.type],
                  }));
                }
              }}
            >
              {category.content}
            </button>
          ))}
        </ul>
      </article>
      <div className={styles.line} />
      <article className={styles.detailInfoContainer}>
        <span>상세 설명 및 지역 설명</span>
        <p>지역과 관련된 내용을 작성해주세요.</p>
        <TradeQuill
          form={form}
          onChangeForm={onChangeForm}
          setForm={setForm}
          thumbnail={thumbnail}
        />
      </article>
    </motion.div>
  );
}
