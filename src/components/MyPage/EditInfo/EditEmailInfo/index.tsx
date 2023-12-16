import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import { updateEmailAPI } from '@/apis/user';
import { EditMode } from '@/constants/myPage';
import styles from './styles.module.scss';

type EditPhoneInfoProps = {
  currentEmail: string;
  setEditMode: React.Dispatch<React.SetStateAction<EditMode>>;
};
type Form = {
  email: string;
  email_code: string;
};

export default function EditEmailInfo({
  currentEmail,
  setEditMode,
}: EditPhoneInfoProps) {
  const [isCheckEmail, setIsCheckEmail] = useState(false); // 이메일 인증 중 상태
  const [emailCheck, setEmailCheck] = useState(false); // 이메일 인증 완료 상태
  const [emailMessage, setEmailMessage] = useState<string | undefined>(); // 이메일 인증 상태 메세지
  const [emailErrMessage, setEmailErrMessage] = useState<string | undefined>(); // 이메일 에러 메세지

  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    mode: 'onSubmit',
    defaultValues: {
      email: currentEmail,
      email_code: '',
    },
  });

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

  const onUpdateEmail = async (data: Form) => {
    try {
      await updateEmailAPI(data.email);
      queryClient.refetchQueries([QueryKeys.USER]);
      setEditMode('none');
    } catch (err) {
      // TODO: 공용 모달로 띄워주기
      alert('이메일 변경에 실패했습니다.');
    }
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
  const onCheckEmail = async (data: Form) => {
    if (
      /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/g.test(
        watch('email_code'),
      ) === false
    ) {
      setEmailCheck(false);
    }
    emailCheckAPI(
      { email: watch('email'), code: watch('email_code') },
      {
        onSuccess: async (res) => {
          if (res.data === true) {
            setEmailCheck(true);
            setEmailMessage('인증에 성공하셨습니다.');
            await onUpdateEmail(data);
          } else if (res.data === false) {
            setEmailCheck(false);
            setEmailMessage('인증코드가 일치하지 않습니다.');
          }
        },
      },
    );
  };

  useEffect(() => {
    setEmailCheck(false);
    setIsCheckEmail(false);
    setEmailMessage('이메일 인증을 해주세요.');
  }, [watch('email')]);

  return (
    <li className={styles.wrapper}>
      <p>이메일</p>
      <label htmlFor="email">이메일 주소</label>
      <div className={styles.inputContainer}>
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
              !/^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/g.test(
                watch('email'),
              ) || isCheckEmail
                ? styles.buttonStyleDisabled
                : styles.buttonStyleActive
            }
            disabled={
              !/^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/g.test(
                watch('email'),
              ) || isCheckEmail
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
      <div className={styles.buttonWrapper}>
        <button
          className={styles.buttonStyle}
          type="button"
          onClick={() => setEditMode('none')}
        >
          취소
        </button>
      </div>
      {/* 전화번호 인증 */}
      {isCheckEmail && <div aria-hidden="true" aria-label="공간 차지용" />}
      {isCheckEmail && <label htmlFor="email_code">인증번호</label>}
      {isCheckEmail && (
        <div className={styles.inputContainer}>
          <div className={styles.inputInline}>
            <input
              className={styles.inputStyle}
              id="email_code"
              type="text"
              placeholder="인증문자 4자리"
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
                  : styles.buttonStyleDisabled
              }
              disabled={!/^(?=.*[0-9])[0-9]{4}$/g.test(watch('email_code'))}
              onClick={handleSubmit(onCheckEmail)}
            >
              확인
            </button>
          </div>
          <p
            className={emailCheck ? styles.correctMessage : styles.errorMessage}
          >
            {errors.email_code && errors.email_code.message}
            {!errors.email_code && emailMessage && emailMessage}
          </p>
        </div>
      )}
      {isCheckEmail && <div aria-hidden="true" aria-label="공간 차지용" />}
    </li>
  );
}
