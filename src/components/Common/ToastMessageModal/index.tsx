import BasicIcon from '@/assets/common/basic.png';
import ErrorIcon from '@/assets/common/error.png';
import SuccessIcon from '@/assets/common/success.png';
import styles from './styles.module.scss';

type ICON_TYPE = 'SUCCESS' | 'ERROR' | 'DEFAULT';

export type ToastMessageModalProps = {
  message: string;
  subMessage?: string;
  confirmModal?: boolean;
  iconType: ICON_TYPE;
  onClose?: () => void;
  onConfirm?: () => void;
};

const ICON = {
  SUCCESS: <img src={SuccessIcon} alt="success" />,
  ERROR: <img src={ErrorIcon} alt="error" />,
  DEFAULT: <img src={BasicIcon} alt="default" />,
};

function ToastMessageModal({
  message,
  subMessage,
  confirmModal = false,
  iconType,
  onClose,
  onConfirm,
}: ToastMessageModalProps) {
  return (
    <article className={styles.container}>
      <div className={styles.box}>
        <div>
          <div>{ICON[iconType]}</div>
          <div className={styles.messageBox}>
            <h1>{message}</h1>
            <p>{subMessage}</p>
          </div>
        </div>
        <div className={styles.buttonBox}>
          {confirmModal && (
            <button className={styles.cancel} type="button" onClick={onClose}>
              취소
            </button>
          )}
          <button
            className={styles.confirm}
            type="button"
            onClick={confirmModal ? onConfirm : onClose}
          >
            확인
          </button>
        </div>
      </div>
    </article>
  );
}

export default ToastMessageModal;
