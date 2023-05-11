import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { QueryKeys, restFetcher } from '@/queryClient';
import getImageUrls from '@/utils/Quill/getImageUrls';
import { PostBoardAPI } from '@/apis/boards';
import { uploadFile } from '@/apis/uploadS3';
import userStore from '@/store/userStore';
import useQuillModules from '@/hooks/useQuillModules';
import { BoardDetailData } from '@/types/boardDetailType';
import { BoardForm } from '@/types/boardType';
import styles from './styles.module.scss';

// TODO: 이미지 10개 이상 등록 불가

export default function AdminWritePage() {
  const { user } = userStore();
  const navigate = useNavigate();
  const location = useLocation();
  const boardData: BoardDetailData | null = location.state;
  const queryClient = useQueryClient();
  const QuillRef = useRef<ReactQuill>();
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const [thumbnail, setThumbnail] = useState(
    boardData ? boardData.imageUrls[0] : '',
  );
  const [thumbnailTitle, setThumbnailTitle] = useState(
    boardData ? boardData.imageUrls[0].split('/')[3] : '',
  );
  const [contents, setContents] = useState('');
  const [title, setTitle] = useState(boardData ? boardData.title : '');
  const [category, setCategory] = useState(boardData ? boardData.category : '');
  const thumbnailHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0];
      setThumbnailTitle(e.currentTarget.files[0].name);
      try {
        const res = await uploadFile(file);
        const url = res || '';
        setThumbnail(url);
      } catch (error) {
        const err = error as AxiosError;
        return { ...err.response, success: false };
      }
    }
  };

  // 이미지를 업로드 하기 위한 함수

  const modules = useQuillModules(QuillRef);
  const onChange = (content: string) => {
    setContents(content);
  };
  const { mutate } = useMutation(
    (boardForm: BoardForm) =>
      restFetcher({
        method: 'PUT',
        path: `boards/${boardData?.boardId}`,
        body: {
          ...boardForm,
        },
      }),
    {
      onSuccess: () => {
        alert('게시글을 수정하였습니다.');
        queryClient.refetchQueries([
          QueryKeys.INTRO_BOARD,
          `${boardData?.boardId}`,
        ]);
        queryClient.refetchQueries([QueryKeys.BOARD]);
        navigate(`/intro_board/${boardData?.boardId}`);
      },
      onError: () => {
        alert('게시글 수정을 실패했습니다.');
      },
    },
  );
  const onPost = async () => {
    const boardForm: BoardForm = {
      title,
      code: contents,
      category,
      imageUrls: [thumbnail, ...getImageUrls(contents)],
      prefixCategory: 'INTRO',
      fixed: false,
    };
    const response = await PostBoardAPI(boardForm);
    if (response?.code === 'SUCCESS') {
      alert('게시글이 작성되었습니다.');
      queryClient.refetchQueries([QueryKeys.BOARD]);
      navigate('/introduce');
    }
  };
  const onUpdate = () => {
    const boardForm: BoardForm = {
      title,
      code: contents,
      category,
      imageUrls: [thumbnail, ...getImageUrls(contents)],
      prefixCategory: 'INTRO',
      fixed: false,
    };
    mutate(boardForm);
  };
  useEffect(() => {
    // 개발모드에선 StricMode 때문에 같은글이 두번 넣어짐. StrictMode를 해제하고 테스트하자
    if (boardData) {
      QuillRef.current
        ?.getEditor()
        .clipboard.dangerouslyPasteHTML(0, boardData.code);
    }
  }, []);
  if (user?.authority !== 'ADMIN') {
    alert('권한이 없습니다');
    return <Navigate to="/introduce" />;
  }
  return (
    <div className={styles.container}>
      <h1>{boardData ? '관리자 글 수정하기' : '관리자 글쓰기'}</h1>
      <div className={styles.sectionWrapper}>
        <section className={styles.labelSection}>
          <label>말머리</label>
          <label>제목</label>
          <label>썸네일</label>
          <label>내용</label>
        </section>
        <section className={styles.contentSection}>
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
          <input
            className={styles.titleInput}
            type="text"
            value={title}
            placeholder="50자 이내로 제목을 입력해 주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
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
        </section>
      </div>
      {boardData ? (
        <button type="button" onClick={onUpdate}>
          수정하기
        </button>
      ) : (
        <button type="button" onClick={onPost}>
          등록하기
        </button>
      )}
    </div>
  );
}