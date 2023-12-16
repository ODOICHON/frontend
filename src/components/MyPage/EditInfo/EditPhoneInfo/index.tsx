import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import { updatePhoneNumAPI } from '@/apis/user';
import { EditMode } from '@/constants/myPage';
import styles from './styles.module.scss';

type EditPhoneInfoProps = {
  currentPhoneNum: string;
  setEditMode: React.Dispatch<React.SetStateAction<EditMode>>;
};
type Form = {
  phone_num: string;
  phone_check: string;
};

export default function EditPhoneInfo({
  currentPhoneNum,
  setEditMode,
}: EditPhoneInfoProps) {
  const [isCheckNum, setIsCheckNum] = useState(false); // 전화번호 인증 중 상태
  const [phoneSMSCheck, setPhoneSMSCheck] = useState(false); // 전화번호 인증 완료 상태
  const [phoneSMSMessage, setPhoneSMSMessage] = useState<string | undefined>(); // 전화번호 인증 상태 메세지
  const [phoneErrMessage, setPhoneErrMessage] = useState<string | undefined>(); // 전화번호 에러 메세지

  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    mode: 'onSubmit',
    defaultValues: {
      phone_num: currentPhoneNum,
      phone_check: '',
    },
  });

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

  const onUpdatePhoneNum = async (data: Form) => {
    try {
      await updatePhoneNumAPI(data.phone_num);
      queryClient.refetchQueries([QueryKeys.USER]);
      setEditMode('none');
    } catch (err) {
      // TODO: 공용 모달로 띄워주기
      alert('닉네임 변경에 실패했습니다.');
    }
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
  const onCheckSMS = async (data: Form) => {
    if (/^(?=.*[0-9])[0-9]{4}$/g.test(data.phone_num) === false) {
      setPhoneSMSCheck(false);
    }
    phoneCheckAPI(watch('phone_check'), {
      onSuccess: async (res) => {
        if (res.data === true) {
          setPhoneSMSCheck(true);
          setPhoneSMSMessage('인증에 성공하셨습니다.');
          await onUpdatePhoneNum(data);
        } else if (res.data === false) {
          setPhoneSMSCheck(false);
          setPhoneSMSMessage('인증번호가 일치하지 않습니다.');
        }
      },
    });
  };

  useEffect(() => {
    setPhoneSMSCheck(false);
    setIsCheckNum(false);
    setPhoneSMSMessage('전화번호 인증을 해주세요.');
  }, [watch('phone_num')]);
  return (
    <li className={styles.wrapper}>
      <p>전화번호</p>
      <label htmlFor="phone_num">휴대폰 번호</label>
      <div className={styles.inputContainer}>
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
              !/^01(?:0|1|[6-9])[0-9]{7,8}$/g.test(watch('phone_num')) ||
              isCheckNum
                ? styles.buttonStyleDisabled
                : styles.buttonStyleActive
            }
            disabled={
              !/^01(?:0|1|[6-9])[0-9]{7,8}$/g.test(watch('phone_num')) ||
              isCheckNum
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
      {isCheckNum && <div aria-hidden="true" aria-label="공간 차지용" />}
      {isCheckNum && <label htmlFor="phone_num">인증번호</label>}
      {isCheckNum && (
        <div className={styles.inputContainer}>
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
                  : styles.buttonStyleDisabled
              }
              disabled={!/^(?=.*[0-9])[0-9]{4}$/g.test(watch('phone_check'))}
              onClick={handleSubmit(onCheckSMS)}
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
      {isCheckNum && <div aria-hidden="true" aria-label="공간 차지용" />}
    </li>
  );
}
