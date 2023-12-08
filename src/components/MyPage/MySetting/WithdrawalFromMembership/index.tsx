import { useState } from 'react';
import styles from './styles.module.scss';

const CONTENT_LIST = [
  '회원탈퇴 후 주말내집 서비스에 입력한 게시물 및 댓글은 삭제되지 않으며, 회원정보 삭제로 인해 작성자 본인을 확인할 수 없으므로 게시물 편집 및 삭제 처리가 원천적으로 불가능합니다. 게시물 삭제를 원하실 경우에는 먼저 해당 게시물을 삭제 하신 후 , 탈퇴를 신청하시기 바랍니다.',
  '회사는 해당 요청을 확인한 후 탈퇴를 처리합니다.',
  '회사는 탈퇴로 인해 발생한 피해에 대해 어떠한 책임도 지지 않습니다.',
];

const CHECK_LIST = [
  '이용 빈도가 낮음',
  '재가입을 위하여',
  '콘텐츠 및 정보 부족',
  '개인 정보 보호',
  '기타',
];

function WithdrawalFromMembership() {
  const [inputCount, setInputCount] = useState(0);

  const onInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(
      e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length,
    );
  };

  return (
    <article className={styles.wrapper}>
      <div>
        <div className={styles.box}>
          <h3 className={styles.title}>회원탈퇴시 처리내용</h3>
          <ol className={styles.ol}>
            {CONTENT_LIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className={styles.mainCheck}>
          <input type="checkbox" id="check" />
          <label htmlFor="check">
            위 내용을 모두 확인하였습니다.{' '}
            <span className={styles.mainColor}>(필수)</span>
          </label>
        </div>
      </div>
      <div>
        <h3 className={styles.title}>
          주말내집에서 탈퇴하려는 이유가 무엇인가요?(복수선택 가능,{' '}
          <span className={styles.mainColor}>필수</span>)
        </h3>
        <div className={styles.box}>
          <ul className={styles.checkList}>
            {CHECK_LIST.map((item) => (
              <li key={item}>
                <input type="checkbox" id={item} />
                <label htmlFor={item}>{item}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h3 className={styles.title}>
          주말내집 서비스 이용 중 어떤 부분이 불편하셨나요?
        </h3>
        <h4 className={styles.sub}>
          여러분의 소중한 의견을 반영해 더 좋은 서비스로 찾아뵙겠습니다.
        </h4>
        <div className={styles.box}>
          <textarea
            className={styles.textarea}
            onChange={onInputHandler}
            maxLength={1000}
          />
          <p className={styles.count}>
            <span>{inputCount}</span>
            <span>/1000 자</span>
          </p>
        </div>
      </div>
      <button className={styles.button} type="button">
        회원 탈퇴
      </button>
    </article>
  );
}

export default WithdrawalFromMembership;
