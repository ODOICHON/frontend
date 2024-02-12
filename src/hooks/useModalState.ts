import { useState } from 'react';

const useModalState = (state = false) => {
  const [modalState, setModalState] = useState(state);

  const handleModalOpen = () => {
    setModalState(true);
  };

  const handleModalClose = () => {
    setModalState(false);
  };

  const handleModalState = () => {
    setModalState(!modalState);
  };

  return { modalState, handleModalState, handleModalOpen, handleModalClose };
};

export default useModalState;
