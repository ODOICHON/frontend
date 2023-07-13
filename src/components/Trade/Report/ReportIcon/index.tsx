import React from 'react';
import { AiOutlineAlert } from 'react-icons/ai';

type ReportProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Report({ setModal }: ReportProps) {
  return (
    <div>
      <AiOutlineAlert
        style={{
          cursor: 'pointer',
        }}
        onClick={() => {
          setModal(true);
          // TODO: 스크롤 고정 할 것인가?
          // document.body.style.overflow = 'hidden';
        }}
      />
      <span>신고하기</span>
    </div>
  );
}

export default Report;
