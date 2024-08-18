import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import eyeImage from '@/assets/common/eye.svg';
import eyeClosedImage from '@/assets/common/eyeClosed.svg';
import logoImage from '@/assets/common/logo.svg';
import ModalPortal from '@/components/Common/ModalPortal';
import ToastMessageModal from '@/components/Common/ToastMessageModal';
import AddressModal from '@/components/Trade/AddressModal';
import { restFetcher } from '@/queryClient';
import Terms from '@/components/Terms';
import userStore from '@/store/userStore';
import useCheckAPI from '@/hooks/useCheckAPI';
import useModalState from '@/hooks/useModalState';
import useToastMessageType from '@/hooks/useToastMessageType';
import { ApiResponseType } from '@/types/apiResponseType';
import { TermType } from '@/types/signUp';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';
import signUpStyles from '../styles.module.scss';

type AgentSignUpTerm =
  | 'SERVICE_USED_AGREE'
  | 'PERSONAL_INFO_NOTI'
  | 'PERSONAL_INFO_USED_AGREE'
  | 'MARKETING_ADVERTISEMENT_AGREE';

type IForm = {
  userName: string;
  password: string;
  password_check: string;
  nick_name: string;
  phone_num: string;
  phone_check: string;
  age: string;
  join_paths: string[];
  agent_code: string;
  business_code: string;
  company_name: string;
  agent_name: string;
  company_phone_num: string;
  assistant_name: string | null;
  company_address: string;
  company_address_detail: string;
  company_email: string;
  email_code: string;
  estate: string;
  service_term: boolean;
  agent_term: boolean;
};
type ISubmitForm = {
  userName: string;
  password: string;
  nick_name: string;
  phone_num: string;
  age: string;
  join_paths: string[];
  agent_code: string;
  business_code: string;
  company_name: string;
  agent_name: string;
  company_phone_num: string;
  assistant_name: string | null;
  company_address: string;
  company_address_detail: string;
  company_email: string;
  estate: string;
  terms: AgentSignUpTerm[];
};

export default function AgentSignUpPage() {
  const { token } = userStore();
  const navigate = useNavigate();
  const { modalState, handleModalClose, handleModalOpen } = useModalState();
  const { toastMessageProps, handleToastMessageProps } = useToastMessageType();

  const [toggle, setToggle] = useState(false); // 약관 토글
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false); // 주소 모달 토글
  const [eyeState, setEyeState] = useState(false);
  const [eyeCheckState, setEyeCheckState] = useState(false);
  const [isCheckNum, setIsCheckNum] = useState(false); // 전화번호 인증 중 상태
  const [phoneSMSCheck, setPhoneSMSCheck] = useState(false); // 전화번호 인증 완료 상태
  const [phoneSMSMessage, setPhoneSMSMessage] = useState<string | undefined>(); // 전화번호 인증 완료 상태
  const [phoneErrMessage, setPhoneErrMessage] = useState<string | undefined>(); // 전화번호 에러 메세지
  const [isCheckEmail, setIsCheckEmail] = useState(false); // 이메일 인증 중 상태
  const [emailCheck, setEmailCheck] = useState(false); // 이메일 인증 완료 상태
  const [emailMessage, setEmailMessage] = useState<string | undefined>(); // 이메일 인증 상태 메세지
  const [emailErrMessage, setEmailErrMessage] = useState<string | undefined>(); // 이메일 에러 메세지
  const [isServiceTerm, setIsServiceTerm] = useState(false);
  const [isAgentPrivacyTerm, setIsAgentPrivacyTerm] = useState(false);
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
      password: '',
      password_check: '',
      nick_name: '',
      phone_num: '',
      phone_check: '',
      age: '',
      join_paths: [],
      agent_code: '',
      business_code: '',
      company_name: '',
      agent_name: '',
      company_phone_num: '',
      assistant_name: '',
      company_address: '',
      company_address_detail: '',
      company_email: '',
      email_code: '',
      estate: '',
      service_term: false,
      agent_term: false,
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
      path: '/agents/sign-up',
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
      setPhoneSMSMessage('인증문자 4자리를 입력해주세요.');
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
        watch('company_email'),
      ) === false
    )
      return;
    emailSendAPI(watch('company_email'), {
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
      { email: watch('company_email'), code: watch('email_code') },
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

  const postCodeCallback = (fullAddress: string) => {
    setValue('company_address', fullAddress);
  };

  const getTerms = () => {
    const termsArr: AgentSignUpTerm[] = [];
    if (isServiceTerm) termsArr.push('SERVICE_USED_AGREE');
    if (isAgentPrivacyTerm) termsArr.push('PERSONAL_INFO_NOTI');
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
    const form: ISubmitForm = {
      userName: data.userName,
      password: data.password,
      nick_name: data.nick_name,
      phone_num: data.phone_num,
      age: data.age,
      join_paths: data.join_paths,
      agent_code: data.agent_code,
      business_code: data.business_code,
      company_name: data.company_name,
      agent_name: data.agent_name,
      company_phone_num: data.company_phone_num,
      assistant_name: data.assistant_name === '' ? null : data.assistant_name,
      company_address: data.company_address,
      company_address_detail: data.company_address_detail,
      company_email: data.company_email,
      estate: data.estate,
      terms: getTerms(),
    };
    singUpAPI(form, {
      onSuccess: () => {
        handleToastMessageProps(
          'AGENT_SIGN_UP_SUCCESS',
          handleModalClose,
          () => {
            navigate('/login');
          },
        );
        handleModalOpen();
      },
      onError: (err) => {
        const error = err as AxiosError<ApiResponseType>;
        alert(error.response?.data.message);
      },
    });
  };

  const handleAllSelect = (isSelected: boolean) => {
    setIsServiceTerm(isSelected);
    setIsAgentPrivacyTerm(isSelected);
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
    setIsCheckNum(false);
    setPhoneSMSMessage('전화번호 인증을 해주세요.');
  }, [watch('phone_num')]);
  useEffect(() => {
    setEmailCheck(false);
    setIsCheckEmail(false);
    setEmailMessage('이메일 인증을 해주세요.');
  }, [watch('company_email')]);

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
              placeholder="‘-’빼고 14자리 숫자 입력"
              {...register('agent_code', {
                required: '필수 입력입니다.',
                pattern: {
                  value: /^\d{14}$/g,
                  message: '‘-’빼고 14자리 숫자를 입력해주세요',
                },
              })}
            />
          </div>
          <p className={signUpStyles.errorMessage}>
            {errors.agent_code && errors.agent_code.message}
          </p>
        </div>
        {/* 사업자 등록번호 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="business_code">사업자 등록번호</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="business_code"
              type="text"
              placeholder="‘-’빼고 10자리 숫자 입력"
              {...register('business_code', {
                required: '필수 입력입니다.',
                pattern: {
                  value: /^\d{10}$/g,
                  message: '‘-’빼고 10자리 숫자를 입력해주세요',
                },
              })}
            />
          </div>
          <p className={signUpStyles.errorMessage}>
            {errors.business_code && errors.business_code.message}
          </p>
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
                {...register('company_name', {
                  required: '필수 입력입니다.',
                })}
              />
            </div>
            <p className={signUpStyles.errorMessage}>
              {errors.company_name && errors.company_name.message}
            </p>
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
                {...register('agent_name', {
                  required: '필수 입력입니다.',
                })}
              />
            </div>
            <p className={signUpStyles.errorMessage}>
              {errors.agent_name && errors.agent_name.message}
            </p>
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
              {...register('company_phone_num', {
                required: '비밀번호는 필수 입력입니다.',
                pattern: {
                  value: /^\d{9,11}$/g,
                  message: `'-' 제외한 유효한 번호를 입력해주세요.`,
                },
              })}
            />
          </div>
          <p className={signUpStyles.errorMessage}>
            {errors.company_phone_num && errors.company_phone_num.message}
          </p>
        </div>
        {/* 중개 보조원명 */}
        <div
          className={signUpStyles.inputContainer}
          style={{ marginBottom: '3.2rem' }}
        >
          <label htmlFor="assistant_name">중개 보조원명</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="assistant_name"
              type="text"
              placeholder="중개 보조원일 경우에만 작성/대표자인 경우 작성 X"
              {...register('assistant_name')}
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
              readOnly
              {...register('company_address', {
                required: '필수 입력입니다.',
              })}
            />
            <button
              type="button"
              className={signUpStyles.buttonStyleActive}
              onClick={() => {
                setIsPostcodeOpen((pre) => !pre);
              }}
            >
              주소 찾기
            </button>
          </div>
          <p className={signUpStyles.errorMessage}>
            {errors.company_address && errors.company_address.message}
          </p>
          {/* 상세 주소 */}
          <input
            className={signUpStyles.inputStyle}
            style={{ marginTop: '0.25rem' }}
            id="company_address_detail"
            type="text"
            placeholder="상세 주소까지 작성"
            {...register('company_address_detail', {
              required: '필수 입력입니다.',
            })}
          />
          <p className={signUpStyles.errorMessage}>
            {errors.company_address_detail &&
              errors.company_address_detail.message}
          </p>
        </div>
        {/* 이메일 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="company_email">이메일</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="company_email"
              type="email"
              placeholder="@ 이후 포함 전체 이메일 작성/본인 명의 이메일"
              {...register('company_email', {
                required: '필수 입력입니다.',
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
                  watch('company_email'),
                ) && !isCheckEmail
                  ? signUpStyles.buttonStyleActive
                  : signUpStyles.buttonStyle
              }
              onClick={onSendEmail}
              disabled={
                !/^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/g.test(
                  watch('company_email'),
                ) || isCheckEmail
              }
            >
              인증요청
            </button>
          </div>
          <p
            className={
              isCheckEmail
                ? signUpStyles.correctMessage
                : signUpStyles.errorMessage
            }
          >
            {isCheckEmail && '인증코드가 발송되었습니다.'}
            {errors.company_email && errors.company_email.message}
            {!errors.company_email && emailErrMessage && emailErrMessage}
          </p>
        </div>
        {/* 이메일 인증 */}
        {isCheckEmail && (
          <div className={signUpStyles.inputContainer}>
            <label htmlFor="email_code">인증코드</label>
            <div className={signUpStyles.inputInline}>
              <input
                className={signUpStyles.inputStyle}
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
                  /^(?=.*[0-9])[0-9]{4}$/g.test(watch('email_code')) &&
                  !emailCheck
                    ? signUpStyles.buttonStyleActive
                    : signUpStyles.buttonStyle
                }
                onClick={onCheckEmail}
                disabled={
                  !/^(?=.*[0-9])[0-9]{4}$/g.test(watch('email_code')) ||
                  emailCheck
                }
              >
                확인
              </button>
            </div>
            <p
              className={
                emailCheck
                  ? signUpStyles.correctMessage
                  : signUpStyles.errorMessage
              }
            >
              {errors.email_code && errors.email_code.message}
              {!errors.email_code && emailMessage && emailMessage}
            </p>
          </div>
        )}

        <div
          className={signUpStyles.horizonLine}
          style={{ marginTop: '4rem', marginBottom: '5rem' }}
        />
        {/* 아이디 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="id">아이디</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
              id="id"
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
                /^(?=.*[A-Za-z])[A-Za-z_0-9]{4,20}$/g.test(watch('userName')) &&
                !idCheck
                  ? signUpStyles.buttonStyleActive
                  : signUpStyles.buttonStyle
              }
              onClick={idCheckHandler}
              disabled={
                !/^(?=.*[A-Za-z])[A-Za-z_0-9]{4,20}$/g.test(
                  watch('userName'),
                ) || idCheck
              }
            >
              중복확인
            </button>
          </div>
          <p
            className={
              idCheck ? signUpStyles.correctMessage : signUpStyles.errorMessage
            }
          >
            {errors.userName && errors.userName.message}
            {!errors.userName && idCheckMessage && idCheckMessage}
          </p>
        </div>
        {/* 비밀번호 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="password">비밀번호</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
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
                className={signUpStyles.eyeImage}
                src={eyeState ? eyeClosedImage : eyeImage}
                onClick={onEyeClick}
                alt="eyeImage"
              />
            )}
          </div>
          <p className={signUpStyles.errorMessage}>
            {errors.password && errors.password.message}
          </p>
        </div>
        {/* 비밀번호 확인 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="password_check">비밀번호 확인</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
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
                id="passwordCheckEye"
                className={signUpStyles.eyeImage}
                src={eyeCheckState ? eyeClosedImage : eyeImage}
                onClick={onEyeClick}
                alt="eyeImage"
              />
            )}
          </div>
          <p className={signUpStyles.errorMessage}>
            {errors.password_check && errors.password_check.message}
          </p>
        </div>
        {/* 닉네임 */}
        <div className={signUpStyles.inputContainer}>
          <label htmlFor="nick_name">닉네임</label>
          <div className={signUpStyles.inputInline}>
            <input
              className={signUpStyles.inputStyle}
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
                ) && !nicknameCheck
                  ? signUpStyles.buttonStyleActive
                  : signUpStyles.buttonStyle
              }
              onClick={nicknameCheckHandler}
              disabled={
                !/^(?=.*[a-zA-Z0-9가-힣])[A-Za-z0-9가-힣]{1,20}$/g.test(
                  watch('nick_name'),
                ) || nicknameCheck
              }
            >
              중복확인
            </button>
          </div>
          <p
            className={
              nicknameCheck
                ? signUpStyles.correctMessage
                : signUpStyles.errorMessage
            }
          >
            {errors.nick_name && errors.nick_name.message}
            {!errors.nick_name && nicknameCheckMessage && nicknameCheckMessage}
          </p>
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
                /^01(?:0|1|[6-9])[0-9]{7,8}$/g.test(watch('phone_num')) &&
                !isCheckNum
                  ? signUpStyles.buttonStyleActive
                  : signUpStyles.buttonStyle
              }
              onClick={onSendSMS}
              disabled={
                !/^01(?:0|1|[6-9])[0-9]{7,8}$/g.test(watch('phone_num')) ||
                isCheckNum
              }
            >
              인증요청
            </button>
          </div>
          <p
            className={
              isCheckNum
                ? signUpStyles.correctMessage
                : signUpStyles.errorMessage
            }
          >
            {isCheckNum && '인증문자가 발송되었습니다.'}
            {errors.phone_num && errors.phone_num.message}
            {!errors.phone_num && phoneErrMessage && phoneErrMessage}
          </p>
        </div>
        {/* 인증번호 */}
        {isCheckNum && (
          <div className={signUpStyles.inputContainer}>
            <label htmlFor="phone_num">인증번호</label>
            <div className={signUpStyles.inputInline}>
              <input
                className={signUpStyles.inputStyle}
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
                  /^(?=.*[0-9])[0-9]{4}$/g.test(watch('phone_check')) &&
                  !phoneSMSCheck
                    ? signUpStyles.buttonStyleActive
                    : signUpStyles.buttonStyle
                }
                onClick={onCheckSMS}
                disabled={
                  !/^(?=.*[0-9])[0-9]{4}$/g.test(watch('phone_check')) ||
                  phoneSMSCheck
                }
              >
                확인
              </button>
            </div>
            <p
              className={
                phoneSMSCheck
                  ? signUpStyles.correctMessage
                  : signUpStyles.errorMessage
              }
            >
              {errors.phone_check && errors.phone_check.message}
              {!errors.phone_check && phoneSMSMessage && phoneSMSMessage}
            </p>
          </div>
        )}
        {/* 주거래 매물 */}
        <div className={signUpStyles.inputContainer}>
          <label>주거래 매물</label>
          <div className={signUpStyles.boxContainer}>
            <span>
              <input
                id="아파트"
                type="radio"
                value="아파트"
                {...register('estate', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="아파트">아파트</label>
            </span>
            <span>
              <input
                id="주택"
                type="radio"
                value="주택"
                {...register('estate', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="주택">주택</label>
            </span>
            <span>
              <input
                id="농가"
                type="radio"
                value="농가"
                {...register('estate', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="농가">농가</label>
            </span>
          </div>
          <p className={signUpStyles.errorMessage}>
            {errors.estate && errors.estate.message}
          </p>
        </div>
        {/* 연령대 */}
        <div className={signUpStyles.inputContainer}>
          <label>연령대</label>
          <div className={signUpStyles.boxContainer}>
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
              <input
                id="20대"
                type="radio"
                value="20대"
                {...register('age', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="20대">20대</label>
            </span>
            <span>
              <input
                id="30대"
                type="radio"
                value="30대"
                {...register('age', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="30대">30대</label>
            </span>
            <span>
              <input
                id="40대"
                type="radio"
                value="40대"
                {...register('age', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="40대">40대</label>
            </span>
            <span>
              <input
                id="50대"
                type="radio"
                value="50대"
                {...register('age', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="50대">50대</label>
            </span>
            <span>
              <input
                id="60대 이상"
                type="radio"
                value="60대 이상"
                {...register('age', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="60대 이상">60대 이상</label>
            </span>
          </div>
          <p className={signUpStyles.errorMessage}>
            {errors.age && errors.age.message}
          </p>
        </div>
        {/* 가입경로 */}
        <div className={signUpStyles.inputContainer}>
          <label>가입경로(복수선택 가능)</label>
          <div className={signUpStyles.boxContainer}>
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
                {...register('join_paths', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="네이버 카페">네이버 카페</label>
            </span>
            <span>
              <input
                id="네이버 블로그"
                type="checkbox"
                value="네이버 블로그"
                {...register('join_paths', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="네이버 블로그">네이버 블로그</label>
            </span>
            <span>
              <input
                id="네이버 밴드"
                type="checkbox"
                value="네이버 밴드"
                {...register('join_paths', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="네이버 밴드">네이버 밴드</label>
            </span>
            <span>
              <input
                id="페이스북"
                type="checkbox"
                value="페이스북"
                {...register('join_paths', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="페이스북">페이스북</label>
            </span>
            <span>
              <input
                id="인스타그램"
                type="checkbox"
                value="인스타그램"
                {...register('join_paths', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="인스타그램">인스타그램</label>
            </span>
            <span>
              <input
                id="검색"
                type="checkbox"
                value="검색"
                {...register('join_paths', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="검색">검색</label>
            </span>
            <span>
              <input
                id="기타"
                type="checkbox"
                value="기타"
                {...register('join_paths', {
                  required: '필수 선택입니다.',
                })}
              />
              <label htmlFor="기타">기타</label>
            </span>
          </div>
          <p className={signUpStyles.errorMessage}>
            {errors.join_paths && errors.join_paths.message}
          </p>
        </div>
        <div className={signUpStyles.horizonLine} />
        {/* 약관 */}
        <div className={signUpStyles.inputContainer}>
          <div className={signUpStyles.inputContainerTitle}>
            <label>약관</label>
            <span>
              <input
                id="allSelect"
                type="checkbox"
                onChange={() => {
                  handleAllSelect(
                    !(
                      isServiceTerm &&
                      isAgentPrivacyTerm &&
                      isPrivacyTerm &&
                      isMarketingTerm
                    ),
                  );
                  setValue('service_term', !isServiceTerm, {
                    shouldValidate: true,
                  });
                  setValue('agent_term', !isAgentPrivacyTerm, {
                    shouldValidate: true,
                  });
                }}
                checked={
                  isServiceTerm &&
                  isAgentPrivacyTerm &&
                  isPrivacyTerm &&
                  isMarketingTerm
                }
              />
              <label htmlFor="allSelect">전체동의</label>
            </span>
          </div>
          <div className={signUpStyles.termsContainer}>
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
              className={signUpStyles.termsButton}
              type="button"
              onClick={() => onToggleClick('SERVICE')}
            >
              약관보기 &gt;
            </button>
          </div>
          <p className={signUpStyles.errorMessage}>
            {errors.service_term && errors.service_term.message}
          </p>

          <div className={signUpStyles.termsContainer} style={{ gap: 0 }}>
            <span>
              <input
                id="agent_term"
                type="checkbox"
                {...register('agent_term', {
                  required: '필수 선택입니다.',
                  onChange: () => {
                    setIsAgentPrivacyTerm((prev) => !prev);
                  },
                })}
                checked={isAgentPrivacyTerm}
              />
              <label htmlFor="agent_term">
                공인중개사 식별 개인정보 수집 이용 동의(필수)
              </label>
            </span>
            <button
              className={signUpStyles.termsButton}
              type="button"
              onClick={() => onToggleClick('AGENT')}
            >
              약관보기 &gt;
            </button>
          </div>
          <p className={signUpStyles.errorMessage}>
            {errors.agent_term && errors.agent_term.message}
          </p>

          <div
            className={signUpStyles.termsContainer}
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
              className={signUpStyles.termsButton}
              type="button"
              onClick={() => onToggleClick('PRIVACY')}
            >
              약관보기 &gt;
            </button>
          </div>

          <div className={signUpStyles.termsContainer}>
            <span>
              <input
                id="marketing_term"
                type="checkbox"
                checked={isMarketingTerm}
                onChange={() => setIsMarketingTerm((prev) => !prev)}
              />
              <label htmlFor="marketing_term">
                마케팅 활용 및 광고성 정보 수신 동의(선택)
              </label>
            </span>
            <button
              className={signUpStyles.termsButton}
              type="button"
              onClick={() => onToggleClick('MARKETING')}
            >
              약관보기 &gt;
            </button>
          </div>
        </div>

        <button
          type="button"
          className={signUpStyles.signUpButton}
          onClick={handleSubmit(onSubmit)}
        >
          회원가입
        </button>
      </form>
      {toggle ? (
        <Terms selectedTerm={selectedTerm} setToggle={setToggle} />
      ) : null}
      {modalState && toastMessageProps && (
        <ModalPortal>
          <ToastMessageModal {...toastMessageProps} />
        </ModalPortal>
      )}
    </motion.div>
  );
}
