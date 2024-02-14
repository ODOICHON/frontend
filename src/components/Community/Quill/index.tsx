import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ModalPortal from '@/components/Common/ModalPortal';
import ToastMessageModal from '@/components/Common/ToastMessageModal';
import { QueryKeys, restFetcher } from '@/queryClient';
import { BoardFormType } from '@/types/Board/boardType';
import { CommunityBoardDetailType } from '@/types/Board/communityType';
import getImageUrls from '@/utils/Quill/getImageUrls';
import { PostBoardAPI } from '@/apis/boards';
import useModalState from '@/hooks/useModalState';
import useQuillModules from '@/hooks/useQuillModules';
import useToastMessageType from '@/hooks/useToastMessageType';
import { checkBeforePost } from '@/utils/utils';
import { freeCategory, advertiseCategory } from '@/constants/category';
import styles from './styles.module.scss';
import Title from '../Title';

type CommunityQuillProps = {
  queryParam: string | undefined;
};

// TODO: 이미지 10개 이상 등록 불가

export default function CommunityQuill({ queryParam }: CommunityQuillProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const boardData: CommunityBoardDetailType | null = location.state;
  const { modalState, handleModalOpen, handleModalClose } = useModalState();
  const { toastMessageProps, handleToastMessageProps } = useToastMessageType();

  const QuillRef = useRef<ReactQuill>();

  const [title, setTitle] = useState(boardData ? boardData.title : '');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState(boardData ? boardData.category : '');
  const [isProcessing, setIsProcessing] = useState(false);

  const prefixCategory =
    queryParam === 'free_board' ? 'DEFAULT' : 'ADVERTISEMENT';
  const categoryList =
    queryParam === 'free_board' ? freeCategory : advertiseCategory;

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
          navigate(`/community/${queryParam}/${boardData?.boardId}`);
        });
        queryClient.refetchQueries([
          QueryKeys.COMMUNITY_BOARD,
          `${boardData?.boardId}`,
        ]);
        queryClient.refetchQueries([QueryKeys.COMMUNITY_BOARD]);
        handleModalOpen();
      },
      onError: () => {
        handleToastMessageProps('POST_UPDATE_ERROR', handleModalClose);
        handleModalOpen();
      },
    },
  );

  // 이미지를 업로드 하기 위한 함수
  const modules = useQuillModules(QuillRef);
  const onChange = (content: string) => {
    setContents(content);
  };

  const onPost = async () => {
    setIsProcessing(true);
    const imageUrls = [...getImageUrls(contents)];
    if (!checkBeforePost(title, contents, category)) return;

    const BoardForm: BoardFormType = {
      title,
      code: contents,
      category,
      imageUrls,
      prefixCategory,
      fixed: false,
    };
    try {
      const response = await PostBoardAPI(BoardForm);
      if (response?.code === 'SUCCESS') {
        handleToastMessageProps('POST_CREATE_SUCCESS', () => {
          handleModalClose();
          navigate(`/community/${queryParam}`);
        });
        queryClient.refetchQueries([QueryKeys.COMMUNITY_BOARD]);
        handleModalOpen();
      } else {
        throw new Error(response?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const onUpdate = () => {
    const BoardForm: BoardFormType = {
      title,
      code: contents,
      category,
      imageUrls: [...getImageUrls(contents)],
      prefixCategory,
      fixed: false,
    };
    mutate(BoardForm);
  };

  useEffect(() => {
    // 개발모드에선 StricMode 때문에 같은글이 두번 넣어짐. StrictMode를 해제하고 테스트하자
    if (boardData) {
      QuillRef.current
        ?.getEditor()
        .clipboard.dangerouslyPasteHTML(0, boardData.code);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Title category={queryParam} boardData={boardData} />
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
            {categoryList
              .filter((cat) => cat.name !== 'ALL')
              .map((item) => (
                <option key={item.name} value={item.name}>
                  {item.code}
                </option>
              ))}
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
      <section>
        {boardData ? (
          <button type="button" onClick={onUpdate} disabled={isUpdateLoading}>
            수정하기
          </button>
        ) : (
          <button type="button" onClick={onPost} disabled={isProcessing}>
            등록하기
          </button>
        )}
      </section>
      {modalState && toastMessageProps && (
        <ModalPortal>
          <ToastMessageModal {...toastMessageProps} />
        </ModalPortal>
      )}
    </div>
  );
}
