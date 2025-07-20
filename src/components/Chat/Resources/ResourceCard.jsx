"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoMdStarOutline, IoMdStar } from "react-icons/io";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useAxios } from "@/providers/AxiosProvider";

// Configure PDF.js worker for Next.js (following official react-pdf docs)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const pdfOptions = {
  cMapUrl: "/cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "/standard_fonts/",
};

export const ResourceCard = ({ workbook, onFavoritesUpdate }) => {
  const description =
    "This is a sample description for the workbook. It provides an overview of the content and purpose of the workbook. This text is longer to demonstrate the show more functionality that allows users to expand and collapse";
  const [showPdf, setShowPdf] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [goToPageInput, setGoToPageInput] = useState("");
  const [showGoToPage, setShowGoToPage] = useState(false);
  const [scale, setScale] = useState(1.0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);

  const axios = useAxios();
  const UserId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : null;

  const zoomLevels = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0];
  const currentZoomIndex = zoomLevels.indexOf(scale);

  // Check if workbook is already in favorites when component mounts
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!UserId) return;

      try {
        const response = await axios.get(`/api/workbook/favorites/`);
        console.log("Fetched favorites data:", response);
        const favorites = response.data.workbooks;

        if (favorites && Array.isArray(favorites) && favorites.length > 0) {
          const isAlreadyFavorite = favorites.some(
            (favWorkbook) => favWorkbook.id === workbook.id
          );
          setIsFavorite(isAlreadyFavorite);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
        setIsFavorite(false);
      }
    };

    checkIfFavorite();
  }, [workbook.id, UserId]);

  const handleAddToFavorites = async () => {
    if (!UserId) {
      console.error("User not logged in");
      return;
    }

    if (isAddingToFavorites) return; // Prevent multiple clicks

    setIsAddingToFavorites(true);
    try {
      if (isFavorite) {
        // Remove from favorites
        console.log(
          `Removing ${workbook.title} from favorites... with workbook id: ${workbook.id}`
        );
        const response = await axios.delete(`/api/workbook/favorites/`, {
          data: { workbook_id: workbook.id },
        });

        if (response.status === 200 || response.status === 204) {
          setIsFavorite(false);
          console.log(`Successfully removed ${workbook.title} from favorites`);
          // Notify parent component to refresh favorites
          if (onFavoritesUpdate) {
            onFavoritesUpdate();
          }
        }
      } else {
        console.log(
          `Adding ${workbook.title} to favorites... with workbook id: ${workbook.id}`
        );
        // Add to favorites
        const response = await axios.post(`/api/workbook/favorites/`, {
          workbook_id: workbook.id,
        });

        if (response.status === 200 || response.status === 201) {
          setIsFavorite(true);
          console.log(`Successfully added ${workbook.title} to favorites`);

          if (onFavoritesUpdate) {
            onFavoritesUpdate();
          }
        }
      }
    } catch (error) {
      console.error(`Error updating favorites for ${workbook.title}:`, error);

      if (error.response?.status === 400) {
        console.log("Workbook might already be in favorites");
        setIsFavorite(true);
      }
    } finally {
      setIsAddingToFavorites(false);
    }
  };

  const zoomIn = () => {
    if (currentZoomIndex < zoomLevels.length - 1) {
      setScale(zoomLevels[currentZoomIndex + 1]);
    }
  };

  const zoomOut = () => {
    if (currentZoomIndex > 0) {
      setScale(zoomLevels[currentZoomIndex - 1]);
    }
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  const truncateLength = 100;
  const shouldTruncate = description.length > truncateLength;
  const displayDescription =
    showFullDescription || !shouldTruncate
      ? description
      : `${description.substring(0, truncateLength)}...`;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  function onDocumentLoadSuccess({ numPages }) {
    console.log("PDF loaded successfully, numPages:", numPages);
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }

  function onDocumentLoadError(error) {
    console.error("Error loading PDF:", error);
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    setError(`Failed to load PDF: ${error.message || "Unknown error"}`);
    setLoading(false);
  }

  const getPdfUrl = () => {
    console.log("Fetching PDF URL:", workbook.pdf_file);
    return `http://10.10.12.53:8000${workbook.pdf_file}`;
  };

  const handleViewPdf = () => {
    console.log("Opening PDF viewer");
    setShowPdf(true);
    setLoading(true);
    setError(null);
    setPageNumber(1);
    setNumPages(null); // Reset numPages

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log("PDF loading timeout - checking state");
      setLoading((currentLoading) => {
        console.log("Current loading state in timeout:", currentLoading);
        if (currentLoading) {
          console.log("Setting timeout error");
          setError("PDF loading timeout. Please try again.");
          return false;
        }
        return currentLoading;
      });
    }, 10000);

    // Store timeout ID to clear it if component unmounts or PDF loads successfully
    return () => clearTimeout(timeoutId);
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(goToPageInput);
    if (pageNum >= 1 && pageNum <= numPages) {
      const targetElement = document.getElementById(`page_${pageNum}`);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        setGoToPageInput("");
        setShowGoToPage(false);
      }
    } else {
      alert(`Please enter a valid page number between 1 and ${numPages}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };
  return (
    <>
      {/* Simple Card */}
      <div className="bg-white rounded-lg grid gap-4 grid-cols-9 p-3 w-full  text-black">
        <div className="col-span-4 ">
          <Image
            src={workbook.banner}
            alt={workbook.title}
            width={240}
            height={340}
            className=" mr-4 w-60 h-80 rounded-sm"
          />
        </div>

        <div className=" col-span-5 flex flex-col justify-between ">
          <div className="">
            <div className="flex w-full justify-between items-start">
              <h3 className="text-[20px] text-darkText font-bold font-nunito ">
                {workbook.title}
              </h3>

              <div className="bg-white">
                {isFavorite ? (
                  <IoMdStar
                    size={28}
                    className="text-primary cursor-pointer text-2xl  mr-2  transition-colors duration-200"
                    onClick={handleAddToFavorites}
                    title="Remove from favorites"
                  />
                ) : (
                  <IoMdStarOutline
                    size={28}
                    className={`text-primary cursor-pointer text-2xl   mr-2 hover:text-blue-700 transition-colors duration-200 ${
                      isAddingToFavorites ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleAddToFavorites}
                    title="Add to favorites"
                  />
                )}
              </div>
            </div>
            <div className="pt-5 ">
              <p className="text-[#262626] text-[16px] duration-300 transition-all font-normal">
                {workbook.description}{" "}
                {workbook.description?.length > 100 && shouldTruncate && (
                  <span
                    onClick={toggleDescription}
                    className="text-primary hover:text-blue-700 text-sm font-medium cursor-pointer"
                  >
                    {showFullDescription ? "Show Less" : "Show More"}
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
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">
                {workbook.title}{" "}
                <span className=" px-1 textarea-md ml-5 rounded-l-full font-normal text-darkText/70 rounded-r-full border border-primary">
                  {workbook.category.name}
                </span>
              </h2>

              <div className="flex items-center gap-3">
                {/* Zoom Controls */}
                {numPages && (
                  <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
                    <button
                      onClick={zoomOut}
                      disabled={currentZoomIndex === 0}
                      className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Zoom Out"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium min-w-[50px] text-center">
                      {Math.round(scale * 100)}%
                    </span>
                    <button
                      onClick={zoomIn}
                      disabled={currentZoomIndex === zoomLevels.length - 1}
                      className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Zoom In"
                    >
                      +
                    </button>
                    <button
                      onClick={resetZoom}
                      className="text-xs bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
                      title="Reset Zoom"
                    >
                      Reset
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setShowPdf(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
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
                  {/* PDF Document - Continuous Scroll View */}
                  <div className="flex-1 overflow-auto bg-gray-100 p-4">
                    <div className="flex flex-col items-center space-y-4">
                      <Document
                        file={{
                          url: getPdfUrl(),
                          httpHeaders: {
                            Accept: "application/pdf",
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
                        {/* Render all pages in continuous scroll */}
                        {numPages &&
                          Array.from(new Array(numPages), (el, index) => (
                            <div
                              key={`page_${index + 1}`}
                              id={`page_${index + 1}`}
                              className="mb-4 shadow-lg"
                            >
                              <Page
                                pageNumber={index + 1}
                                width={
                                  typeof window !== "undefined"
                                    ? Math.min(800, window.innerWidth - 150) *
                                      scale
                                    : 800 * scale
                                }
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                                className="border border-gray-300"
                                loading={
                                  <div
                                    className="flex items-center justify-center p-8 bg-white border border-gray-300"
                                    style={{
                                      width: `${800 * scale}px`,
                                      height: `${1000 * scale}px`,
                                    }}
                                  >
                                    <div className="text-center">
                                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                                      <span className="ml-2 text-sm">
                                        Loading page {index + 1}...
                                      </span>
                                    </div>
                                  </div>
                                }
                              />
                              {/* Page number indicator */}
                              <div className="text-center text-sm text-gray-500 mt-2 mb-4">
                                Page {index + 1} of {numPages} | scroll to
                                navigate
                              </div>
                            </div>
                          ))}
                      </Document>
                    </div>
                  </div>

                  {/* PDF Info Bar - Simple page navigation and zoom info */}
                  {numPages && (
                    <div className="flex justify-between items-center p-3 border-t bg-gray-50">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          {numPages} {numPages === 1 ? "page" : "pages"}
                        </span>
                        <span className="text-sm text-gray-500">
                          Zoom: {Math.round(scale * 100)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Go to page:
                        </span>
                        <input
                          type="number"
                          min="1"
                          max={numPages}
                          value={goToPageInput}
                          onChange={(e) => setGoToPageInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                          placeholder="1"
                        />
                      </div>
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
