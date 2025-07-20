"use client";
import Image from "next/image";
import { useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker for Next.js (following official react-pdf docs)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const pdfOptions = {
  cMapUrl: '/cmaps/',
  cMapPacked: true,
  standardFontDataUrl: '/standard_fonts/',
};

export const ResourceCard = ({ workbook }) => {
  const description = 'This is a sample description for the workbook. It provides an overview of the content and purpose of the workbook. This text is longer to demonstrate the show more functionality that allows users to expand and collapse';
  const [showPdf, setShowPdf] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncateLength = 100; 
  const shouldTruncate = description.length > truncateLength;
  const displayDescription = showFullDescription || !shouldTruncate 
    ? description 
    : `${description.substring(0, truncateLength)}...`;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  function onDocumentLoadSuccess({ numPages }) {
    console.log('PDF loaded successfully, numPages:', numPages);
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }

  function onDocumentLoadError(error) {
    console.error('Error loading PDF:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    setError(`Failed to load PDF: ${error.message || 'Unknown error'}`);
    setLoading(false);
  }

  const getPdfUrl = () => {
    console.log('Fetching PDF URL:', workbook.pdf_file);
    return `http://10.10.12.53:8000${workbook.pdf_file}`;
  };

  const handleViewPdf = () => {
    console.log('Opening PDF viewer');
    setShowPdf(true);
    setLoading(true);
    setError(null);
    setPageNumber(1);
    setNumPages(null); // Reset numPages
    
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('PDF loading timeout - checking state');
      setLoading(currentLoading => {
        console.log('Current loading state in timeout:', currentLoading);
        if (currentLoading) {
          console.log('Setting timeout error');
          setError('PDF loading timeout. Please try again.');
          return false;
        }
        return currentLoading;
      });
    }, 10000); 
    
    // Store timeout ID to clear it if component unmounts or PDF loads successfully
    return () => clearTimeout(timeoutId);
  };

  const goToPrevPage = () => {
    setPageNumber(prevPage => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPage => Math.min(prevPage + 1, numPages));
  };

  return (
    <>
      {/* Simple Card */}
      <div className="bg-white rounded-lg grid grid-cols-2 p-3  text-black">
        <div>
          <Image src={workbook.banner} alt={workbook.title} width={240} height={340} className=" w-60 h-80 rounded-sm" />
        </div>

        <div className=" flex flex-col justify-between ">
          <div>
            <h3 className="text-[20px] text-darkText line-height font-bold font-nunito">{workbook.title}</h3>
            {/* should update this with daynamic data currently using dummy data */}
            <div className="pt-5 ">
              <p className="text-[#262626] text-[16px] duration-300 transition-all font-normal">
                {displayDescription} {shouldTruncate && (
                <span
                  onClick={toggleDescription}
                  className="text-primary hover:text-blue-700 text-sm font-medium cursor-pointer"
                >
                  {showFullDescription ? 'Show Less' : 'Show More'}
                </span>
              )}
              </p>
             
            </div>
          </div>
          
          <button
            onClick={handleViewPdf}
            className="bg-primary text-white duration-500 px-4 py-2 rounded-r-full rounded-l-full hover:bg-blue-700 mr-2"
          >
            View PDF
          </button>
        </div>
        
      </div>

      {/* Simple PDF Modal */}
      {showPdf && (
        <div className="fixed inset-0 bg-[#0e1c33]/70 text-black flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">{workbook.title}</h2>
              <button
                onClick={() => setShowPdf(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* PDF Viewer - React PDF */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {loading && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading PDF...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-red-600">
                    <p className="mb-4">{error}</p>
                    <button 
                      onClick={handleViewPdf}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {!error && showPdf && (
                <>
                  {/* PDF Document */}
                  <div className="flex-1 overflow-auto bg-gray-100 p-4">
                    <div className="flex justify-center">
                      <Document
                        file={{
                          url: getPdfUrl(),
                          httpHeaders: {
                            'Accept': 'application/pdf',
                          },
                          withCredentials: false,
                        }}
                        options={pdfOptions}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading={
                          <div className="flex items-center justify-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-2">Loading document...</span>
                          </div>
                        }
                      >
                        {numPages && (
                          <Page
                            pageNumber={pageNumber}
                            width={typeof window !== 'undefined' ? Math.min(800, window.innerWidth - 100) : 800}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="shadow-lg"
                            loading={
                              <div className="flex items-center justify-center p-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                <span className="ml-2">Loading page...</span>
                              </div>
                            }
                          />
                        )}
                      </Document>
                    </div>
                  </div>

                  {/* PDF Controls - Only show when we have pages */}
                  {numPages && (
                    <div className="flex justify-between items-center p-4 border-t bg-gray-50">
                      <button
                        onClick={goToPrevPage}
                        disabled={pageNumber <= 1}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 disabled:hover:bg-gray-400"
                      >
                        ← Previous
                      </button>
                      
                      <span className="text-sm text-gray-600">
                        Page {pageNumber} of {numPages}
                      </span>
                      
                      <button
                        onClick={goToNextPage}
                        disabled={pageNumber >= numPages}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 disabled:hover:bg-gray-400"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};