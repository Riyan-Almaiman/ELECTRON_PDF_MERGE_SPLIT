import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";
import { v4 as uuidv4 } from "uuid";
const src = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url)
pdfjsLib.GlobalWorkerOptions.workerSrc = src.toString()
import { ipcRenderer } from 'electron';


export type Page = {
  dataUrl: string;
  pageIndex: number;
  globalPageIndex: number | null;
  filename: string;
  pageID: string;
  pdfid: string;
};

export type PDF = {
  file: File;
  pages: Page[];
  Id: string;
};

export type PDFPages = {
  fileName: string;
  pages: Page[];
  pdfID: string;
};

let uploadedPDFs: PDF[] = [];

export const deletePDF = (id: string, all: boolean) => {
  console.log(uploadedPDFs)
  if (!all) {
    uploadedPDFs = uploadedPDFs.filter((pdf) => pdf.Id !== id);
  } else {
    uploadedPDFs = [];
  }
  console.log(uploadedPDFs)
};

export const loadPdf = async (PDFfile: File): Promise<PDFPages> => {
  const arrayBuffer = await PDFfile.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  const pages: Page[] = [];
  const pdfID = uuidv4()

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const canvasContext = canvas.getContext("2d");
    if (canvasContext) {
      await page.render({ canvasContext, viewport }).promise;
      pages.push({
        dataUrl: canvas.toDataURL(),
        pageIndex: pageNum - 1,
        globalPageIndex: null,
        filename: PDFfile.name,
        pageID: uuidv4(),
        pdfid: pdfID
      });
    } else {
      throw new Error("Could not get canvas context");
    }
  }

  uploadedPDFs.push({ file: PDFfile, pages: pages, Id: pdfID});

  return { fileName: PDFfile.name, pages: pages, pdfID: pdfID };
};

export const createPdf = async (selectedPageIDs: string[]): Promise<void> => {

  console.log("creatingpdf"+uploadedPDFs.length)
  console.log(selectedPageIDs)
  const newPdfDoc = await PDFDocument.create();

  const pagesToCopy = [];

  for (const uploadedPdf of uploadedPDFs) {
    if (uploadedPdf.file) {
      const arrayBuffer = await uploadedPdf.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      for (const page of uploadedPdf.pages) {
        if (selectedPageIDs.includes(page.pageID)) {
          pagesToCopy.push({ pdfDoc, page, pageIndex: page.pageIndex });
        }
      }
    }
  }

  // Sort pagesToCopy based on the order of pageIDs in selectedPageIDs
  pagesToCopy.sort((a, b) => {
    const indexA = selectedPageIDs.indexOf(a.page.pageID);
    const indexB = selectedPageIDs.indexOf(b.page.pageID);
    return indexA - indexB;
  });

  // Copy and add sorted pages to the new PDF document
  for (const { pdfDoc, pageIndex } of pagesToCopy) {
    const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageIndex]);
    newPdfDoc.addPage(copiedPage);
  }

  // Save the new PDF and trigger the download
  const pdfBytes = await newPdfDoc.save();
  ipcRenderer.send('save-pdf', pdfBytes);

  // const blob = new Blob([pdfBytes], { type: "application/pdf" });
  // const url = URL.createObjectURL(blob);
  // const a = document.createElement("a");
  // a.href = url;
  // a.download = "selected-pages.pdf";
  // document.body.appendChild(a);
  // a.click();
  // document.body.removeChild(a);
  // URL.revokeObjectURL(url);
};
