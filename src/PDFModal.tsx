import { Modal, Button } from 'flowbite-react';
import {  PDFPages } from './PDFService'; 
import PDFViewer from './PDFViewer';
import { useSelection } from './context/useSelection';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdf: PDFPages;
}

const PDFModal = ({ isOpen, onClose, pdf }: PDFModalProps) => {

  const {  dispatch } = useSelection();



  const handleSelectToggleOn = () => {
      
    pdf.pages.forEach((page)=>{

      dispatch({ type: "ADD_PAGE", payload: page.pageID });

    })


  };
  const handleSelectToggleOff = () => {
      
    pdf.pages.forEach((page)=>{

      dispatch({ type: "REMOVE_PAGE", payload: page.pageID });

    })


  };


  return (
    <Modal 
    dismissible
      show={isOpen} 
      dir='ltr'
      onClose={onClose}
      size="7xl"
      position="center">
      <Modal.Header>{pdf.fileName}</Modal.Header>
      <Modal.Body>
        <PDFViewer pdfpages={pdf} />
      </Modal.Body>
      <Modal.Footer className=' justify-center'>
        <Button color='purple'   onClick={handleSelectToggleOn}>    تحديد الكل
</Button>
<Button outline color='purple' onClick={handleSelectToggleOff}> إلغاء تحديد الكل   
</Button>
        {/* <Button className='mr-32' color="failure" onClick={onClose}>
          اغلاق
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default PDFModal;
