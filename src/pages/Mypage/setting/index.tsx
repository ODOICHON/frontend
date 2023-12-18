import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Button from '@/components/Common/ui/Button';
import { certificateStore } from '@/store/certificateStore';
import { SETTING_STEP, SettingStep, settingInfo } from '@/constants/myPage';
import styles from './styles.module.scss';

export default function MySettingsPage() {
  const { isCertificated, setIsCertificated } = certificateStore();
  const navigate = useNavigate();
  const [settingStep, setSettingStep] = useState<SettingStep>(
    isCertificated ? 'editInfo' : 'certification',
  );

  const onClickWithdraw = () => {
    setIsCertificated(true);
    setSettingStep(SETTING_STEP.WITHDRAWAL);
    navigate('/mypage/setting/withdrawal');
  };
  return (
    <section className={styles.container}>
      <article className={styles.titleWrapper}>
        <h1>{settingInfo[settingStep].title}</h1>
        <p>{settingInfo[settingStep].subTitle}</p>
      </article>
      <article className={styles.contentWrapper}>
        <Outlet
          context={{
            settingStep,
            setSettingStep,
          }}
        />
      </article>
      <article className={styles.buttonWrapper}>
        {settingStep !== SETTING_STEP.WITHDRAWAL && (
          <Button
            text="회원 탈퇴"
            borderColor="#eaeeef"
            backgroundColor="#eaeeef"
            textColor="black"
            disabled={!isCertificated}
            onClick={onClickWithdraw}
          />
        )}
        <Button
          text="홈으로"
          borderColor="#eaeeef"
          backgroundColor="#eaeeef"
          textColor="black"
          onClick={() => navigate('/mypage/home')}
        />
      </article>
    </section>
  );
}
