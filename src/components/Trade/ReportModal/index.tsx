import { PutReportAPI } from '@/apis/boards';
import useInput from '@/hooks/useInput';
import { reportType } from '@/constants/report';
import styles from './styles.module.scss';

type ReportModalProps = {
  id: number;
  nickName: string;
  title: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function ReportModal({ id, nickName, title, setModal }: ReportModalProps) {
  // TODO: 신고 내용 필수, 유효성 검사 하기
  const [report, handler, setReport] = useInput('');

  const cancelHandler = () => {
    setReport('');
    setModal(false);
    // document.body.style.overflow = 'auto';
  };

  const submitReportHandler = async () => {
    try {
      await PutReportAPI(id, report);
      setModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.background}>
      <section className={styles.container}>
        <h1 className={styles.title}>신고하기</h1>
        <article className={styles.body}>
          <p>작성자 : {nickName}</p>
          <p>게시물 제목 : {title}</p>
          <select>
            {reportType.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <textarea
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
