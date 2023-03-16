import logoImage from '@/assets/common/logo.svg';
import eyeImage from '@/assets/common/eye.svg';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { useRef, useState } from 'react';
import Terms from '@/components/Terms';

type IForm = {
  id: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  phone: string;
  age: string;
  signUpRoute: string;
  terms: boolean;
};

export default function SignUpPage() {
  const { register, watch } = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      id: '',
      password: '',
      passwordCheck: '',
      nickname: '',
      phone: '',
    },
  });
  const [toggle, setToggle] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const onToggleClick = () => {
    const bodyEl = document.querySelector('body');
    bodyEl?.classList.add('over_hidden');
    setToggle(true);
  };
  // TODO: 눈 이미지 클릭 시 input창 포커스 방법 모색
  const onEyeClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (e.currentTarget.id === 'passwordEye') {
      console.log(passwordRef.current?.type);
    }
  };
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logoImage} alt="로고" />
      <form className={styles.formContent}>
        <div className={styles.inputContainer}>
          <label htmlFor="id">아이디</label>
          <div className={styles.inputInline}>
            <input
              className={styles.inputStyle}
              id="id"
              type="text"
              placeholder="4~20자리/영문, 숫자, 특수문자’_’사용가능"
              {...register('id')}
            />
            <button type="button" className={styles.buttonStyle}>
              중복확인
            </button>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">비밀번호</label>
          <input
            className={styles.inputStyle}
            id="password"
            type="password"
            placeholder="8~16자리/영문 대소문자, 숫자, 특수문자 조합"
            {...register('password')}
          />
          {watch('password') !== '' && (
            <img
              id="passwordEye"
              className={styles.eyeImage}
              src={eyeImage}
              onClick={onEyeClick}
              alt="eyeImage"
            />
          )}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input
            className={styles.inputStyle}
            id="passwordCheck"
            type="password"
            placeholder="8~16자리/영문 대소문자, 숫자, 특수문자 조합"
            {...register('passwordCheck')}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="nickname">닉네임</label>
          <div className={styles.inputInline}>
            <input
              className={styles.inputStyle}
              id="nickname"
              type="text"
              placeholder="20자 이하의 조합 "
              {...register('nickname')}
            />
            <button type="button" className={styles.buttonStyle}>
              중복확인
            </button>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="phone">휴대폰</label>
          <div className={styles.inputInline}>
            <input
              className={styles.inputStyle}
              id="phone"
              type="text"
              placeholder="‘-’빼고 숫자만 입력"
              {...register('phone')}
            />
            <button type="button" className={styles.buttonStyle}>
              인증요청
            </button>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label>연령대</label>
          <div className={styles.boxContainer}>
            <span>
              <input
                id="under20"
                type="radio"
                value="under20"
                {...register('age')}
              />
              <label htmlFor="under20">20대 미만</label>
            </span>
            <span>
              <input id="20" type="radio" value="20" {...register('age')} />
              <label htmlFor="20">20대</label>
            </span>
            <span>
              <input id="30" type="radio" value="30대" {...register('age')} />
              <label htmlFor="30">30대</label>
            </span>
            <span>
              <input id="40" type="radio" value="40대" {...register('age')} />
              <label htmlFor="40">40대</label>
            </span>
            <span>
              <input id="50" type="radio" value="50대" {...register('age')} />
              <label htmlFor="50">50대</label>
            </span>
            <span>
              <input
                id="over60"
                type="radio"
                value="60대 이상"
                {...register('age')}
              />
              <label htmlFor="over60">60대 이상</label>
            </span>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label>가입경로(복수선택 가능)</label>
          <div className={styles.boxContainer}>
            <span>
              <input
                id="friend"
                type="checkbox"
                value="friend"
                {...register('signUpRoute')}
              />
              <label htmlFor="friend">지인소개</label>
            </span>
            <span>
              <input
                id="cafe"
                type="checkbox"
                value="cafe"
                {...register('signUpRoute')}
              />
              <label htmlFor="cafe">네이버 카페</label>
            </span>
            <span>
              <input
                id="blog"
                type="checkbox"
                value="blog"
                {...register('signUpRoute')}
              />
              <label htmlFor="blog">네이버 블로그</label>
            </span>
            <span>
              <input
                id="banc"
                type="checkbox"
                value="banc"
                {...register('signUpRoute')}
              />
              <label htmlFor="banc">네이버 밴드</label>
            </span>
            <span>
              <input
                id="facebook"
                type="checkbox"
                value="facebook"
                {...register('signUpRoute')}
              />
              <label htmlFor="facebook">페이스북</label>
            </span>
            <span>
              <input
                id="instagram"
                type="checkbox"
                value="instagram"
                {...register('signUpRoute')}
              />
              <label htmlFor="instagram">인스타그램</label>
            </span>
            <span>
              <input
                id="search"
                type="checkbox"
                value="search"
                {...register('signUpRoute')}
              />
              <label htmlFor="search">검색</label>
            </span>
            <span>
              <input
                id="etc"
                type="checkbox"
                value="etc"
                {...register('signUpRoute')}
              />
              <label htmlFor="etc">기타</label>
            </span>
          </div>
        </div>
        <div className={styles.horizonLine} />
        <div className={styles.inputContainer}>
          <label>약관</label>
          <div className={styles.termsContainer}>
            <span>
              <input id="terms" type="checkbox" {...register('terms')} />
              <label htmlFor="terms">서비스 이용약관에 동의(필수)</label>
            </span>
            <button
              className={styles.termsButton}
              type="button"
              onClick={onToggleClick}
            >
              약관보기 &gt;
            </button>
          </div>
        </div>
        <button className={styles.signUpButton}>회원가입</button>
      </form>
      {toggle ? <Terms setToggle={setToggle} /> : null}
    </div>
  );
}
