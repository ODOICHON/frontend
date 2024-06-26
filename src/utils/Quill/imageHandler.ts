import ReactQuill from 'react-quill';
import { AxiosError } from 'axios';
import { uploadFile } from '@/apis/uploadS3';
import { ApiResponseType } from '@/types/apiResponseType';
// import { DEFAULT_OPTIONS } from '@/constants/image';

// const { VITE_CLOUD_FRONT_DOMAIN } = import.meta.env;
const { VITE_S3_DOMAIN } = import.meta.env;

const imageHandler = (
  QuillRef: React.MutableRefObject<ReactQuill | undefined>,
  setImages: (imageUrl: string) => void,
) => {
  // const { setImages } = imageStore();
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
        const imageName = url.split(VITE_S3_DOMAIN)[1];
        // const imageUrl = VITE_CLOUD_FRONT_DOMAIN + imageName + DEFAULT_OPTIONS;
        const imageUrl = VITE_S3_DOMAIN + imageName;

        setImages(imageUrl);

        const range = QuillRef.current?.getEditor().getSelection()?.index;
        if (range !== null && range !== undefined) {
          const quill = QuillRef.current?.getEditor();
          quill?.insertEmbed(range, 'image', imageUrl);
          quill?.insertText(range + 1, '\n');
          quill?.setSelection({ index: range + 2, length: 0 });
        }
      } catch (error) {
        alert((error as AxiosError<ApiResponseType>).response?.data.message);
      }
    }
  };
};

export default imageHandler;
