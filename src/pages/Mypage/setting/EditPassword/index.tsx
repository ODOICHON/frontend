import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import eyeImage from '@/assets/common/eye.svg';
import eyeClosedImage from '@/assets/common/eyeClosed.svg';
import { checkPasswordAPI, updatePasswordAPI } from '@/apis/user';
import { certificateStore } from '@/store/certificateStore';
import { SETTING_STEP, SettingStep } from '@/constants/myPage';
import styles from './styles.module.scss';

type SettingOutletContext = {
  settingStep: SettingStep;
  setSettingStep: React.Dispatch<React.SetStateAction<SettingStep>>;
};
type Form = {
  current_password: string;
  password: string;
  password_check: string;
};

export default function EditPassword() {
  const navigate = useNavigate();
  const { isCertificated } = certificateStore();
  const { setSettingStep } = useOutletContext<SettingOutletContext>();

  const [eyeCurrentState, setEyeCurrentState] = useState(false); // 현재 비밀번호 아이콘 상태
  const [eyeState, setEyeState] = useState(false); // 변경할 비밀번호 아이콘 상태
  const [eyeCheckState, setEyeCheckState] = useState(false); // 변경할 비밀번호 재확인 아이콘 상태

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    mode: 'onSubmit',
    defaultValues: {
      current_password: '',
      password: '',
      password_check: '',
    },
  });

  const onEyeClick = (e: React.MouseEvent<HTMLImageElement>) => {
    switch (e.currentTarget.id) {
      case 'currentEye':
        return setEyeCurrentState((prev) => !prev);
      case 'passwordEye':
        return setEyeState((prev) => !prev);
      case 'passwordCheckEye':
        return setEyeCheckState((prev) => !prev);
      default:
    }
  };

  const checkPasswordRegex = (pw: string) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*.?])[A-Za-z0-9!@#$%^&*.?]{8,16}$/g;
    return regex.test(pw);
  };

  const onUpdatePassword = async (data: Form) => {
    const { data: isPassed } = await checkPasswordAPI(data.current_password);
    if (!isPassed) {
      // TODO: 공용 모달로 띄워주기
      alert('현재 비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await updatePasswordAPI(data.password);
      // TODO: 공용 모달로 띄워주기
      alert('비밀번호가 변경되었습니다.');
      navigate('/mypage/setting/edit');
    } catch (err) {
      // TODO: 공용 모달로 띄워주기
      err === 'U0006'
        ? alert('변경하려는 비밀번호가 현재 비밀번호와 같습니다.')
        : alert('비밀번호 변경에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (isCertificated) {
      setSettingStep(SETTING_STEP.PASSWORD);
    }
  }, []);

  if (!isCertificated) return <Navigate to="/mypage/setting" />;
  return (
    <div className={styles.container}>
      <form
        className={styles.contentContainer}
        onSubmit={handleSubmit(onUpdatePassword)}
      >
        {/* 현재 비밀번호 */}
        <div className={styles.inputContainer}>
          <label htmlFor="current_password">현재 비밀번호</label>
          <input
            className={styles.inputStyle}
            id="current_password"
            type={eyeCurrentState ? 'text' : 'password'}
            placeholder="현재 비밀번호를 입력하세요."
            {...register('current_password', {
              required: '현재 비밀번호는 필수 입력입니다.',
              pattern: {
                value:
                  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*.?])[A-Za-z0-9!@#$%^&*.?]{8,16}$/g,
                message: '비밀번호 형식에 맞지 않습니다.',
              },
            })}
          />
          {watch('current_password') !== '' && (
            <img
              role="presentation"
              id="currentEye"
              className={styles.eyeImage}
              src={eyeCurrentState ? eyeClosedImage : eyeImage}
              onClick={onEyeClick}
              alt="eyeImage"
            />
          )}
          <p className={styles.errorMessage}>
            {errors.current_password && errors.current_password.message}
          </p>
        </div>
        {/* 새 비밀번호 */}
        <div className={styles.inputContainer}>
          <label htmlFor="password">새 비밀번호</label>
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
        {/* 새 비밀번호 확인 */}
        <div className={styles.inputContainer}>
          <label htmlFor="password_check">새 비밀번호 확인</label>
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
              id="passwordCheckEye"
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
        <button
          className={
            !(
              checkPasswordRegex(watch('current_password')) &&
              checkPasswordRegex(watch('password')) &&
              checkPasswordRegex(watch('password_check'))
            )
              ? styles.disabledButton
              : styles.button
          }
          disabled={
            !(
              checkPasswordRegex(watch('current_password')) &&
              checkPasswordRegex(watch('password')) &&
              checkPasswordRegex(watch('password_check'))
            )
          }
          type="submit"
        >
          확인
        </button>
      </form>
    </div>
  );
}
