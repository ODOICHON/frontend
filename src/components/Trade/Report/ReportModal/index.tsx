import { useState } from 'react';
import { PutReportAPI } from '@/apis/boards';
import useInput from '@/hooks/useInput';
import { REPORT_TYPE } from '@/constants/report';
import styles from './styles.module.scss';

type ReportModalProps = {
  id: number;
  nickName: string;
  title: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function ReportModal({ id, nickName, title, setModal }: ReportModalProps) {
  const [report, handler, setReport] = useInput('');
  const [reportType, setReportType] = useState<string>('');

  const onChangeReportType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReportType(e.target.value);
  };

  const cancelHandler = () => {
    setReport('');
    setReportType('');
    setModal(false);
    // TODO: 스크롤 고정 해제 할것인가?
    // document.body.style.overflow = 'auto';
  };

  const submitReportHandler = async () => {
    try {
      if (reportType === '') return alert('신고사유를 선택해주세요.');

      await PutReportAPI(id, { reportReason: report, reportType });
      setModal(false);
      // TODO: 성공적으로 마무리 했다면 토스트 메세지 보여주기 ( 디자이너에게 물어보기 )
    } catch (err) {
      // TODO: 신고가 안됐을 때, 토스트 메세지 보여주기?
      alert(err);
    }
  };

  return (
    <div className={styles.background}>
      <section className={styles.container}>
        <h1 className={styles.title}>신고하기</h1>
        <article className={styles.body}>
          <p>작성자 : {nickName}</p>
          <p>게시물 제목 : {title}</p>
          <select onChange={onChangeReportType}>
            <option disabled hidden selected>
              신고사유
            </option>
            {REPORT_TYPE.map((type) => (
              <option key={type.type} value={type.type}>
                {type.name}
              </option>
            ))}
          </select>
          <textarea
            maxLength={100}
            value={report}
            onChange={handler}
            placeholder="사유 기술이 필요한 경우 작성 (100자 이내)"
          />
          <span>
            * 허위 신고로 인한 불이익은 신고자 본인에게 있습니다. 신중하게 신고
            바랍니다.
          </span>
          <div>
            <button type="button" onClick={cancelHandler}>
              취소
            </button>
            <button type="button" onClick={submitReportHandler}>
              신고
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}

export default ReportModal;
