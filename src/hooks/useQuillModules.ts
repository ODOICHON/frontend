import { useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { ImageResize } from 'quill-image-resize-module-ts';
import imageHandler from '@/utils/Quill/imageHandler';

Quill.register('modules/imageResize', ImageResize);

const useQuillModules = (
  QuillRef: React.MutableRefObject<ReactQuill | undefined>,
) => {
  const modules = useMemo(
    () => ({
      imageResize: {
        displayStyles: {
          backgroundColor: 'black',
          border: 'none',
          color: 'white',
        },
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
      toolbar: {
        container: [
          [{ header: [1, 2, 5, false] }],
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
        handlers: { image: () => imageHandler(QuillRef) },
      },
    }),
    [],
  );
  return modules;
};

export default useQuillModules;
