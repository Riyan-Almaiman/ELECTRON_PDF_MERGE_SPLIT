import React, { useState, useRef } from "react";
import { Button, Sidebar, Spinner } from "flowbite-react";
import { HiTrash, HiOutlineUpload } from "react-icons/hi";
import PDFModal from "./PDFModal";
import { deletePDF, loadPdf, PDFPages } from "./PDFService";
import { useSelection } from "./context/useSelection";

interface props {
  onUpdatePdf: (updatedPdf: PDFPages) => void;
  onDeletePDF: (updatedPdf: string) => void;
  pdfPages: PDFPages[];
}
function SidebarComponent({ onUpdatePdf, onDeletePDF, pdfPages }: props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<PDFPages | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { dispatch } = useSelection();

  const handleClearPDFs = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    dispatch({ type: "CLEAR_SELECTION" });
    deletePDF("", true);
    onDeletePDF("ALL");
  };
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const newPDF = await loadPdf(file);

      onUpdatePdf(newPDF);
    }
    setIsLoading(false);
  };

  const handleDeletePDF = (
    pdfToDelete: string,
    event: React.MouseEvent<SVGSVGElement>
  ) => {
    event.stopPropagation();
    deletePDF(pdfToDelete, false);
    onDeletePDF(pdfToDelete);
    console.log(pdfToDelete);
  };

  const separatorStyle: React.CSSProperties = {
    height: "2px",
    backgroundColor: "white",
    margin: "1rem 0",
  };
  const handlePDFSelect = (pdf: PDFPages) => {
    setSelectedPDF(pdf);
    setIsModalOpen(true);
  };

  return (
    <Sidebar
      theme={{
        root: {
          base: "h-full  flex-shrink ",

          inner: "h-full  rounded border-l py-4 px-3 ",
        },
      }}
    >
      <img hidden src="etsLogoWhite.png"></img>

      <div className="flex flex-col flex-shrink">
        <Sidebar.Items>
          <Sidebar.ItemGroup theme={{ base: "" }}>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={handleFileUpload}
              accept="application/pdf"
            />
            <Sidebar.Item
             
              theme={{
                base: "cursor-pointer hover:bg-purple-400 flex items-center justify-center rounded-lg p-6 mt-0 mb-2 text-base font-normal text-gray-900 bg-purple-500",
                content: "justify-center hover:text-slate-800",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <div
                className="flex items-center justify-center"
                style={{ width: "5rem", height: "5rem" }}
              >
                {isLoading ? (
                  <Spinner size={"xl"} color={"purple"} />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <HiOutlineUpload
                      style={{ fontSize: "5rem", color: "white" }}
                    />
                    <span className="text-white font-semibold arabic">
                      ارفع PDF
                    </span>
                  </div>
                )}
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <div className="w-full" style={separatorStyle}>
            {" "}
          </div>

          <Sidebar.ItemGroup
            theme={{ base: "mt-4 space-y-2  pt-4 first:mt-0  first:pt-0 " }}
          >
            {pdfPages.map((pdf, index) => (
              <Sidebar.Item
                key={index}
                theme={{
                  content: { base: "px-3 flex-1 break-all	" },
                  base: "flex cursor-pointer w-full h-full	rounded-lg py-2 text-l font-bold text-white  border  hover:bg-purple-600",
                }}
                onClick={() => handlePDFSelect(pdf)}
              >
                <div className="flex items-center ">
                  <HiTrash
                    onClick={(
                      event: React.MouseEvent<SVGSVGElement, MouseEvent>
                    ) => handleDeletePDF(pdf.pdfID, event)}
                    size={25}
                    className="ml-4 flex-shrink-0 hover:text-red-600 rounded "
                  />
                  <div className="flex-grow">
                    {pdf.fileName.trim() || `Document ${index + 1}`}
                  </div>
                </div>
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </div>

      {selectedPDF && (
        <PDFModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          pdf={selectedPDF}
        />
      )}
      <div className=" fixed mr-8 bottom-0 p-2">
        <Button
          color="failure"
          className="bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          disabled={pdfPages.length === 0 ? true : false}
          onClick={handleClearPDFs}
        >
          ازاله جميع الملفات{" "}
        </Button>
      </div>
    </Sidebar>
  );
}

export default SidebarComponent;
