import { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { QueryKeys, restFetcher } from '@/queryClient';
import { PostBoardAPI } from '@/apis/boards';
import { uploadFile } from '@/apis/uploadS3';
import { BoardDetailData } from '@/types/boardDetailType';
import { ErrorResponse } from '@/types/error';
import styles from './styles.module.scss';
import Title from '../Title';

type BoardForm = {
  title: string;
  code: string;
  category: string;
  imageUrls: string[];
  prefixCategory: string;
  fixed: boolean;
};

const FREELIST = [
  { category: 'QUESTION', name: '질문' },
  { category: 'DAILY', name: '일상' },
];
const ADVERTISEMENTLIST = [
  { category: 'INTERIOR', name: '인테리어' },
  { category: 'ESTATE', name: '토지' },
  { category: 'REAL_ESTATE', name: '부동산' },
];

// TODO: 이미지 10개 이상 등록 불가

export default function CommunityQuill({
  queryParam,
}: {
  queryParam: string | undefined;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  // TODO: location.state에 담겨지는 로직 생각, 확인 -> 수정하기 개발 시작하면
  const boardData: BoardDetailData | null = location.state;
  const queryClient = useQueryClient();
  const QuillRef = useRef<ReactQuill>();

  const [contents, setContents] = useState('');
  const [title, setTitle] = useState(boardData ? boardData.title : '');
  const [category, setCategory] = useState(boardData ? boardData.category : '');
  const prefixCategory = queryParam === 'free' ? 'DEFAULT' : 'ADVERTISEMENT';
  const categoryList = queryParam === 'free' ? FREELIST : ADVERTISEMENTLIST;

  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files !== null) {
        const file = input.files[0];
        try {
          const res = await uploadFile(file);
          const url = res || '';
          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            const quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src=${url} alt="이미지" />`,
            );
          }
        } catch (error) {
          alert((error as AxiosError<ErrorResponse>).response?.data.message);
        }
      }
    };
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link'],
          [
            {
              color: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
                'custom-color',
              ],
            },
          ],
          ['image'],
          ['clean'],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [],
  );
  const onChange = (content: string) => {
    setContents(content);
  };
  const getImageUrls = () => {
    const sources = [];
    const imgRegex = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;
    const match = imgRegex.exec(contents);
    while (match !== null) {
      sources.push(match[2]);
    }
    return sources;
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
      imageUrls: [...getImageUrls()],
      prefixCategory,
      fixed: false,
    };
    const response = await PostBoardAPI(boardForm);
    if (response?.code === 'SUCCESS') {
      alert('게시글이 작성되었습니다😄');
      queryClient.refetchQueries([QueryKeys.BOARD]);
      navigate(`/community/${queryParam}`);
    }
  };
  const onUpdate = () => {
    const boardForm: BoardForm = {
      title,
      code: contents,
      category,
      imageUrls: [...getImageUrls()],
      prefixCategory,
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

  return (
    <div className={styles.container}>
      <Title category={queryParam} boardData={boardData} />
      <div className={styles.sectionWrapper}>
        <section className={styles.labelSection}>
          <label>말머리</label>
          <label>제목</label>
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
            {categoryList.map((item) => (
              <option key={item.category} value={item.category}>
                {item.name}
              </option>
            ))}
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
      <section>
        <button
          type="button"
          onClick={() => {
            alert('기능 개발중..');
          }}
        >
          임시저장
        </button>
        {boardData ? (
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
