import { useState } from 'react';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import eyeImage from '@/assets/common/eye.svg';
import eyeClosedImage from '@/assets/common/eyeClosed.svg';
import { checkPasswordAPI } from '@/apis/user';
import { certificateStore } from '@/store/certificateStore';
import useInput from '@/hooks/useInput';
import { SETTING_STEP, SettingStep } from '@/constants/myPage';
import styles from './styles.module.scss';

type SettingOutletContext = {
  settingStep: SettingStep;
  setSettingStep: React.Dispatch<React.SetStateAction<SettingStep>>;
};

export default function CertificateMember() {
  const { isCertificated, setIsCertificated } = certificateStore();
  const { setSettingStep } = useOutletContext<SettingOutletContext>();
  const navigate = useNavigate();

  const [eyeCheckState, setEyeCheckState] = useState(false);
  const [password, handlePassword] = useInput('');

  const onCheckPassword = async (pw: string) => {
    const { data: isPassed } = await checkPasswordAPI(pw);
    if (isPassed) {
      setIsCertificated(true);
      setSettingStep(SETTING_STEP.EDIT_INFO);
      navigate('/mypage/setting/edit');
    } else {
      // TODO: 공용 모달로 띄워주기
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const checkPasswordRegex = (pw: string) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*.?])[A-Za-z0-9!@#$%^&*.?]{8,16}$/g;
    return regex.test(pw);
  };

  if (isCertificated) {
    return <Navigate to="/mypage/setting/edit" />;
  }
  return (
    <div className={styles.container}>
      <form
        className={styles.contentContainer}
        onSubmit={(e) => {
          e.preventDefault();
          onCheckPassword(password);
        }}
      >
        <div className={styles.inputContainer}>
          <label htmlFor="password">현재 비밀번호</label>
          <input
            className={styles.inputStyle}
            id="password"
            type={eyeCheckState ? 'text' : 'password'}
            placeholder="현재 비밀번호를 입력하세요."
            value={password}
            onChange={handlePassword}
          />
          {password !== '' && (
            <img
              role="presentation"
              id="password_checkEye"
              className={styles.eyeImage}
              src={eyeCheckState ? eyeClosedImage : eyeImage}
              onClick={() => setEyeCheckState((prev) => !prev)}
              alt="eyeImage"
            />
          )}
          <p className={styles.errorMessage}>
            {!checkPasswordRegex(password) &&
              (password === ''
                ? '비밀번호를 입력하세요.'
                : '비밀번호 형식에 맞지 않습니다.')}
          </p>
        </div>
        <button
          className={
            checkPasswordRegex(password) ? styles.button : styles.disabledButton
          }
          disabled={!checkPasswordRegex(password)}
          type="submit"
        >
          확인
        </button>
      </form>
    </div>
  );
}
