import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import ModalPortal from '@/components/Common/ModalPortal';
import ToastMessageModal from '@/components/Common/ToastMessageModal';
import { QueryKeys, restFetcher } from '@/queryClient';
import { BoardFormType } from '@/types/Board/boardType';
import { IntroBoardDetailType } from '@/types/Board/introType';
import getImageUrls from '@/utils/Quill/getImageUrls';
import getNotUsedImageUrl from '@/utils/Quill/getNotUsedImageUrl';
import { PostBoardAPI } from '@/apis/boards';
import { deleteFile, uploadFile } from '@/apis/uploadS3';
import { imageStore } from '@/store/imageStore';
import useModalState from '@/hooks/useModalState';
import useQuillModules from '@/hooks/useQuillModules';
import useToastMessageType from '@/hooks/useToastMessageType';
import { checkBeforePost } from '@/utils/utils';
// import { DEFAULT_OPTIONS } from '@/constants/image';
import styles from './styles.module.scss';

// TODO: 이미지 10개 이상 등록 불가

// const { VITE_CLOUD_FRONT_DOMAIN } = import.meta.env;
const { VITE_S3_DOMAIN } = import.meta.env;

export default function IntroduceQuill() {
  const { images, setImages, resetImages } = imageStore();
  const navigate = useNavigate();
  const location = useLocation();
  const boardData: IntroBoardDetailType | null = location.state;
  const { modalState, handleModalOpen, handleModalClose } = useModalState();
  const { toastMessageProps, handleToastMessageProps } = useToastMessageType();

  const [title, setTitle] = useState(boardData ? boardData.title : '');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState(boardData ? boardData.category : '');
  const [thumbnail, setThumbnail] = useState(
    boardData ? boardData.imageUrls[0] : '',
  );
  const [thumbnailTitle, setThumbnailTitle] = useState(
    boardData ? boardData.imageUrls[0].split('/')[3] : '',
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const QuillRef = useRef<ReactQuill>();
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef(images);
  const isProcessingRef = useRef(isProcessing);

  const queryClient = useQueryClient();

  const { mutate, isLoading: isUpdateLoading } = useMutation(
    (BoardForm: BoardFormType) =>
      restFetcher({
        method: 'PUT',
        path: `boards/${boardData?.boardId}`,
        body: {
          ...BoardForm,
        },
      }),
    {
      onSuccess: () => {
        handleToastMessageProps('POST_UPDATE_SUCCESS', () => {
          handleModalClose();
          navigate(`/intro_board/${boardData?.boardId}`);
        });
        queryClient.refetchQueries([
          QueryKeys.INTRO_BOARD,
          `${boardData?.boardId}`,
        ]);
        queryClient.refetchQueries([QueryKeys.INTRO_BOARD]);
        handleModalOpen();
      },
      onError: () => {
        handleToastMessageProps('POST_UPDATE_ERROR', handleModalClose);
      },
    },
  );

  const thumbnailHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0];
      setThumbnailTitle(e.currentTarget.files[0].name);
      try {
        const res = await uploadFile(file);
        const url = res || '';
        const imageName = url.split(VITE_S3_DOMAIN)[1];
        // const imageUrl = VITE_CLOUD_FRONT_DOMAIN + imageName + DEFAULT_OPTIONS;
        const imageUrl = VITE_S3_DOMAIN + imageName;
        setThumbnail(imageUrl);
        setImages(thumbnail);
      } catch (error) {
        const err = error as AxiosError;
        return { ...err.response, success: false };
      }
    }
  };

  // 이미지를 업로드 하기 위한 함수
  const modules = useQuillModules(QuillRef, setImages);
  const onChange = (content: string) => {
    setContents(content);
  };

  const onPost = async () => {
    setIsProcessing(true);
    const imageUrls = [thumbnail, ...getImageUrls(contents)];
    if (!checkBeforePost(title, contents, thumbnail)) {
      setIsProcessing(false);
      return;
    }

    const notUsedImageUrls = getNotUsedImageUrl(images, imageUrls);

    const BoardForm: BoardFormType = {
      title,
      code: contents,
      category,
      imageUrls,
      prefixCategory: 'INTRO',
      fixed: false,
    };
    try {
      const response = await PostBoardAPI(BoardForm);
      if (response?.code === 'SUCCESS') {
        deleteFile(notUsedImageUrls);
        resetImages();
        handleToastMessageProps('POST_CREATE_SUCCESS', () => {
          handleModalClose();
          navigate(`/introduce`);
        });
        queryClient.refetchQueries([QueryKeys.INTRO_BOARD]);
        handleModalOpen();
      } else {
        throw new Error(response?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = () => {
    setIsProcessing(true);
    const imageUrls = [thumbnail, ...getImageUrls(contents)];

    if (!checkBeforePost(title, contents, thumbnail)) {
      setIsProcessing(false);
      return;
    }

    const notUsedImageUrls = getNotUsedImageUrl(images, imageUrls);

    const BoardForm: BoardFormType = {
      title,
      code: contents,
      category,
      imageUrls,
      prefixCategory: 'INTRO',
      fixed: false,
    };
    try {
      mutate(BoardForm);
      deleteFile(notUsedImageUrls);
      resetImages();
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    imagesRef.current = images;
    isProcessingRef.current = isProcessing;
  }, [images, isProcessing]);

  useEffect(() => {
    // 개발모드에선 StricMode 때문에 같은글이 두번 넣어짐. StrictMode를 해제하고 테스트하자
    if (boardData) {
      QuillRef.current
        ?.getEditor()
        .clipboard.dangerouslyPasteHTML(0, boardData.code);
    }
    return () => {
      if (!isProcessingRef.current) {
        deleteFile(imagesRef.current);
        resetImages();
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1>{boardData ? '관리자 글 수정하기' : '관리자 글쓰기'}</h1>
      <section className={styles.sectionWrapper}>
        <span className={styles.inputWrapper}>
          <label>말머리</label>
          <select
            className={styles.categoryInput}
            name="category"
            value={category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCategory(e.target.value)
            }
          >
            <option disabled value="">
              말머리를 선택하세요.
            </option>
            <option value="TREND">트렌드</option>
            <option value="REVIEW">후기</option>
          </select>
        </span>
        <span className={styles.inputWrapper}>
          <label>제목</label>
          <input
            className={styles.titleInput}
            type="text"
            value={title}
            placeholder="50자 이내로 제목을 입력해 주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </span>
        <span className={styles.inputWrapper}>
          <label>썸네일</label>
          <div className={styles.thumbnailWrapper}>
            <input
              type="text"
              value={thumbnailTitle}
              placeholder="사진을 첨부해주세요. "
              readOnly
            />
            <input
              ref={thumbnailRef}
              style={{ display: 'none' }}
              type="file"
              onChange={thumbnailHandler}
            />
            <button type="button" onClick={() => thumbnailRef.current?.click()}>
              업로드
            </button>
          </div>
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
            onChange={onChange}
            modules={modules}
          />
        </span>
      </section>
      {boardData ? (
        <button type="button" onClick={onUpdate} disabled={isUpdateLoading}>
          수정하기
        </button>
      ) : (
        <button type="button" onClick={onPost} disabled={isProcessing}>
          등록하기
        </button>
      )}
      {modalState && toastMessageProps && (
        <ModalPortal>
          <ToastMessageModal {...toastMessageProps} />
        </ModalPortal>
      )}
    </div>
  );
}
