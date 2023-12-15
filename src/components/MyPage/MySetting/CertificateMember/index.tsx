import { useState } from 'react';
import eyeImage from '@/assets/common/eye.svg';
import eyeClosedImage from '@/assets/common/eyeClosed.svg';
import { SettingStep } from '@/types/MyPage/settingType';
import useInput from '@/hooks/useInput';
import styles from './styles.module.scss';

type CertificateMemberProps = {
  setSettingStep: React.Dispatch<React.SetStateAction<SettingStep>>;
};

export default function CertificateMember({
  setSettingStep,
}: CertificateMemberProps) {
  const [password, handlePassword] = useInput('');
  const [eyeCheckState, setEyeCheckState] = useState(false);
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
          onClick={() => setSettingStep('editInfo')}
        >
          확인
        </button>
      </div>
    </div>
  );
}
