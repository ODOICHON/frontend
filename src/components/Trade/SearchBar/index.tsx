import { useEffect, useRef, useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { AnimatePresence } from 'framer-motion';
import { MenuType } from '@/types/Board/tradeType';
import { CATEGORY_MENU, LOCATION_MENU, TYPE_MENU } from '@/constants/trade';
import styles from './styles.module.scss';
import Dropdown from '../Dropdown';

export default function SearchBar() {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [type, setType] = useState('유형');
  const [location, setLocation] = useState('위치');
  const [category, setCategory] = useState('카테고리');
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
        style={{ flexGrow: '5' }}
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
            <p style={{ color: type !== '유형' ? 'black' : '' }}>{type}</p>
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
          style={{ flexGrow: '1.5' }}
          onClick={() => setSelectedMenu('location')}
        >
          <div>
            <p style={{ color: location !== '위치' ? 'black' : '' }}>
              {location}
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

        <div className={styles.divider} />

        <span
          role="presentation"
          className={
            selectedMenu === 'category'
              ? styles.selectedSearchItem
              : styles.searchItem
          }
          style={{ flexGrow: '1.5' }}
          onClick={() => setSelectedMenu('category')}
        >
          <div>
            <p style={{ color: category !== '카테고리' ? 'black' : '' }}>
              {category}
            </p>
            <GoTriangleDown color="#d9d9d9" size="1.25rem" />
          </div>
          <AnimatePresence>
            {selectedMenu === 'category' && (
              <Dropdown
                menu={CATEGORY_MENU}
                setMenu={setCategory}
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
          <input type="text" placeholder="직접 검색" />
          <button type="submit">검색</button>
        </form>
      </section>
    </div>
  );
}
