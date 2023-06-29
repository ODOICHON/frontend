import { PutReportAPI } from '@/apis/boards';
import useInput from '@/hooks/useInput';
import styles from './styles.module.scss';

type ReportModalProps = {
  id: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function ReoportModal({ id, setModal }: ReportModalProps) {
  // TODO: 신고 내용 필수, 유효성 검사 하기
  const [report, handler, setReport] = useInput('');

  const cancleHandler = () => {
    setReport('');
    setModal(false);
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
    <section className={styles.container}>
      <button type="button" onClick={cancleHandler}>
        X
      </button>
      <textarea value={report} onChange={handler} />
      <button type="button" onClick={submitReportHandler}>
        신고하기
      </button>
    </section>
  );
}

export default ReoportModal;
