import { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdUploadFile } from 'react-icons/md';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import AddressModal from '@/components/Trade/AddressModal';
import TradeQuill from '@/components/Trade/Quill';
import { TradeBoardForm } from '@/types/Board/tradeType';
import { uploadFile } from '@/apis/uploadS3';
import userStore from '@/store/userStore';
import { getRentalPriceType } from '@/utils/utils';
import { DEFAULT_OPTIONS } from '@/constants/image';
import { specialCategory, tradeCategory } from '@/constants/trade';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

const { VITE_S3_DOMAIN, VITE_CLOUD_FRONT_DOMAIN } = import.meta.env;

export default function TradeWritePage() {
  const { user } = userStore();

  const [form, setForm] = useState<TradeBoardForm>({
    rentalType: 'SALE',
    city: '',
    zipCode: '',
    size: '',
    purpose: '',
    floorNum: 0,
    contact: '',
    createdDate: '',
    price: 0,
    monthlyPrice: 0,
    agentName: '',
    title: '',
    code: '',
    imageUrls: [],
    tmpYn: false,
    recommendedTag: [],
  });

  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailTitle, setThumbnailTitle] = useState('');
  const thumbnailRef = useRef<HTMLInputElement>(null);
  // 매물특징
  // const appendSpecialCategory = (category: string) => {};
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const thumbnailHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0];
      setThumbnailTitle(file.name);
      try {
        const res = await uploadFile(file);
        const url = res || '';
        const imageName = url.split(VITE_S3_DOMAIN)[1];
        const imageUrl = VITE_CLOUD_FRONT_DOMAIN + imageName + DEFAULT_OPTIONS;
        setThumbnail(imageUrl);
      } catch (error) {
        const err = error as AxiosError;
        return { ...err.response, success: false };
      }
    }
  };
  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
      {isPostcodeOpen && (
        <AddressModal setForm={setForm} setIsPostcodeOpen={setIsPostcodeOpen} />
      )}
      <article className={styles.waringContainer}>
        <span>매물 등록</span>
        <p>주의사항</p>
        <ul>
          <li>
            일반 회원은 매물 신청 후 관리자의 승인 이후 빈집중개 게시물 내
            반영됩니다.
          </li>
          <li>
            허위 매물 업로드 시, 탈퇴 조치 및 번적인 처발을 받으실 수 있습니다.
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
            <label>매물 유형</label>
            <ul>
              {tradeCategory.map((item) => (
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
                      rentalType: item.type,
                    }));
                  }}
                >
                  {item.content}
                </button>
              ))}
            </ul>
          </div>
          <div>
            <label htmlFor="메인 사진">메인 사진</label>
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
            <label htmlFor="매물 위치">매물 위치</label>
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
              id="상세 주소"
              type="text"
              placeholder="상세주소"
              name="zipCode"
              readOnly
              value={form.zipCode}
            />
          </div>
          <div>
            <label htmlFor="임대 가격">
              {getRentalPriceType(form.rentalType)}
            </label>
            <input
              id="임대 가격"
              type="number"
              placeholder="만원으로 표기"
              name="price"
              onChange={onChangeForm}
            />
          </div>
          <div
            style={{
              display: form.rentalType === 'MONTHLYRENT' ? '' : 'none',
            }}
          >
            <label htmlFor="월세">월세</label>
            <input
              id="월세"
              type="number"
              placeholder="만원으로 표기"
              name="monthlyPrice"
              onChange={onChangeForm}
            />
          </div>
          <div>
            <label htmlFor="전화번호">전화번호</label>
            <input
              id="전화번호"
              type="text"
              placeholder="01000000000 표기(매물 관련 연락 가능한 연락처)"
              name="contact"
              onChange={onChangeForm}
            />
          </div>
          {user?.userType === 'AGENT' && (
            <div>
              <label htmlFor="공인중개사명">공인중개사명</label>
              <input
                id="공인중개사명"
                type="text"
                placeholder="부동산명 표기"
                name="agentName"
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
          <div>
            <label htmlFor="매물 면적">
              매물 면적<span>*</span>
            </label>
            <input
              id="매물 면적"
              type="text"
              placeholder="m2로 표기"
              name="size"
              onChange={onChangeForm}
            />
          </div>
          <div>
            <label htmlFor="준공연도">
              준공연도<span>*</span>
            </label>
            <input
              id="준공연도"
              type="text"
              placeholder="년도로 표기"
              name="createdDate"
              onChange={onChangeForm}
            />
          </div>
          <div>
            <label htmlFor="매물 용도">
              매물 용도<span>*</span>
            </label>
            <input
              id="매물 용도"
              type="text"
              placeholder="용도 및 방 개수, 화장실 개수 포함"
              name="purpose"
              onChange={onChangeForm}
            />
          </div>
          <div>
            <label htmlFor="층수">층수</label>
            <input
              id="층수"
              type="number"
              placeholder="아파트, 빌라와 같은 다가구 주택만 작성"
              name="floorNum"
              onChange={onChangeForm}
            />
          </div>
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
