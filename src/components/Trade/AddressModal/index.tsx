import React, { useEffect, useRef } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import styles from './styles.module.scss';

type AddressModalProps = {
  callback: (fullAddress: string, zipCode?: string) => void;
  setIsPostcodeOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddressModal({ callback, setIsPostcodeOpen }: AddressModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    callback(fullAddress, data.zonecode);
    setIsPostcodeOpen((pre) => !pre);
  };
  useEffect(() => {
    const handleCloseModal = (e: Event | React.MouseEvent) => {
      if (!modalRef.current || !modalRef.current!.contains(e.target as Node))
        setIsPostcodeOpen(false);
    };
    window.addEventListener('mousedown', handleCloseModal);
    return () => {
      window.removeEventListener('mousedown', handleCloseModal);
    };
  }, [modalRef]);
  return (
    <div className={styles.background}>
      <section ref={modalRef} className={styles.container}>
        <DaumPostcodeEmbed onComplete={handleComplete} autoClose={false} />
      </section>
    </div>
  );
}

export default AddressModal;
