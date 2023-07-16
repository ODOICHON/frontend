import { FiSearch } from 'react-icons/fi';
import { MdUploadFile } from 'react-icons/md';
import TradeQuill from '@/components/Trade/Quill';
import { motion } from 'framer-motion';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function TradeWritePage() {
  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
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
              <li>매매</li>
              <li>전세</li>
              <li>월세</li>
            </ul>
          </div>
          <div>
            <label htmlFor="메인 사진">메인 사진</label>
            <input id="메인 사진" type="text" placeholder="사진 업로드" />
            <button type="button">
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
            />
            <button type="button">
              <span>주소 찾기</span>
              <FiSearch />
            </button>
          </div>
          <div>
            <label style={{ visibility: 'hidden' }} htmlFor="상세 주소">
              상세 주소
            </label>
            <input id="상세 주소" type="text" placeholder="상세주소" />
          </div>
          <div>
            <label htmlFor="임대 가격">임대 가격</label>
            <input id="임대 가격" type="text" placeholder="만원으로 표기" />
          </div>
          <div>
            <label htmlFor="전화번호">전화번호</label>
            <input
              id="전화번호"
              type="text"
              placeholder="01000000000 표기(매물 관련 연락 가능한 연락처)"
            />
          </div>
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
            <input id="매물 면적" type="text" placeholder="m2로 표기" />
          </div>
          <div>
            <label htmlFor="준공연도">
              준공연도<span>*</span>
            </label>
            <input id="준공연도" type="text" placeholder="년도로 표기" />
          </div>
          <div>
            <label htmlFor="매물 용도">
              매물 용도<span>*</span>
            </label>
            <input
              id="매물 용도"
              type="text"
              placeholder="용도 및 방 개수, 화장실 개수 포함"
            />
          </div>
          <div>
            <label htmlFor="층수">층수</label>
            <input
              id="층수"
              type="text"
              placeholder="아파트, 빌라와 같은 다가구 주택만 작성"
            />
          </div>
        </div>
      </article>
      <div className={styles.line} />
      <article className={styles.detailInfoContainer}>
        <span>상세 설명 및 지역 설명</span>
        <p>지역과 관련된 내용을 작성해주세요.</p>
        <TradeQuill />
      </article>
    </motion.div>
  );
}
