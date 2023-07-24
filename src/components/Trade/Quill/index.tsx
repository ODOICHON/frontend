import { useRef } from 'react';
import ReactQuill from 'react-quill';
import useQuillModules from '@/hooks/useQuillModules';
import 'react-quill/dist/quill.snow.css';
import styles from './styles.module.scss';
// TODO: 이미지 10개 이상 등록 불가

export default function TradeQuill() {
  const QuillRef = useRef<ReactQuill>();
  // 이미지를 업로드 하기 위한 함수
  const modules = useQuillModules(QuillRef);

  return (
    <div className={styles.container}>
      <section className={styles.sectionWrapper}>
        <span className={styles.inputWrapper}>
          <label>제목</label>
          <input
            className={styles.titleInput}
            type="text"
            placeholder="50자 이내로 제목을 입력해 주세요."
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
            modules={modules}
            placeholder="사진 5장 이상은 필수입니다. 5장 이상(건물 외관, 내부 포함) 업로드 되지 않을 시, 반려됩니다."
          />
        </span>
      </section>
      <section>
        <button type="button">임시저장</button>
        <button type="button">등록하기</button>
      </section>
    </div>
  );
}
