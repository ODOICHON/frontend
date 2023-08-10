import { useEffect, useRef, useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { AnimatePresence } from 'framer-motion';
import { MenuType } from '@/types/Board/tradeType';
import { LOCATION_MENU, TYPE_MENU } from '@/constants/trade';
import styles from './styles.module.scss';
import Dropdown from '../Dropdown';

type SearchBarProps = {
  type: string;
  location: string;
  search: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({
  type,
  location,
  search,
  setType,
  setLocation,
  setSearch,
}: SearchBarProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedMenu, setSelectedMenu] = useState<MenuType>('none');
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
        style={{ flexGrow: '2' }}
      >
        <span
          role="presentation"
          className={
            selectedMenu === 'type'
              ? styles.selectedSearchItem
              : styles.searchItem
          }
          style={{ flexGrow: '1' }}
          onClick={() => setSelectedMenu('type')}
        >
          <div>
            <p style={{ color: type !== '' ? 'black' : '' }}>
              {type === '' ? '유형' : type}
            </p>
            <GoTriangleDown color="#d9d9d9" size="1.25rem" />
          </div>
          <AnimatePresence>
            {selectedMenu === 'type' && (
              <Dropdown
                menu={TYPE_MENU}
                setMenu={setType}
                setSelectedMenu={setSelectedMenu}
              />
            )}
          </AnimatePresence>
        </span>

        <div className={styles.divider} />

        <span
          role="presentation"
          className={
            selectedMenu === 'location'
              ? styles.selectedSearchItem
              : styles.searchItem
          }
          style={{ flexGrow: '1' }}
          onClick={() => setSelectedMenu('location')}
        >
          <div>
            <p style={{ color: location !== '' ? 'black' : '' }}>
              {location === '' ? '위치' : location}
            </p>
            <GoTriangleDown color="#d9d9d9" size="1.25rem" />
          </div>
          <AnimatePresence>
            {selectedMenu === 'location' && (
              <Dropdown
                menu={LOCATION_MENU}
                setMenu={setLocation}
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
        style={{ flexGrow: '3' }}
        onClick={() => setSelectedMenu('search')}
      >
        <form>
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
