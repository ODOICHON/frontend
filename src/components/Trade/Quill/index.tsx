import { useRef } from 'react';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import { TradeBoardDetailType, TradeBoardForm } from '@/types/Board/tradeType';
import getImageUrls from '@/utils/Quill/getImageUrls';
import { PostHouseAPI } from '@/apis/houses';
import userStore from '@/store/userStore';
import useQuillModules from '@/hooks/useQuillModules';
import 'react-quill/dist/quill.snow.css';
import { checkBeforeTradePost } from '@/utils/utils';
import styles from './styles.module.scss';

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
  const { state }: { state: { data: TradeBoardDetailType } } = useLocation();
  const QuillRef = useRef<ReactQuill>();
  // 이미지를 업로드 하기 위한 함수
  const modules = useQuillModules(QuillRef);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (tradeBoardForm: TradeBoardForm) =>
      restFetcher({
        method: 'PUT',
        path: `houses/${state.data.houseId}`,
        body: {
          ...tradeBoardForm,
        },
      }),
    {
      onSuccess: () => {
        alert('게시글을 수정하였습니다.');
        queryClient.refetchQueries([QueryKeys.TRADE_BOARD]);
        navigate(`/trade`);
      },
      onError: () => {
        alert('게시글 수정을 실패했습니다.');
      },
    },
  );

  const onPost = async () => {
    const imageUrls = [thumbnail, ...getImageUrls(form.code)];

    const extractedYear = form.createdDate.match(/\d{4}/);
    const createdDate = extractedYear ? extractedYear[0] : '2002';

    const newForm = {
      ...form,
      contact: form.contact.replace(/\-/g, ''),
      size: form.size.replace(/m2/g, ''),
      createdDate,
      imageUrls,
    };

    if (!checkBeforeTradePost(user!, newForm)) return;

    try {
      await PostHouseAPI(newForm);
      alert('등록되었습니다.');
      navigate(`/trade`);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = async () => {
    const imageUrls = [thumbnail, ...getImageUrls(form.code)];

    const extractedYear = form.createdDate.match(/\d{4}/);
    const createdDate = extractedYear ? extractedYear[0] : '2002';

    const newForm = {
      ...form,
      contact: form.contact.replace(/\-/g, ''),
      size: form.size.replace(/m2/g, ''),
      createdDate,

      imageUrls,
    };

    if (!checkBeforeTradePost(user!, newForm)) return;

    mutate(newForm);
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
            value={form.code}
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
        {state ? (
          <button type="button" onClick={onUpdate}>
            수정하기
          </button>
        ) : (
          <button type="button" onClick={onPost}>
            등록하기
          </button>
        )}
      </section>
    </div>
  );
}
