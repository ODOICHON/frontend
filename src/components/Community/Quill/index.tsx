import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import getImageUrls from '@/utils/Quill/getImageUrls';
import { PostBoardAPI } from '@/apis/boards';
import useQuillModules from '@/hooks/useQuillModules';
import { checkBeforePost } from '@/utils/utils';
import { BoardDetailData } from '@/types/boardDetailType';
import { BoardForm } from '@/types/boardType';
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
  const boardData: BoardDetailData | null = location.state;

  const QuillRef = useRef<ReactQuill>();

  const [title, setTitle] = useState(boardData ? boardData.title : '');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState(boardData ? boardData.category : '');
  const prefixCategory =
    queryParam === 'free_board' ? 'DEFAULT' : 'ADVERTISEMENT';
  const categoryList =
    queryParam === 'free_board' ? freeCategory : advertiseCategory;

  const queryClient = useQueryClient();

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
          QueryKeys.COMMUNITY_BOARD,
          `${boardData?.boardId}`,
        ]);
        queryClient.refetchQueries([QueryKeys.COMMUNITY_BOARD]);
        navigate(`/community/${queryParam}/${boardData?.boardId}`);
      },
      onError: () => {
        alert('게시글 수정을 실패했습니다.');
      },
    },
  );

  // 이미지를 업로드 하기 위한 함수
  const modules = useQuillModules(QuillRef);
  const onChange = (content: string) => {
    setContents(content);
  };

  const onPost = async () => {
    const imageUrls = [...getImageUrls(contents)];
    if (!checkBeforePost(title, contents, category)) return;

    const boardForm: BoardForm = {
      title,
      code: contents,
      category,
      imageUrls,
      prefixCategory,
      fixed: false,
    };
    const response = await PostBoardAPI(boardForm);
    if (response?.code === 'SUCCESS') {
      alert('게시글이 작성되었습니다😄');
      queryClient.refetchQueries([QueryKeys.COMMUNITY_BOARD]);
      navigate(`/community/${queryParam}`);
    }
  };

  const onUpdate = () => {
    const boardForm: BoardForm = {
      title,
      code: contents,
      category,
      imageUrls: [...getImageUrls(contents)],
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
            {categoryList
              .filter((cat) => cat.name !== 'ALL')
              .map((item) => (
                <option key={item.name} value={item.name}>
                  {item.code}
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
