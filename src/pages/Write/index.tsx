import { uploadFile } from '@/apis/uploadS3';
import { AxiosError } from 'axios';
import { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dompurify from 'dompurify';
import styles from './styles.module.scss';
import { PostBoardAPI } from '@/apis/boards';
import { useNavigate } from 'react-router-dom';

export default function WritePage() {
  const navigate = useNavigate();
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState('');
  const [title, setTitle] = useState('');
  const [prefix, setPrefix] = useState('');
  const [category, setCategory] = useState('');

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
          const url = res?.location || '';
          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src=${url} alt="이미지" />`,
            );
          }

          return { ...res, success: true };
        } catch (error) {
          const err = error as AxiosError;
          return { ...err.response, success: false };
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
    console.log(content);
  };
  const getImageUrls = () => {
    const sources = [];
    const imgRegex = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;
    let match;
    while ((match = imgRegex.exec(contents)) !== null) {
      sources.push(match[2]);
    }
    return sources;
  };
  const onPost = async () => {
    const boardForm = {
      title,
      code: contents,
      category,
      imageUrls: getImageUrls(),
      prefixCategory: prefix,
      fixed: false,
    };
    const response = await PostBoardAPI(boardForm);
    if (response?.code === 'SUCCESS') {
      alert('게시글이 작성되었습니다.');
      navigate('/introduce');
    }
  };
  return (
    <div>
      <div>
        <label htmlFor="title">타이틀</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </div>
      <div>
        <label htmlFor="prefix">카테고리</label>
        <select
          name="prefix"
          id="prefix"
          value={prefix}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPrefix(e.target.value)
          }
        >
          <option value="DEFAULT">자유</option>
          <option value="ADVERTISEMENT">홍보</option>
          <option value="INTRO">소개</option>
        </select>
      </div>
      <div>
        <label htmlFor="category">말머리</label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCategory(e.target.value)
          }
        >
          <option value="REVIEW">후기</option>
          <option value="TREND">트렌드</option>
        </select>
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
      <div
        className={styles.textEditor}
        dangerouslySetInnerHTML={{ __html: Dompurify.sanitize(contents) }}
      />
      <button onClick={onPost}>게시글 작성하기</button>
    </div>
  );
}
