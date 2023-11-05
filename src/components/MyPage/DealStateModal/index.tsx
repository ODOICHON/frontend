import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaRegCalendar } from 'react-icons/fa';
import { ImStarFull } from 'react-icons/im';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import arrowImage from '@/assets/common/dropdown.svg';
import { QueryKeys } from '@/queryClient';
import { HouseStatusType } from '@/types/Board/myPageType';
import { PutHouseStatusAPI } from '@/apis/houses';
import useInput from '@/hooks/useInput';
import { DropdownVariants } from '@/constants/variants';
import styles from './styles.module.scss';

type DealStateModalProps = {
  clickedHouseId: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};
type Value = Date | null;
type ValuePiece = Value | [Value, Value];

export default function DealStateModal({
  clickedHouseId,
  setModal,
}: DealStateModalProps) {
  const queryClient = useQueryClient();

  const [contact, handleContact] = useInput('');
  const [review, setReview] = useInput('');
  const [nickName, setNickName] = useInput('');

  const [clickedRating, setClickedRating] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [age, setAge] = useState('구매자 연령');
  const [selectedDate, setSelectedDate] = useState<ValuePiece>(new Date());
  const [nowDate, setNowDate] = useState('날짜');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false);

  const handleToggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const handleToggleAgeDropdown = () => {
    setIsAgeDropdownOpen(!isAgeDropdownOpen);
  };

  const handleDateChange = (date: ValuePiece) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
    setNowDate(dayjs(date as Date).format('YYYY-MM-DD'));
  };

  const handleAgeChange = (value: string) => {
    setAge(value);
    setIsAgeDropdownOpen(false);
  };

  const rateArray = [0, 1, 2, 3, 4];
  const ageArray = ['20대 이하', '30대', '40대', '50대', '60대 이상'];

  const handleStarClick = (index: number) => {
    const clickStates = [...clickedRating];
    for (let i = 0; i < 5; i += 1) {
      clickStates[i] = i <= index;
    }

    setClickedRating(clickStates);
  };

  const handleSubmit = async () => {
    const score = clickedRating.filter(Boolean).length;
    if (score === 0 || nowDate === '날짜' || contact === '') {
      alert('필수 항목을 입력해주세요.');
      return 0;
    }
    const form: HouseStatusType = {
      score,
      review,
      nickName,
      age: age === '구매자 연령' ? '' : age,
      contact,
      dealDate: nowDate,
    };
    const response = await PutHouseStatusAPI(form, clickedHouseId);
    if (response.code === 'SUCCESS') {
      queryClient.refetchQueries([QueryKeys.MY_HOUSES]);
      alert('매물 상태가 변경되었습니다.');
      setModal(false);
    }
  };

  return (
    <div className={styles.background}>
      <section className={styles.container}>
        <article className={styles.titleWrapper}>
          <h1>판매 완료 변경</h1>
          <p>*는 필수로 입력해야 하는 값입니다. </p>
        </article>
        <article className={styles.body}>
          <form>
            <section className={styles.inputWrapper}>
              <label htmlFor="">
                거래 만족도<strong>*</strong>
              </label>
              <span className={styles.ratingBox}>
                {rateArray.map((el) => (
                  <ImStarFull
                    key={el}
                    onClick={() => handleStarClick(el)}
                    className={clickedRating[el] ? styles.black : ''}
                    size="2rem"
                  />
                ))}
              </span>
              <label htmlFor="">
                팔린 날짜<strong>*</strong>
              </label>
              <div className={styles.calendarContainer}>
                <button
                  className={styles.dropdownButton}
                  onClick={handleToggleCalendar}
                  type="button"
                >
                  {nowDate}
                  <FaRegCalendar />
                </button>
                {isCalendarOpen && (
                  <div className={styles.calendarWrapper}>
                    <Calendar
                      onChange={handleDateChange}
                      value={selectedDate}
                    />
                  </div>
                )}
              </div>
              <label htmlFor="">
                구매자 전화번호<strong>*</strong>
              </label>
              <input
                className={styles.inputStyle}
                type="text"
                placeholder={`'-'없이 기재`}
                value={contact}
                onChange={handleContact}
              />
              <label htmlFor="">구매자 주말내집 닉네임</label>
              <input
                className={styles.inputStyle}
                type="text"
                value={nickName}
                onChange={setNickName}
              />
              <label htmlFor="">구매자 연령</label>
              <div className={styles.ageDropdownContainer}>
                <button
                  className={styles.dropdownButton}
                  onClick={handleToggleAgeDropdown}
                  type="button"
                >
                  {age}
                  <img
                    src={arrowImage}
                    alt="arrowImage"
                    className={
                      isAgeDropdownOpen ? styles.clicked : styles.notClicked
                    }
                  />
                </button>
                <AnimatePresence>
                  {isAgeDropdownOpen && (
                    <motion.ul
                      variants={DropdownVariants}
                      initial="initial"
                      animate="visiable"
                      exit="exit"
                      className={styles.ageDropdownWrapper}
                    >
                      {ageArray.map((item) => (
                        <li
                          key={item}
                          role="presentation"
                          onClick={() => handleAgeChange(item)}
                        >
                          {item}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </section>
            <textarea
              className={styles.textWrapper}
              value={review}
              onChange={setReview}
              maxLength={100}
              placeholder={`이번 판매는 어떠셨나요?
후기를 남겨주시면 주말내집의 발전에 큰 도움이 됩니다! (500자 이내/선택사항)`}
            />
            <p className={styles.desc}>* 변경 이후 재변경은 불가능합니다.</p>
            <p className={styles.desc}>
              * 잘못된 변경으로 인한 불이익은 상태 변경자 본인에게 있습니다.
              신중하게 변경 바랍니다.
            </p>
            <div className={styles.buttonWrapper}>
              <button type="button" onClick={() => setModal(false)}>
                취소
              </button>
              <button type="button" onClick={handleSubmit}>
                변경
              </button>
            </div>
          </form>
        </article>
      </section>
    </div>
  );
}
