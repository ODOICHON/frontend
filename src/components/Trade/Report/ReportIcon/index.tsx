import React from 'react';
import { AiOutlineAlert } from 'react-icons/ai';

type ReportProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Report({ setModal }: ReportProps) {
  return (
    <div>
      <AiOutlineAlert
        onClick={() => {
          setModal(true);
          const bodyEl = document.querySelector('body');
          bodyEl?.classList.add('over_hidden');
        }}
      />
      <span>신고하기</span>
    </div>
  );
}

export default Report;
