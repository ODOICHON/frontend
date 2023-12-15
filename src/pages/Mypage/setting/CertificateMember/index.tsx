import { useState } from 'react';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import eyeImage from '@/assets/common/eye.svg';
import eyeClosedImage from '@/assets/common/eyeClosed.svg';
import { certificateStore } from '@/store/certificateStore';
import useInput from '@/hooks/useInput';
import { SettingStep } from '@/constants/myPage';
import styles from './styles.module.scss';

type SettingOutletContext = {
  settingStep: SettingStep;
  setSettingStep: React.Dispatch<React.SetStateAction<SettingStep>>;
};

export default function CertificateMember() {
  const { isCertificated, setIsCertificated } = certificateStore();
  const { setSettingStep } = useOutletContext<SettingOutletContext>();
  const navigate = useNavigate();
  const [password, handlePassword] = useInput('');
  const [eyeCheckState, setEyeCheckState] = useState(false);
  const onCheckPassword = () => {
    setIsCertificated(true);
    setSettingStep('editInfo');
    navigate('/mypage/setting/edit');
  };

  if (isCertificated) {
    return <Navigate to="/mypage/setting/edit" />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <label htmlFor="password">현재 비밀번호</label>
        <input
          className={styles.inputStyle}
          id="password"
          type={eyeCheckState ? 'text' : 'password'}
          value={password}
          onChange={handlePassword}
          placeholder="현재 비밀번호를 입력하세요."
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
        <button
          className={styles.button}
          type="button"
          onClick={onCheckPassword}
        >
          확인
        </button>
      </div>
    </div>
  );
}
