import React from 'react';
import { TermType } from '@/types/signUp';
import MarketingTerm from './MarketingTerm';
import PrivacyTerm from './PrivacyTerm';
import ServiceTerm from './ServiceTerm';
import styles from './styles.module.scss';

type TermsProps = {
  selectedTerm: TermType;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Terms({ selectedTerm, setToggle }: TermsProps) {
  const onToggleClick = () => {
    const bodyEl = document.querySelector('body');
    bodyEl?.classList.remove('over_hidden');
    setToggle(false);
  };
  return (
    <div className={styles.overlay}>
      {selectedTerm === 'SERVICE' && (
        <ServiceTerm onToggleClick={onToggleClick} />
      )}
      {selectedTerm === 'PRIVACY' && (
        <PrivacyTerm onToggleClick={onToggleClick} />
      )}
      {selectedTerm === 'MARKETING' && (
        <MarketingTerm onToggleClick={onToggleClick} />
      )}
    </div>
  );
}
