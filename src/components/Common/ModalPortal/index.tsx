import { createPortal } from 'react-dom';

type ModalPortalProps = {
  children: React.ReactNode;
};

function ModalPortal({ children }: ModalPortalProps) {
  const node = document.getElementById('portal') as Element;
  return createPortal(children, node);
}

export default ModalPortal;
