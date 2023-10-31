import Button from '@/components/Common/ui/Button';
import { MyTradeHouseType } from '@/types/Board/tradeType';
import { getDealStateName, getRentalName } from '@/utils/utils';
import styles from './styles.module.scss';

type MyTraeCardProps = {
  tradeItem: MyTradeHouseType;
  onClickButton: () => void;
};

export default function MyTradeCard({
  tradeItem: { rentalType, imageUrl, title, city, dealState },
  onClickButton,
}: MyTraeCardProps) {
  const getButtonStyle = (state: 'APPLYING' | 'ONGOING' | 'COMPLETED') => {
    switch (state) {
      case 'APPLYING':
        return {
          borderColor: '#878d91',
          textColor: '#878d91',
          backgroundColor: undefined,
          disabled: true,
        };
      case 'ONGOING':
        return {
          borderColor: '#EC6130',
          textColor: '#EC6130',
          backgroundColor: undefined,
          disabled: false,
        };
      case 'COMPLETED':
        return {
          borderColor: undefined,
          textColor: 'white',
          backgroundColor: 'black',
          disabled: true,
        };
      default:
        throw new Error(`${state}를 찾을 수 없습니다.`);
    }
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
          disabled={getButtonStyle(dealState).disabled}
        />
      </td>
    </tr>
  );
}
