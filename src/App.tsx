import {  useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { HiDownload, HiTrash, HiOutlineArrowNarrowRight } from "react-icons/hi";
import MainViewer from "./MainViewer";
import {  PDFPages } from "./PDFService";
import { Button } from "flowbite-react";
import { createPdf } from "./PDFService";
import { useSelection } from "./context/useSelection";
const NoContentPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full  text-center ">
      <HiOutlineArrowNarrowRight className="text-9xl text-purple-500 mb-8" />
      <h2 className="text-4xl font-bold">لم يتم اختيار صفحات</h2>
      <p className="mt-6 text-2xl text-black">
        يرجى اختيار صفحات من الشريط الجانبي لعرض محتوياته.
      </p>
    </div>
  );
};

function App() {
  const [uploadedPDFs, setUploadedPDFs] = useState<PDFPages[]>([]);

  const { state, dispatch } = useSelection();

  const selectedPageIDs = state.selectedPages;


  const handleCreatePdfClick = async () => {
    createPdf(selectedPageIDs);
  };

  const updateList = (pdf: PDFPages) => {
    setUploadedPDFs([...uploadedPDFs, pdf]);
  };

  const deletePDF = (pdfid: string) => {
    if (pdfid === "ALL") {
      setUploadedPDFs([]);
      dispatch({ type: "CLEAR_SELECTION" });
    } else {
      setUploadedPDFs(uploadedPDFs.filter((pdf) => pdfid !== pdf.pdfID));
      uploadedPDFs.forEach((pdf) => {
        if (pdf.pdfID !== pdfid) return;
        else {
          pdf.pages.forEach((page) => {
            selectedPageIDs.includes(page.pageID) &&
              dispatch({ type: "REMOVE_PAGE", payload: page.pageID });
          });
        }
      });
    }
  };

  const clearAllSelections = () => {
    dispatch({ type: "CLEAR_SELECTION" });
  };

  return (
    <div className="flex bg-purple-gradient w-full h-screen overflow-hidden">
      <div className="flex-shrink  h-full">
        <SidebarComponent
          onDeletePDF={deletePDF}
          onUpdatePdf={updateList}
          pdfPages={uploadedPDFs}
        />
      </div>
      <div className="flex-grow flex flex-col mt-8 mb-4 mr-4 ml-4">
        {/* <NavBar/> */}
        <div className="flex flex-col  rounded-lg bg-blue-100 shadow-lg overflow-auto flex-grow">
          <div className="m-4 flex justify-between ">
            <Button
              color="failure"
              className="bg-transparent  border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={clearAllSelections}
              disabled={selectedPageIDs.length === 0}
            >
              <HiTrash className="h-5 w-5" />
            </Button>
            <div className="   ">
            <Button
              size={"lg"}
              gradientDuoTone="purpleToBlue"
              onClick={() => handleCreatePdfClick()}
              disabled={selectedPageIDs.length === 0}
            >
              <HiDownload className="h-5 w-5" />
              انشاء PDF جديد من الصفحات
            </Button>
          </div>
          </div>

           {selectedPageIDs.length===0 ? (
            <NoContentPlaceholder />
          ) : 
          (
          <MainViewer pdfPages={uploadedPDFs} />
          )
          
          } 
        </div>
      </div>
    </div>
  );
}

export default App;
