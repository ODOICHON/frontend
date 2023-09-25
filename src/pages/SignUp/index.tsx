import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import eyeImage from '@/assets/common/eye.svg';
import eyeClosedImage from '@/assets/common/eyeClosed.svg';
import logoImage from '@/assets/common/logo.svg';
import { restFetcher } from '@/queryClient';
import Terms from '@/components/Terms';
import userStore from '@/store/userStore';
import useCheckAPI from '@/hooks/useCheckAPI';
import { TermType } from '@/types/signUp';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

type SignUpTerm =
  | 'SERVICE_USED_AGREE'
  | 'PERSONAL_INFO_USED_AGREE'
  | 'MARKETING_ADVERTISEMENT_AGREE';

type IForm = {
  userName: string;
  email: string;
  email_code: string;
  password: string;
  password_check: string;
  nick_name: string;
  phone_num: string;
  phone_check: string;
  age: string;
  join_paths: string[];
  service_term: boolean;
};
type ISubmitForm = {
  userName: string;
  email: string;
  password: string;
  nick_name: string;
  phone_num: string;
  age: string;
  join_paths: string[];
  terms: SignUpTerm[];
};

export default function SignUpPage() {
  const { token } = userStore();
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false); // 약관 토글
  const [eyeState, setEyeState] = useState(false);
  const [eyeCheckState, setEyeCheckState] = useState(false);
  const [isCheckNum, setIsCheckNum] = useState(false); // 전화번호 인증 중 상태
  const [phoneSMSCheck, setPhoneSMSCheck] = useState(false); // 전화번호 인증 완료 상태
  const [phoneSMSMessage, setPhoneSMSMessage] = useState<string | undefined>(); // 전화번호 인증 상태 메세지
  const [phoneErrMessage, setPhoneErrMessage] = useState<string | undefined>(); // 전화번호 에러 메세지
  const [isCheckEmail, setIsCheckEmail] = useState(false); // 이메일 인증 중 상태
  const [emailCheck, setEmailCheck] = useState(false); // 이메일 인증 완료 상태
  const [emailMessage, setEmailMessage] = useState<string | undefined>(); // 이메일 인증 상태 메세지
  const [emailErrMessage, setEmailErrMessage] = useState<string | undefined>(); // 이메일 에러 메세지
  const [isServiceTerm, setIsServiceTerm] = useState(false);
  const [isPrivacyTerm, setIsPrivacyTerm] = useState(false);
  const [isMarketingTerm, setIsMarketingTerm] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<TermType>('');

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      userName: '',
      email: '',
      email_code: '',
      password: '',
      password_check: '',
      nick_name: '',
      phone_num: '',
      phone_check: '',
      age: '',
      join_paths: [],
      service_term: false,
    },
  });
  const { mutate: idCheckAPI } = useMutation((userName: string) =>
    restFetcher({
      method: 'POST',
      path: '/users/check/user-name',
      body: { userName },
    }),
  );
  const { mutate: nicknameCheckAPI } = useMutation((nick_name: string) =>
    restFetcher({
      method: 'POST',
      path: '/users/check/nick-name',
      body: { nick_name },
    }),
  );
  const { mutate: phoneSMSAPI } = useMutation((phone_num: string) =>
    restFetcher({
      method: 'POST',
      path: '/users/send/sms',
      body: { phone_num },
    }),
  );
  const { mutate: phoneCheckAPI } = useMutation((phone_check: string) =>
    restFetcher({
      method: 'POST',
      path: '/users/check/sms',
      body: { phone_num: watch('phone_num'), code: phone_check },
    }),
  );
  const { mutate: emailSendAPI } = useMutation((email: string) =>
    restFetcher({
      method: 'POST',
      path: '/users/send/email',
      body: { email },
    }),
  );
  const { mutate: emailCheckAPI } = useMutation(
    (body: { email: string; code: string }) =>
      restFetcher({
        method: 'POST',
        path: '/users/check/email',
        body,
      }),
  );
  const { mutate: singUpAPI } = useMutation((form: ISubmitForm) =>
    restFetcher({
      method: 'POST',
      path: '/users/sign-up',
      body: form,
    }),
  );

  const [
    idCheck,
    idCheckMessage,
    idCheckHandler,
    setIdCheck,
    setIdCheckMessage,
  ] = useCheckAPI(
    idCheckAPI,
    /^(?=.*[A-Za-z])[A-Za-z_0-9]{4,20}$/g,
    watch('userName'),
    '사용가능한 ID입니다.',
    '이미 존재하는 아이디 입니다.',
    '4~20자리/영문, 숫자, 특수문자’_’만 사용해주세요.',
  );
  const [
    nicknameCheck,
    nicknameCheckMessage,
    nicknameCheckHandler,
    setNicknameCheck,
    setNicknameCheckMessage,
  ] = useCheckAPI(
    nicknameCheckAPI,
    /^(?=.*[a-zA-Z0-9가-힣])[A-Za-z0-9가-힣]{1,20}$/g,
    watch('nick_name'),
    '사용가능한 닉네임입니다.',
    '이미 존재하는 닉네임 입니다.',
    '닉네임 형식에 맞지 않습니다.',
  );
  const onToggleClick = (term: TermType) => {
    const bodyEl = document.querySelector('body');
    bodyEl?.classList.add('over_hidden');
    setToggle(true);
    setSelectedTerm(term);
  };
  const onEyeClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (e.currentTarget.id === 'passwordEye') setEyeState((prev) => !prev);
    else setEyeCheckState((prev) => !prev);
  };
  const onSendSMS = () => {
    if (/^01(?:0|1|[6-9])[0-9]{7,8}$/g.test(watch('phone_num')) === false)
      return;
    phoneSMSAPI(watch('phone_num'), {
      onSuccess: (res) => {
        if (!res) throw Error;
        setPhoneErrMessage(undefined);
        setIsCheckNum(true);
      },
      onError: () => {
        setPhoneErrMessage('이미 가입된 전화번호입니다.');
      },
    });
  };
  const onCheckSMS = () => {
    if (/^(?=.*[0-9])[0-9]{4}$/g.test(watch('phone_check')) === false) {
      setPhoneSMSCheck(false);
      setPhoneSMSMessage('잘못된 인증번호입니다.');
    }
    phoneCheckAPI(watch('phone_check'), {
      onSuccess: (res) => {
        if (res.data === true) {
          setPhoneSMSCheck(true);
          setPhoneSMSMessage('인증에 성공하셨습니다.');
        } else if (res.data === false) {
          setPhoneSMSCheck(false);
          setPhoneSMSMessage('인증번호가 일치하지 않습니다.');
        }
      },
    });
  };
  const onSendEmail = () => {
    if (
      /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/g.test(
        watch('email'),
      ) === false
    )
      return;
    emailSendAPI(watch('email'), {
      onSuccess: (res) => {
        if (!res) throw Error;
        setEmailErrMessage(undefined);
        setIsCheckEmail(true);
      },
      onError: () => {
        setEmailErrMessage('이미 가입된 이메일입니다.');
      },
    });
  };
  const onCheckEmail = () => {
    if (
      /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/g.test(
        watch('email_code'),
      ) === false
    ) {
      setEmailCheck(false);
      setEmailMessage('잘못된 인증코드입니다.');
    }
    emailCheckAPI(
      { email: watch('email'), code: watch('email_code') },
      {
        onSuccess: (res) => {
          if (res.data === true) {
            setEmailCheck(true);
            setEmailMessage('인증에 성공하셨습니다.');
          } else if (res.data === false) {
            setEmailCheck(false);
            setEmailMessage('인증코드가 일치하지 않습니다.');
          }
        },
      },
    );
  };
  const onChangeInput = (
    setCheckState: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    feild: string,
  ) => {
    setCheckState(false);
    setMessage(`${feild} 중복검사를 해주세요`);
  };
  const getTerms = () => {
    const termsArr: SignUpTerm[] = [];
    if (isServiceTerm) termsArr.push('SERVICE_USED_AGREE');
    if (isPrivacyTerm) termsArr.push('PERSONAL_INFO_USED_AGREE');
    if (isMarketingTerm) termsArr.push('MARKETING_ADVERTISEMENT_AGREE');
    return termsArr;
  };
  const onSubmit = (data: IForm) => {
    if (!idCheck) {
      alert('아이디 중복검사를 해주세요.');
      return;
    }
    if (!nicknameCheck) {
      alert('닉네임 중복검사를 해주세요.');
      return;
    }
    if (!phoneSMSCheck) {
      alert('전화번호 인증을 해주세요.');
      return;
    }
    if (!emailCheck) {
      alert('이메일 인증을 해주세요.');
      return;
    }
    singUpAPI(
      {
        userName: data.userName,
        email: data.email,
        password: data.password,
        nick_name: data.nick_name,
        phone_num: data.phone_num,
        age: data.age,
        join_paths: data.join_paths,
        terms: getTerms(),
      },
      {
        onSuccess: () => {
          alert('회원가입에 성공하였습니다.');
          navigate('/login');
        },
      },
    );
  };
  const handleAllSelect = (isSelected: boolean) => {
    setIsServiceTerm(isSelected);
    setIsPrivacyTerm(isSelected);
    setIsMarketingTerm(isSelected);
  };

  useEffect(() => {
    onChangeInput(setIdCheck, setIdCheckMessage, '아이디');
  }, [watch('userName')]);
  useEffect(() => {
    onChangeInput(setNicknameCheck, setNicknameCheckMessage, '닉네임');
  }, [watch('nick_name')]);
  useEffect(() => {
    setPhoneSMSCheck(false);
    setPhoneSMSMessage('전화번호 인증을 해주세요.');
  }, [watch('phone_num')]);
  useEffect(() => {
    setEmailCheck(false);
    setEmailMessage('이메일 인증을 해주세요.');
  }, [watch('email')]);

  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <motion.div
      variants={opacityVariants}
      initial="initial"
      animate="mount"
      className={styles.container}
    >
      <img className={styles.logo} src={logoImage} alt="로고" />
      <span className={styles.agentSingUp}>
        <h3>
          <strong>공인중개사</strong> 회원이신가요?
        </h3>
        <button
          className={styles.termsButton}
          type="button"
          onClick={() => navigate('/agentSignup')}
        >
          <p>공인중개사 회원가입</p> &gt;
        </button>
      </span>
      <form className={styles.formContent}>
        {/* 아이디 */}
        <div className={styles.inputContainer}>
          <label htmlFor="userName">아이디</label>
          <div className={styles.inputInline}>
            <input
              className={styles.inputStyle}
              id="userName"
              type="text"
              placeholder="4~20자리/영문, 숫자, 특수문자’_’사용가능"
              {...register('userName', {
                required: '아이디는 필수 입력입니다.',
                pattern: {
                  value: /^(?=.*[A-Za-z])[A-Za-z_0-9]{4,20}$/g,
                  message: '4~20자리/영문, 숫자, 특수문자’_’만 사용해주세요.',
                },
              })}
            />
            <button
              type="button"
              className={
                /^(?=.*[A-Za-z])[A-Za-z_0-9]{4,20}$/g.test(watch('userName'))
                  ? styles.buttonStyleActive
                  : styles.buttonStyle
              }
              onClick={idCheckHandler}
            >
              중복확인
            </button>
          </div>
          <p className={idCheck ? styles.correctMessage : styles.errorMessage}>
            {errors.userName && errors.userName.message}
            {!errors.userName && idCheckMessage && idCheckMessage}
          </p>
        </div>
        {/* 비밀번호 */}
        <div className={styles.inputContainer}>
          <label htmlFor="password">비밀번호</label>
          <input
            className={styles.inputStyle}
            id="password"
            type={eyeState ? 'text' : 'password'}
            placeholder="8~16자리/영문 대소문자, 숫자, 특수문자 조합"
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
              pattern: {
                value:
                  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*.?])[A-Za-z0-9!@#$%^&*.?]{8,16}$/g,
                message:
                  '8~16자리/영문 대소문자, 숫자, 특수문자 조합 중 3가지 이상 조합으로 만들어주세요.',
              },
            })}
          />
          {watch('password') !== '' && (
            <img
              role="presentation"
              id="passwordEye"
              className={styles.eyeImage}
              src={eyeState ? eyeClosedImage : eyeImage}
              onClick={onEyeClick}
              alt="eyeImage"
            />
          )}
          <p className={styles.errorMessage}>
            {errors.password && errors.password.message}
          </p>
        </div>
        {/* 비밀번호 확인 */}
        <div className={styles.inputContainer}>
          <label htmlFor="password_check">비밀번호 확인</label>
          <input
            className={styles.inputStyle}
            id="password_check"
            type={eyeCheckState ? 'text' : 'password'}
            placeholder="8~16자리/영문 대소문자, 숫자, 특수문자 조합"
            {...register('password_check', {
              required: '비밀번호를 확인해주세요.',
              validate: (val: string) => {
                if (watch('password') !== val) {
                  return '같은 비밀번호가 아닙니다.';
                }
              },
            })}
          />
          {watch('password_check') !== '' && (
            <img
              role="presentation"
              id="password_checkEye"
              className={styles.eyeImage}
              src={eyeCheckState ? eyeClosedImage : eyeImage}
              onClick={onEyeClick}
              alt="eyeImage"
            />
          )}
          <p className={styles.errorMessage}>
            {errors.password_check && errors.password_check.message}
          </p>
        </div>
        {/* 닉네임 */}
        <div className={styles.inputContainer}>
          <label htmlFor="nick_name">닉네임</label>
          <div className={styles.inputInline}>
            <input
              className={styles.inputStyle}
              id="nick_name"
              type="text"
              placeholder="20자 이하의 조합"
              {...register('nick_name', {
                required: '닉네임은 필수 입력입니다.',
                pattern: {
                  value: /^(?=.*[a-zA-Z0-9가-힣])[A-Za-z0-9가-힣]{1,20}$/g,
                  message: '20자 이하의 조합만 사용해주세요.',
                },
              })}
            />
            <button
              type="button"
              className={
                /^(?=.*[a-zA-Z0-9가-힣])[A-Za-z0-9가-힣]{1,20}$/g.test(
                  watch('nick_name'),
                )
                  ? styles.buttonStyleActive
                  : styles.buttonStyle
              }
              onClick={nicknameCheckHandler}
            >
              중복확인
            </button>
          </div>
          <p
            className={
              nicknameCheck ? styles.correctMessage : styles.errorMessage
            }
          >
            {errors.nick_name && errors.nick_name.message}
            {!errors.nick_name && nicknameCheckMessage && nicknameCheckMessage}
          </p>
        </div>
        {/* 전화번호 */}
        <div className={styles.inputContainer}>
          <label htmlFor="phone_num">휴대폰</label>
          <div className={styles.inputInline}>
            <input
              className={styles.inputStyle}
              id="phone_num"
              type="text"
              placeholder="‘-’빼고 숫자만 입력"
              {...register('phone_num', {
                required: '전화번호를 입력해주세요.',
                pattern: {
                  value: /^01(?:0|1|[6-9])[0-9]{7,8}$/g,
                  message: '‘-’빼고 숫자만 입력해주세요.',
                },
              })}
            />
            <button
              type="button"
              className={
                /^01(?:0|1|[6-9])[0-9]{7,8}$/g.test(watch('phone_num'))
                  ? styles.buttonStyleActive
                  : styles.buttonStyle
              }
              onClick={onSendSMS}
            >
              인증요청
            </button>
          </div>
          <p className={styles.errorMessage}>
            {errors.phone_num && errors.phone_num.message}
            {!errors.phone_num && phoneErrMessage}
          </p>
        </div>
        {/* 전화번호 인증 */}
        {isCheckNum && (
          <div className={styles.inputContainer}>
            <label htmlFor="phone_num">인증번호</label>
            <div className={styles.inputInline}>
              <input
                className={styles.inputStyle}
                id="phone_num"
                type="text"
                placeholder="인증문자 4자리"
                {...register('phone_check', {
                  required: '휴대폰 번호 인증을 해주세요.',
                  pattern: {
                    value: /^(?=.*[0-9])[0-9]{4}$/g,
                    message: '인증문자 4자리를 입력해주세요.',
                  },
                })}
              />
              <button
                type="button"
                className={
                  /^(?=.*[0-9])[0-9]{4}$/g.test(watch('phone_check'))
                    ? styles.buttonStyleActive
                    : styles.buttonStyle
                }
                onClick={onCheckSMS}
              >
                확인
              </button>
            </div>
            <p
              className={
                phoneSMSCheck ? styles.correctMessage : styles.errorMessage
              }
            >
              {errors.phone_check && errors.phone_check.message}
              {!errors.phone_check && phoneSMSMessage && phoneSMSMessage}
            </p>
          </div>
        )}
        {/* 이메일 */}
        <div className={styles.inputContainer}>
          <label htmlFor="email">이메일</label>
          <div className={styles.inputInline}>
            <input
              className={styles.inputStyle}
              id="email"
              type="email"
              placeholder="@ 이후 포함 전체 이메일 작성/본인 명의 이메일"
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value:
                    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/g,
                  message: `@ 포함 유효한 이메일을 작성해 주세요.`,
                },
              })}
            />
            <button
              type="button"
              className={
                /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/g.test(
                  watch('email'),
                )
                  ? styles.buttonStyleActive
                  : styles.buttonStyle
              }
              onClick={onSendEmail}
            >
              인증요청
            </button>
          </div>
          <p className={styles.errorMessage}>
            {errors.email && errors.email.message}
            {!errors.email && emailErrMessage && emailErrMessage}
          </p>
        </div>
        {/* 이메일 인증 */}
        {isCheckEmail && (
          <div className={styles.inputContainer}>
            <label htmlFor="email_code">인증코드</label>
            <div className={styles.inputInline}>
              <input
                className={styles.inputStyle}
                id="email_code"
                type="text"
                placeholder="인증코드 4자리"
                {...register('email_code', {
                  required: '이메일 인증을 해주세요.',
                  pattern: {
                    value: /^(?=.*[0-9])[0-9]{4}$/g,
                    message: '인증코드 4자리를 입력해주세요.',
                  },
                })}
              />
              <button
                type="button"
                className={
                  /^(?=.*[0-9])[0-9]{4}$/g.test(watch('email_code'))
                    ? styles.buttonStyleActive
                    : styles.buttonStyle
                }
                onClick={onCheckEmail}
              >
                확인
              </button>
            </div>
            <p
              className={
                emailCheck ? styles.correctMessage : styles.errorMessage
              }
            >
              {errors.email_code && errors.email_code.message}
              {!errors.email_code && emailMessage && emailMessage}
            </p>
          </div>
        )}

        {/* 연령대 */}
        <div className={styles.inputContainer}>
          <label>연령대</label>
          <div className={styles.boxContainer}>
            <span>
              <input
                id="20대 미만"
                type="radio"
                value="20대 미만"
                {...register('age', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="20대 미만">20대 미만</label>
            </span>
            <span>
              <input id="20대" type="radio" value="20대" {...register('age')} />
              <label htmlFor="20대">20대</label>
            </span>
            <span>
              <input id="30대" type="radio" value="30대" {...register('age')} />
              <label htmlFor="30대">30대</label>
            </span>
            <span>
              <input id="40대" type="radio" value="40대" {...register('age')} />
              <label htmlFor="40대">40대</label>
            </span>
            <span>
              <input id="50대" type="radio" value="50대" {...register('age')} />
              <label htmlFor="50대">50대</label>
            </span>
            <span>
              <input
                id="60대 이상"
                type="radio"
                value="60대 이상"
                {...register('age')}
              />
              <label htmlFor="60대 이상">60대 이상</label>
            </span>
          </div>
          <p className={styles.errorMessage}>
            {errors.age && errors.age.message}
          </p>
        </div>
        {/* 가입경로 */}
        <div className={styles.inputContainer}>
          <label>가입경로(복수선택 가능)</label>
          <div className={styles.boxContainer}>
            <span>
              <input
                id="지인 소개"
                type="checkbox"
                value="지인 소개"
                {...register('join_paths', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="지인 소개">지인소개</label>
            </span>
            <span>
              <input
                id="네이버 카페"
                type="checkbox"
                value="네이버 카페"
                {...register('join_paths')}
              />
              <label htmlFor="네이버 카페">네이버 카페</label>
            </span>
            <span>
              <input
                id="네이버 블로그"
                type="checkbox"
                value="네이버 블로그"
                {...register('join_paths')}
              />
              <label htmlFor="네이버 블로그">네이버 블로그</label>
            </span>
            <span>
              <input
                id="네이버 밴드"
                type="checkbox"
                value="네이버 밴드"
                {...register('join_paths')}
              />
              <label htmlFor="네이버 밴드">네이버 밴드</label>
            </span>
            <span>
              <input
                id="페이스북"
                type="checkbox"
                value="페이스북"
                {...register('join_paths')}
              />
              <label htmlFor="페이스북">페이스북</label>
            </span>
            <span>
              <input
                id="인스타그램"
                type="checkbox"
                value="인스타그램"
                {...register('join_paths')}
              />
              <label htmlFor="인스타그램">인스타그램</label>
            </span>
            <span>
              <input
                id="검색"
                type="checkbox"
                value="검색"
                {...register('join_paths')}
              />
              <label htmlFor="검색">검색</label>
            </span>
            <span>
              <input
                id="기타"
                type="checkbox"
                value="기타"
                {...register('join_paths')}
              />
              <label htmlFor="기타">기타</label>
            </span>
          </div>
          <p className={styles.errorMessage}>
            {errors.join_paths && errors.join_paths.message}
          </p>
        </div>
        <div className={styles.horizonLine} />
        {/* 약관 */}
        <div className={styles.inputContainer}>
          <div className={styles.inputContainerTitle}>
            <label>약관</label>
            <span>
              <input
                id="allSelect"
                type="checkbox"
                onChange={() => {
                  handleAllSelect(
                    !(isServiceTerm && isPrivacyTerm && isMarketingTerm),
                  );
                  setValue('service_term', !isServiceTerm, {
                    shouldValidate: true,
                  });
                }}
                checked={isServiceTerm && isPrivacyTerm && isMarketingTerm}
              />
              <label htmlFor="allSelect">전체동의</label>
            </span>
          </div>
          <div className={styles.termsContainer}>
            <span>
              <input
                id="service_term"
                type="checkbox"
                {...register('service_term', {
                  required: '필수 선택입니다.',
                  onChange: () => {
                    setIsServiceTerm((prev) => !prev);
                  },
                })}
                checked={isServiceTerm}
              />
              <label htmlFor="service_term">서비스 이용약관에 동의(필수)</label>
            </span>
            <button
              className={styles.termsButton}
              type="button"
              onClick={() => onToggleClick('SERVICE')}
            >
              약관보기 &gt;
            </button>
          </div>
          <p className={styles.errorMessage}>
            {errors.service_term && errors.service_term.message}
          </p>

          <div
            className={styles.termsContainer}
            style={{ marginBottom: '1.7rem' }}
          >
            <span>
              <input
                id="privacy_term"
                type="checkbox"
                checked={isPrivacyTerm}
                onChange={() => setIsPrivacyTerm((prev) => !prev)}
              />
              <label htmlFor="privacy_term">
                개인정보 수집 및 이용 동의(선택)
              </label>
            </span>
            <button
              className={styles.termsButton}
              type="button"
              onClick={() => onToggleClick('PRIVACY')}
            >
              약관보기 &gt;
            </button>
          </div>

          <div className={styles.termsContainer}>
            <span>
              <input
                id="marketing_term"
                type="checkbox"
                checked={isMarketingTerm}
                onChange={() => setIsMarketingTerm((prev) => !prev)}
              />
              <label htmlFor="marketing_term">
                마켓팅 활용 및 광고성 정보 수신 동의(선택)
              </label>
            </span>
            <button
              className={styles.termsButton}
              type="button"
              onClick={() => onToggleClick('MARKETING')}
            >
              약관보기 &gt;
            </button>
          </div>
        </div>

        <button
          type="button"
          className={styles.signUpButton}
          onClick={handleSubmit(onSubmit)}
        >
          회원가입
        </button>
      </form>
      {toggle ? (
        <Terms selectedTerm={selectedTerm} setToggle={setToggle} />
      ) : null}
    </motion.div>
  );
}
