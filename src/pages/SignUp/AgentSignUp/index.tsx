import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoImage from '@/assets/common/logo.svg';
import AddressModal from '@/components/Trade/AddressModal';
import userStore from '@/store/userStore';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';
import signUpStyles from '../styles.module.scss';

export default function AgentSignUpPage() {
  const { token } = userStore();
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const [companyAddress, setCompanyAddress] = useState('');

  const postCodeCallback = (fullAddress: string) => {
    setCompanyAddress(fullAddress);
  };

  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <motion.div
      variants={opacityVariants}
      initial="initial"
      animate="mount"
      className={signUpStyles.container}
    >
      {isPostcodeOpen && (
        <AddressModal
          callback={postCodeCallback}
          setIsPostcodeOpen={setIsPostcodeOpen}
        />
      )}
      <img className={signUpStyles.logo} src={logoImage} alt="로고" />
      <section className={styles.subtitle}>
        <h3>
          <strong>공인중개사</strong> 회원가입 안내사항
        </h3>
        <div className={styles.descriptionWrapper}>
          <div>
            <p>주말내집의 공인중개사 회원가입은</p>
            <p>
              <strong>국가공간정보포털의 부동산중개업 정보에 등록된</strong>
            </p>
            <p>
              <strong>대표 공인중개사</strong>만 가능합니다.
            </p>
          </div>
          <ul>
            <li>
              공인중개사 회원은 <strong> 담당자가 확인 후 가입 승인</strong>해
              드리기에 승인 기간이 소요되는 점 참고 부탁드립니다.
            </li>
            <li>
              중개사무소 정보를 <strong>정확히</strong> 입력해주세요.
            </li>
          </ul>
        </div>
      </section>
      <form className={signUpStyles.formContent}>
        {/* 공인중개사 등록번호 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="agent_code">공인중개사 등록번호</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="agent_code"
              type="text"
              placeholder="‘-’ 포함하여 작성 숫자 14자리"
            />
          </div>
        </div>
        {/* 사업자 등록번호 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="business_code">공인중개사 등록번호</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="business_code"
              type="text"
              placeholder="‘-’ 포함하여 작성 숫자 10자리"
            />
          </div>
        </div>
        {/* 공인중개사 사무소 상호명 & 대표자 이름 */}
        <div style={{ display: 'flex', gap: '1.3rem' }}>
          {/* 공인중개사 사무소 상호명 */}
          <div className={signUpStyles.inputContainer}>
            <label htmlFor="company_name">공인중개사 사무소 상호명</label>
            <div className={signUpStyles.inputInline}>
              <input
                className={signUpStyles.inputStyle}
                id="company_name"
                type="text"
                placeholder="상호명"
              />
            </div>
          </div>
          {/* 대표자 이름 */}
          <div className={signUpStyles.inputContainer}>
            <label htmlFor="agent_name">대표자 이름</label>
            <div className={signUpStyles.inputInline}>
              <input
                className={signUpStyles.inputStyle}
                id="agent_name"
                type="text"
                placeholder="부동산 대표자명으로 작성"
              />
            </div>
          </div>
        </div>
        {/* 공인중개사 사무소 대표 전화번호 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="company_phone_num">
            공인중개사 사무소 대표 전화번호
          </label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="company_phone_num"
              type="text"
              placeholder="지역번호까지 입력 예) 02, 031"
            />
          </div>
        </div>
        {/* 중개 보조원명 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="assistant_name">중개 보조원명</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="assistant_name"
              type="text"
              placeholder="중개 보조원일 경우에만 작성/대표자인 경우 작성 X"
            />
          </div>
        </div>
        {/* 공인중개사 사무소 주소 & 상세 주소 */}
        <div className={signUpStyles.inputContainer}>
          {/* 공인중개사 사무소 주소 */}
          <label htmlFor="company_address">공인중개사 사무소 주소</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="company_address"
              type="text"
              value={companyAddress}
              readOnly
            />
            <button
              type="button"
              className={signUpStyles.buttonStyle}
              onClick={() => {
                setIsPostcodeOpen((pre) => !pre);
              }}
            >
              주소 찾기
            </button>
          </div>
          {/* 상세 주소 */}
          <input
            className={signUpStyles.inputStyle}
            style={{ marginTop: '1.25rem' }}
            id="company_address_detail"
            type="text"
            placeholder="상세 주소까지 작성"
          />
        </div>
        {/* 이메일 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="company_address_detail">이메일</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="company_address_detail"
              type="email"
              placeholder="본인 명의 이메일 작성"
            />
            <button type="button" className={signUpStyles.buttonStyle}>
              중복확인
            </button>
          </div>
        </div>
        <div className={signUpStyles.horizonLine} />
        {/* 아이디 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="id">아이디</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="id"
              type="text"
              placeholder="4~20자리/영문, 숫자, 특수문자’_’사용가능"
            />
            <button type="button" className={signUpStyles.buttonStyle}>
              중복확인
            </button>
          </div>
        </div>
        {/* 비밀번호 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="password">비밀번호</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="password"
              type="password"
              placeholder="8~16자리/영문 대소문자, 숫자, 특수문자 조합"
            />
          </div>
        </div>
        {/* 비밀번호 확인 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="passwordCheck"
              type="password"
              placeholder="8~16자리/영문 대소문자, 숫자, 특수문자 조합"
            />
          </div>
        </div>
        {/* 닉네임 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="nick_name">닉네임</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="nick_name"
              type="text"
              placeholder="20자 이하의 조합 "
            />
            <button type="button" className={signUpStyles.buttonStyle}>
              중복확인
            </button>
          </div>
        </div>
        {/* 휴대폰 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="phone_num">휴대폰</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="phone_num"
              type="text"
              placeholder="‘-’빼고 숫자만 입력"
            />
            <button type="button" className={signUpStyles.buttonStyle}>
              중복확인
            </button>
          </div>
        </div>
        {/* 주거래 매물 */}
        <div className={signUpStyles.inputContainer}>
          <label>주거래 매물</label>
          <div className={signUpStyles.boxContainer}>
            <span>
              <input id="아파트" type="radio" value="아파트" />
              <label htmlFor="아파트">아파트</label>
            </span>
            <span>
              <input id="주택" type="radio" value="주택" />
              <label htmlFor="주택">주택</label>
            </span>
            <span>
              <input id="농가" type="radio" value="농가" />
              <label htmlFor="농가">농가</label>
            </span>
          </div>
        </div>
        {/* 연령대 */}
        <div className={signUpStyles.inputContainer}>
          <label>연령대</label>
          <div className={signUpStyles.boxContainer}>
            <span>
              <input id="20대 미만" type="radio" value="20대 미만" />
              <label htmlFor="20대 미만">20대 미만</label>
            </span>
            <span>
              <input id="20대" type="radio" value="20대" />
              <label htmlFor="20대">20대</label>
            </span>
            <span>
              <input id="30대" type="radio" value="30대" />
              <label htmlFor="30대">30대</label>
            </span>
            <span>
              <input id="40대" type="radio" value="40대" />
              <label htmlFor="40대">40대</label>
            </span>
            <span>
              <input id="50대" type="radio" value="50대" />
              <label htmlFor="50대">50대</label>
            </span>
            <span>
              <input id="60대 이상" type="radio" value="60대 이상" />
              <label htmlFor="60대 이상">60대 이상</label>
            </span>
          </div>
        </div>
        {/* 가입경로 */}
        <div className={signUpStyles.inputContainer}>
          <label>가입경로(복수선택 가능)</label>
          <div className={signUpStyles.boxContainer}>
            <span>
              <input id="지인 소개" type="checkbox" value="지인 소개" />
              <label htmlFor="지인 소개">지인소개</label>
            </span>
            <span>
              <input id="네이버 카페" type="checkbox" value="네이버 카페" />
              <label htmlFor="네이버 카페">네이버 카페</label>
            </span>
            <span>
              <input id="네이버 블로그" type="checkbox" value="네이버 블로그" />
              <label htmlFor="네이버 블로그">네이버 블로그</label>
            </span>
            <span>
              <input id="네이버 밴드" type="checkbox" value="네이버 밴드" />
              <label htmlFor="네이버 밴드">네이버 밴드</label>
            </span>
            <span>
              <input id="페이스북" type="checkbox" value="페이스북" />
              <label htmlFor="페이스북">페이스북</label>
            </span>
            <span>
              <input id="인스타그램" type="checkbox" value="인스타그램" />
              <label htmlFor="인스타그램">인스타그램</label>
            </span>
            <span>
              <input id="검색" type="checkbox" value="검색" />
              <label htmlFor="검색">검색</label>
            </span>
            <span>
              <input id="기타" type="checkbox" value="기타" />
              <label htmlFor="기타">기타</label>
            </span>
          </div>
        </div>
        <div className={signUpStyles.horizonLine} />
        {/* 약관 */}
        <div className={signUpStyles.inputContainer}>
          <div className={signUpStyles.inputContainerTitle}>
            <label>약관</label>
            <span>
              <input id="allSelect" type="checkbox" />
              <label htmlFor="allSelect">전체동의</label>
            </span>
          </div>
          <div className={signUpStyles.termsContainer}>
            <span>
              <input id="service_term" type="checkbox" />
              <label htmlFor="service_term">서비스 이용약관에 동의(필수)</label>
            </span>
            <button className={signUpStyles.termsButton} type="button">
              약관보기 &gt;
            </button>
          </div>
          <div
            className={signUpStyles.termsContainer}
            style={{ marginBottom: '1.7rem' }}
          >
            <span>
              <input id="privacy_term" type="checkbox" />
              <label htmlFor="privacy_term">
                개인정보 수집 및 이용 동의(선택)
              </label>
            </span>
            <button className={signUpStyles.termsButton} type="button">
              약관보기 &gt;
            </button>
          </div>

          <div className={signUpStyles.termsContainer}>
            <span>
              <input id="marketing_term" type="checkbox" />
              <label htmlFor="marketing_term">
                마켓팅 활용 및 광고성 정보 수신 동의(선택)
              </label>
            </span>
            <button className={signUpStyles.termsButton} type="button">
              약관보기 &gt;
            </button>
          </div>
        </div>

        <button type="button" className={signUpStyles.signUpButton}>
          회원가입
        </button>
      </form>
    </motion.div>
  );
}
