import Button from '@/components/Common/ui/Button';
import { getDealStateName, getRentalName } from '@/utils/utils';
import styles from './styles.module.scss';

type DUMMY_TYPE = {
  rentalType: 'SALE' | 'JEONSE' | 'MONTHLYRENT';
  imageUrl: string;
  title: string;
  city: string;
  dealState: 'APPLYING' | 'ONGOING' | 'COMPLETED';
};

type MyTraeCardProps = {
  tradeItem: DUMMY_TYPE;
};

export default function MyTradeCard({
  tradeItem: { rentalType, imageUrl, title, city, dealState },
}: MyTraeCardProps) {
  const getButtonStyle = (state: 'APPLYING' | 'ONGOING' | 'COMPLETED') => {
    switch (state) {
      case 'APPLYING':
        return {
          borderColor: '#878d91',
          textColor: '#878d91',
          backgroundColor: undefined,
        };
      case 'ONGOING':
        return {
          borderColor: '#EC6130',
          textColor: '#EC6130',
          backgroundColor: undefined,
        };
      case 'COMPLETED':
        return {
          borderColor: undefined,
          textColor: 'white',
          backgroundColor: 'black',
        };
      default:
        throw new Error(`${state}를 찾을 수 없습니다.`);
    }
  };
  const onClickButton = () => {
    console.log('click!');
  };
  return (
    <tr className={styles.tradeCardWrapper}>
      <td>{getRentalName(rentalType)}</td>
      <td>
        <img className={styles.image} src={imageUrl} alt="tradeImage" />
      </td>
      <td>{title}</td>
      <td>{city}</td>
      <td>
        <Button
          text={getDealStateName(dealState)}
          onClick={onClickButton}
          borderColor={getButtonStyle(dealState).borderColor}
          textColor={getButtonStyle(dealState).textColor}
          backgroundColor={getButtonStyle(dealState).backgroundColor}
        />
      </td>
    </tr>
  );
}
