import { useEffect, useRef, useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { AnimatePresence } from 'framer-motion';
import { HouseType, MenuType, RentalType } from '@/types/Board/tradeType';
import { convertHouseTypeName, convertRentalTypeName } from '@/utils/utils';
import { houseCategory, tradeCategory, tradeCity } from '@/constants/trade';
import styles from './styles.module.scss';
import Dropdown from '../Dropdown';

type SearchBarProps = {
  houseType: string;
  rentalType: string;
  city: string;
  search: string;
  setHouseType: React.Dispatch<React.SetStateAction<string>>;
  setRentalType: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  fetchBoard: () => void;
};

export default function SearchBar({
  houseType,
  rentalType,
  city,
  search,
  setHouseType,
  setRentalType,
  setCity,
  setSearch,
  setCurrentPage,
  fetchBoard,
}: SearchBarProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedMenu, setSelectedMenu] = useState<MenuType>('none');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (document.activeElement as HTMLElement).blur();
    setSelectedMenu('none');
    setCurrentPage(0);
    fetchBoard();
  };

  useEffect(() => {
    const handleCloseModal = (e: Event | React.MouseEvent) => {
      if (
        selectedMenu !== 'none' &&
        (!dropdownRef.current ||
          !dropdownRef.current!.contains(e.target as Node))
      )
        setSelectedMenu('none');
    };
    window.addEventListener('mousedown', handleCloseModal);
    return () => {
      window.removeEventListener('mousedown', handleCloseModal);
    };
  }, [dropdownRef, selectedMenu]);

  return (
    <div className={styles.container}>
      <section
        ref={dropdownRef}
        className={styles.selectItem}
        style={{ flexGrow: '1' }}
      >
        <span
          role="presentation"
          className={
            selectedMenu === 'houseType'
              ? styles.selectedSearchItem
              : styles.searchItem
          }
          onClick={() => setSelectedMenu('houseType')}
        >
          <div>
            <p style={{ color: houseType !== '' ? 'black' : '' }}>
              {houseType === ''
                ? '유형'
                : convertHouseTypeName(houseType as HouseType)}
            </p>
            <GoTriangleDown color="#d9d9d9" size="1.25rem" />
          </div>
          <AnimatePresence>
            {selectedMenu === 'houseType' && (
              <Dropdown
                menu={houseCategory}
                setMenu={setHouseType}
                setSelectedMenu={setSelectedMenu}
              />
            )}
          </AnimatePresence>
        </span>

        <div className={styles.divider} />

        <span
          role="presentation"
          className={
            selectedMenu === 'rentalType'
              ? styles.selectedSearchItem
              : styles.searchItem
          }
          onClick={() => setSelectedMenu('rentalType')}
        >
          <div>
            <p style={{ color: rentalType !== '' ? 'black' : '' }}>
              {rentalType === ''
                ? '거래'
                : convertRentalTypeName(rentalType as RentalType)}
            </p>
            <GoTriangleDown color="#d9d9d9" size="1.25rem" />
          </div>
          <AnimatePresence>
            {selectedMenu === 'rentalType' && (
              <Dropdown
                menu={tradeCategory}
                setMenu={setRentalType}
                setSelectedMenu={setSelectedMenu}
              />
            )}
          </AnimatePresence>
        </span>

        <div className={styles.divider} />

        <span
          role="presentation"
          className={
            selectedMenu === 'city'
              ? styles.selectedSearchItem
              : styles.searchItem
          }
          onClick={() => setSelectedMenu('city')}
        >
          <div>
            <p style={{ color: city !== '' ? 'black' : '' }}>
              {city === '' ? '위치' : city}
            </p>
            <GoTriangleDown color="#d9d9d9" size="1.25rem" />
          </div>
          <AnimatePresence>
            {selectedMenu === 'city' && (
              <Dropdown
                menu={tradeCity}
                setMenu={setCity}
                setSelectedMenu={setSelectedMenu}
              />
            )}
          </AnimatePresence>
        </span>
      </section>
      <div className={styles.divider} />
      <section
        role="presentation"
        className={
          selectedMenu === 'search'
            ? styles.selectedSearchItem
            : styles.searchItem
        }
        style={{ flexGrow: '1' }}
        onClick={() => setSelectedMenu('search')}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="직접 검색"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <button type="submit">검색</button>
        </form>
      </section>
    </div>
  );
}
