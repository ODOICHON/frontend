import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ModalPortal from '@/components/Common/ModalPortal';
import ToastMessageModal from '@/components/Common/ToastMessageModal';
import { QueryKeys, restFetcher } from '@/queryClient';
import { TradeBoardDetailType, TradeBoardForm } from '@/types/Board/tradeType';
import getImageUrls from '@/utils/Quill/getImageUrls';
import getNotUsedImageUrl from '@/utils/Quill/getNotUsedImageUrl';
import { PostHouseAPI } from '@/apis/houses';
import { deleteFile } from '@/apis/uploadS3';
import { imageStore } from '@/store/imageStore';
import userStore from '@/store/userStore';
import useModalState from '@/hooks/useModalState';
import useQuillModules from '@/hooks/useQuillModules';
import 'react-quill/dist/quill.snow.css';
import useToastMessageType from '@/hooks/useToastMessageType';
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
  const { images, setImages, resetImages } = imageStore();
  const { user } = userStore();
  const navigate = useNavigate();
  const { modalState, handleModalOpen, handleModalClose } = useModalState();
  const { toastMessageProps, handleToastMessageProps } = useToastMessageType();
  const { state }: { state: { data: TradeBoardDetailType } } = useLocation();

  const [isProcessing, setIsProcessing] = useState(false);

  const QuillRef = useRef<ReactQuill>();
  const imagesRef = useRef(images);
  const isProcessingRef = useRef(isProcessing);

  const modules = useQuillModules(QuillRef, setImages);

  const queryClient = useQueryClient();
  const { mutate, isLoading: isUpdateLoading } = useMutation(
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
        handleToastMessageProps('POST_UPDATE_SUCCESS', () => {
          handleModalClose();
        });
        queryClient.refetchQueries([QueryKeys.TRADE_BOARD]);
        queryClient.refetchQueries([QueryKeys.MY_SAVES]);
        handleModalOpen();
      },
      onError: () => {
        handleToastMessageProps('POST_UPDATE_ERROR', handleModalClose);
        handleModalOpen();
      },
    },
  );

  const onPost = async ({ isTempSave }: { isTempSave: boolean }) => {
    setIsProcessing(true);
    const imageUrls = [thumbnail, ...getImageUrls(form.code)];
    const notUsedImageUrls = getNotUsedImageUrl(images, imageUrls);

    const extractedYear = form.createdDate.match(/\d{4}/);
    const createdDate = extractedYear ? extractedYear[0] : '';

    const newForm: TradeBoardForm = {
      ...form,
      contact: form.contact.replace(/\-/g, ''),
      size: form.size.replace(/m2/g, ''),
      createdDate,
      imageUrls,
      tmpYn: isTempSave,
    };

    if (!isTempSave) {
      if (!checkBeforeTradePost(user!, newForm)) {
        setIsProcessing(false);
        return;
      }
    }

    try {
      await PostHouseAPI(newForm);
      deleteFile(notUsedImageUrls);
      resetImages();
      if (isTempSave) {
        alert('게시글이 임시저장 되었습니다.');
        queryClient.refetchQueries([QueryKeys.MY_SAVES]);
      } else {
        handleToastMessageProps('POST_CREATE_SUCCESS', () => {
          handleModalClose();
          navigate(`/trade`);
        });
        queryClient.refetchQueries([QueryKeys.TRADE_BOARD]);
        handleModalOpen();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const onUpdate = async ({ isTempSave }: { isTempSave: boolean }) => {
    const imageUrls = [thumbnail, ...getImageUrls(form.code)];
    const notUsedImageUrls = getNotUsedImageUrl(images, imageUrls);
    const extractedYear = form.createdDate.match(/\d{4}/);
    const createdDate = extractedYear ? extractedYear[0] : '2002';

    const newForm: TradeBoardForm = {
      ...form,
      contact: form.contact.replace(/\-/g, ''),
      size: form.size.replace(/m2/g, ''),
      createdDate,
      imageUrls,
      tmpYn: isTempSave,
    };

    if (!isTempSave) {
      if (!checkBeforeTradePost(user!, newForm)) return;
    }
    try {
      mutate(newForm);
      deleteFile(notUsedImageUrls);
      resetImages();
      if (isTempSave) {
        alert('게시글이 임시저장 되었습니다.');
      } else {
        handleToastMessageProps('POST_UPDATE_SUCCESS', () => {
          handleModalClose();
          navigate(`/trade`);
        });
        handleModalOpen();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isPosting = Boolean(!state); // 처음 글을 작성하는 상태
  const isUpdating = Boolean(state && !state.data.tmpYn); // 등록된 글을 수정하는 상태
  const isSaving = Boolean(state && state.data.tmpYn); // 임시저장된 글을 작성하는 상태

  useEffect(() => {
    imagesRef.current = images;
    isProcessingRef.current = isProcessing;
  }, [images, isProcessing]);

  useEffect(() => {
    return () => {
      if (!isProcessingRef.current) {
        deleteFile(imagesRef.current);
        resetImages();
      }
    };
  }, []);

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
        {(isPosting || isSaving) && (
          <button
            type="button"
            onClick={() =>
              isPosting
                ? onPost({ isTempSave: true })
                : onUpdate({ isTempSave: true })
            }
            disabled={isProcessing || isUpdateLoading}
          >
            임시저장
          </button>
        )}
        <button
          type="button"
          onClick={() =>
            isPosting
              ? onPost({ isTempSave: false })
              : onUpdate({ isTempSave: false })
          }
          disabled={isProcessing || isUpdateLoading}
        >
          {isUpdating ? '수정하기' : '등록하기'}
        </button>
      </section>
      {modalState && toastMessageProps && (
        <ModalPortal>
          <ToastMessageModal {...toastMessageProps} />
        </ModalPortal>
      )}
    </div>
  );
}
