import ReactQuill from 'react-quill';
import { AxiosError } from 'axios';
import { uploadFile } from '@/apis/uploadS3';
import { ErrorResponse } from '@/types/error';

const imageHandler = (
  QuillRef: React.MutableRefObject<ReactQuill | undefined>,
) => {
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

export default imageHandler;
