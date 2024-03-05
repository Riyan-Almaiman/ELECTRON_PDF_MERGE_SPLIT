import { Modal } from 'flowbite-react';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
}

const PDFModal = ({ isOpen, onClose, image }: PDFModalProps) => {


  return (
    <Modal 
      theme={{root:{show:{on:"flex bg-transparent  "}}}}
      dismissible
      show={isOpen} 
      dir='ltr'
      onClose={onClose}
      size="3xl"
      position="center">
      <Modal.Body>
        <img src={image}></img>
      </Modal.Body>
    
    </Modal>
  );
};

export default PDFModal;
