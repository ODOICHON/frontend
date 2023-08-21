import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import styles from './styles.module.scss';

type AddressModalProps = {
  setForm: React.Dispatch<React.SetStateAction<any>>;
  setIsPostcodeOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddressModal({ setForm, setIsPostcodeOpen }: AddressModalProps) {
  const handleComplete = (data: any) => {
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
    setForm((prev: any) => ({
      ...prev,
      city: fullAddress,
      zipCode: data.zonecode,
    }));
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
