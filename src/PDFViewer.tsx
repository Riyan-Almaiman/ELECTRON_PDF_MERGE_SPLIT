import { PDFPages, Page } from "./PDFService";
import { useSelection } from "./context/useSelection";

interface PDFViewerProps {
  pdfpages: PDFPages;
}

const PDFViewer = ({ pdfpages }: PDFViewerProps) => {
  const { state, dispatch } = useSelection();

  const selections = state.selectedPages;



  const handleSelect = (pageid: string) => {
    if (!selections.includes(pageid)) {
      dispatch({ type: "ADD_PAGE", payload: pageid });
    } else {
      dispatch({ type: "REMOVE_PAGE", payload: pageid });
    }
  };

  return (
    <div dir={"rtl"} className="container mx-auto p-4">
      <div className="mb-2">Page 1</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {pdfpages.pages.map((page: Page, index: number) => (
          <div
            key={index}
            className={`overflow-hidden cursor-pointer ${
              selections.includes(page.pageID)
                ? "ring-4 ring-offset-2 ring-red-700"
                : " hover:ring-1 hover:ring-blue-500"
            }`}
            onClick={() => handleSelect(page.pageID)}
          >
            <img
              src={page.dataUrl}
              alt={`Page ${index + 1}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFViewer;
