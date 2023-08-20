import { useRef } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { TradeBoardForm } from '@/types/Board/tradeType';
import getImageUrls from '@/utils/Quill/getImageUrls';
import { PostHouseAPI } from '@/apis/houses';
import userStore from '@/store/userStore';
import useQuillModules from '@/hooks/useQuillModules';
import 'react-quill/dist/quill.snow.css';
import { checkBeforeTradePost } from '@/utils/utils';
import styles from './styles.module.scss';
// TODO: 이미지 10개 이상 등록 불가

type TradeQuillProps = {
  form: TradeBoardForm;
  setForm: React.Dispatch<React.SetStateAction<TradeBoardForm>>;
  onChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  thumbnail: string;
};

export default function TradeQuill({
  form,
  onChangeForm,
  setForm,
  thumbnail,
}: TradeQuillProps) {
  const { user } = userStore();
  const navigate = useNavigate();

  const QuillRef = useRef<ReactQuill>();
  // 이미지를 업로드 하기 위한 함수
  const modules = useQuillModules(QuillRef);

  const onPost = async () => {
    const imageUrls = [thumbnail, ...getImageUrls(form.code)];

    const newForm = {
      ...form,
      imageUrls,
    };

    if (!checkBeforeTradePost(user!, newForm)) return;

    try {
      await PostHouseAPI(newForm);
      navigate(`/trade`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.sectionWrapper}>
        <span className={styles.inputWrapper}>
          <label>제목</label>
          <input
            className={styles.titleInput}
            type="text"
            placeholder="50자 이내로 제목을 입력해 주세요."
            name="title"
            value={form.title}
            onChange={onChangeForm}
          />
        </span>
        <span className={styles.inputWrapper}>
          <label>내용</label>
          <ReactQuill
            className={styles.quill}
            ref={(element) => {
              if (element !== null) {
                QuillRef.current = element;
              }
            }}
            onChange={(value) => setForm((prev) => ({ ...prev, code: value }))}
            modules={modules}
            placeholder="사진 5장 이상은 필수입니다. 5장 이상(건물 외관, 내부 포함) 업로드 되지 않을 시, 반려됩니다."
          />
        </span>
      </section>
      <section>
        <button
          type="button"
          onClick={() => {
            // TODO: 임시저장 기능 구현
            alert('준비중입니다.');
          }}
        >
          임시저장
        </button>
        <button type="button" onClick={onPost}>
          등록하기
        </button>
      </section>
    </div>
  );
}
