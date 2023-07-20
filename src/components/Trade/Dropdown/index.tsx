import { motion } from 'framer-motion';
import { MenuType } from '@/types/Board/tradeType';
import { tradeDropdownVariants } from '@/constants/variants';
import styles from './styles.module.scss';

type DropdownProps = {
  menu: string[];
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  setSelectedMenu: React.Dispatch<React.SetStateAction<MenuType>>;
};

export default function Dropdown({
  menu,
  setMenu,
  setSelectedMenu,
}: DropdownProps) {
  const onClickMenu = (
    event: React.MouseEvent<HTMLLIElement>,
    item: string,
  ) => {
    event.stopPropagation();
    setMenu(item);
    setSelectedMenu('none');
  };
  return (
    <motion.ul
      variants={tradeDropdownVariants}
      initial="initial"
      animate="visiable"
      exit="exit"
      id="dropdown"
      className={styles.dropdown}
    >
      {menu.map((item) => (
        <li
          key={item}
          role="presentation"
          className={styles.dropdownMenu}
          onClick={(event) => onClickMenu(event, item)}
        >
          <p>{item}</p>
        </li>
      ))}
    </motion.ul>
  );
}
