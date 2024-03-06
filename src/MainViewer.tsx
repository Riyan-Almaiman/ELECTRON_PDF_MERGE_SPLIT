import {  useState } from "react";
import {  PDFPages } from "./PDFService";
import { HiXCircle } from "react-icons/hi";
import ImageModal from "./ImageModal";
import { useSelection } from "./context/useSelection";



interface PDFViewerProps {
  pdfPages: PDFPages[];
}

const MainViewer = ({ pdfPages }: PDFViewerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState("");
  const { state, dispatch } = useSelection();

  const selectedPageIDs = state.selectedPages;

  const openImageModal = (image: string) => {
    setIsModalOpen(true);
    setImage(image);
  };

  const onRemovePage = (id: string) => {
    dispatch({ type: "REMOVE_PAGE", payload: id });

  }
  
  // Create a function to render selected pages based on their order in the Redux state
  const renderSelectedPages = () => {
    // Flatten the PDF and page structure while keeping track of necessary identifiers
    const allPages = pdfPages.flatMap((pdf) => 
      pdf.pages.map((page) => ({
        ...page
      }))
    );

    // Filter to only selected pages
    const selectedPages = allPages.filter(page => selectedPageIDs.includes(page.pageID));

    // Sort selected pages based on their order in the Redux state
    const orderedSelectedPages = selectedPages.sort((a, b) => 
      selectedPageIDs.indexOf(a.pageID) - selectedPageIDs.indexOf(b.pageID)
    );

    // Render sorted selected pages
    return orderedSelectedPages.map((page, index) => (
      <div
        key={page.pageID}
        className="relative group overflow-hidden bg-transparent rounded-lg border-2 border-black flex justify-center items-center"
        style={{ height: 'auto', width: '100%' }}
      >
        <div className="flex flex-col justify-center items-center">
          <img
            className="max-w-full max-h-full cursor-zoom-in"
            src={page.dataUrl}
            alt={`PDF Page ${index + 1}`}
            onClick={() => openImageModal(page.dataUrl)}
          />
          <div className="absolute bottom-0 right-0 m-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            {index + 1}
          </div>
          <div className="invisible group-hover:visible absolute top-0 right-0 m-2 rounded-full items-center justify-center cursor-pointer">
            <HiXCircle
              className="text-red-600 size-8"
              onClick={() => onRemovePage(page.pageID)}
            />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {renderSelectedPages()}
      </div>
      {isModalOpen && <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} image={image} />}
    </div>
  );
};

export default MainViewer;
