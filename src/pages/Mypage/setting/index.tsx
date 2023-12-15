import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Common/ui/Button';
import { SettingStep } from '@/types/MyPage/settingType';
import { settingInfo } from '@/constants/components';
import styles from './styles.module.scss';

export default function MySettingsPage() {
  const navigate = useNavigate();
  const [settingStep, setSettingStep] = useState<SettingStep>('certification');
  return (
    <section className={styles.container}>
      <article className={styles.titleWrapper}>
        <h1>{settingInfo[settingStep].title}</h1>
        <p>{settingInfo[settingStep].subTitle}</p>
      </article>
      <article className={styles.contentWrapper}>
        {settingInfo[settingStep].component(setSettingStep)}
      </article>
      <article className={styles.buttonWrapper}>
        {settingStep !== 'withdraw' && (
          <Button
            text="회원 탈퇴"
            borderColor="#eaeeef"
            backgroundColor="#eaeeef"
            textColor="black"
            disabled={settingStep === 'certification'}
            onClick={() => setSettingStep('withdraw')}
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
