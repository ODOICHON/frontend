import { useEffect, useState } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import { withdrawalAPI } from '@/apis/user';
import { certificateStore } from '@/store/certificateStore';
import useInput from '@/hooks/useInput';
import {
  MAX_LENGTH_MEMBERSHIP_WITHDRAWAL_REASON_CONTENT,
  MEMBERSHIP_WITHDRAWAL_NOTE_LIST,
  MEMBERSHIP_WITHDRAWAL_REASON,
  MembershipWithdrawalReason,
  SETTING_STEP,
  SettingStep,
} from '@/constants/myPage';
import styles from './styles.module.scss';

type SettingOutletContext = {
  settingStep: SettingStep;
  setSettingStep: React.Dispatch<React.SetStateAction<SettingStep>>;
};

function WithdrawalFromMembership() {
  const { isCertificated } = certificateStore();
  const { setSettingStep } = useOutletContext<SettingOutletContext>();
  const [requiredCheckBox, setRequiredCheckBox] = useState<boolean>(false);
  const [inputCount, setInputCount] = useState(0);
  const [content, contentHandler] = useInput<string>('');
  const [requiredReasonCheckBox, setRequiredReasonCheckBox] = useState<
    (typeof MEMBERSHIP_WITHDRAWAL_REASON)[MembershipWithdrawalReason][]
  >([]);

  const onInputLengthCheckHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const text = e.target.value.replace(
      /[\0-\x7f]|([0-\u07ff]|(.))/g,
      '$&$1$2',
    );
    if (text.length <= MAX_LENGTH_MEMBERSHIP_WITHDRAWAL_REASON_CONTENT) {
      setInputCount(text.length);
      contentHandler(e);
    }
  };

  const onRequiredHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    setRequiredCheckBox(e.currentTarget.checked);
  };

  const onSelectHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    const membershipWithdrawalReason = e.currentTarget
      .id as MembershipWithdrawalReason;

    const membershipWithdrawalReasonValue: (typeof MEMBERSHIP_WITHDRAWAL_REASON)[MembershipWithdrawalReason] =
      MEMBERSHIP_WITHDRAWAL_REASON[membershipWithdrawalReason];

    const updatedReasonCheckBox = requiredReasonCheckBox.includes(
      membershipWithdrawalReasonValue,
    )
      ? requiredReasonCheckBox.filter(
          (item) => item !== membershipWithdrawalReasonValue,
        )
      : [...requiredReasonCheckBox, membershipWithdrawalReasonValue];

    setRequiredReasonCheckBox(updatedReasonCheckBox);
  };

  const onSubmitHandler = async () => {
    if (requiredCheckBox === false) return alert('필수 항목을 체크해주세요.');

    if (requiredReasonCheckBox.length === 0)
      return alert('탈퇴 이유를 선택해주세요.');
    await withdrawalAPI(requiredReasonCheckBox, content).catch((err) => {
      const { code, message } = err.response.data;
      if (code === 'U0008') return alert(message);
    });
  };

  useEffect(() => {
    if (isCertificated) {
      setSettingStep(SETTING_STEP.WITHDRAWAL);
    }
  }, []);

  if (!isCertificated) return <Navigate to="/mypage/setting" />;
  return (
    <article className={styles.wrapper}>
      <div>
        <div className={styles.box}>
          <h3 className={styles.title}>회원탈퇴시 처리내용</h3>
          <ol className={styles.ol}>
            {MEMBERSHIP_WITHDRAWAL_NOTE_LIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className={styles.mainCheck}>
          <input type="checkbox" id="check" onClick={onRequiredHandler} />
          <label role="presentation" htmlFor="check">
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
            {Object.entries(MEMBERSHIP_WITHDRAWAL_REASON).map(([key, text]) => (
              <li key={key}>
                <input type="checkbox" id={key} onClick={onSelectHandler} />
                <label htmlFor={key}>{text}</label>
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
            value={content}
            className={styles.textarea}
            onChange={onInputLengthCheckHandler}
          />
          <p className={styles.count}>
            <span>{inputCount}</span>
            <span>/{MAX_LENGTH_MEMBERSHIP_WITHDRAWAL_REASON_CONTENT}자</span>
          </p>
        </div>
      </div>
      <button
        className={[
          styles.button,
          requiredCheckBox === false || requiredReasonCheckBox.length === 0
            ? styles.deactivate
            : styles.activate,
        ].join(' ')}
        type="button"
        onClick={onSubmitHandler}
        disabled={
          requiredCheckBox === false || requiredReasonCheckBox.length === 0
        }
      >
        회원 탈퇴
      </button>
    </article>
  );
}

export default WithdrawalFromMembership;
