import React from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import styles from './styles.module.scss';

type AddressModalProps = {
  callback: (fullAddress: string, zipCode?: string) => void;
  setIsPostcodeOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddressModal({ callback, setIsPostcodeOpen }: AddressModalProps) {
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
  return (
    <div className={styles.background}>
      <section className={styles.container}>
        <DaumPostcodeEmbed onComplete={handleComplete} autoClose={false} />
      </section>
    </div>
  );
}

export default AddressModal;
