"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { priceRefExport } from "@/components/HomePage/RattingSection/Ratting";
import { IoIosArrowForward } from "react-icons/io";
import { LuMessageCircleMore } from "react-icons/lu";
import { LuHistory } from "react-icons/lu";
import { BiTargetLock } from "react-icons/bi";
import { FaHeadphones } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { TbArrowBigUpLine } from "react-icons/tb";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { IoMdShare } from "react-icons/io";

const DesktopNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const pathname = usePathname();

  const toggleNav = () => {
    setIsCollapsed(!isCollapsed);
  };
  const onSearchSubmit = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
  };
  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleModalClick = (event, modalId) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const navRect = document.querySelector('.nav-container').getBoundingClientRect();
    
    // Calculate position relative to the nav container
    let x = rect.right - navRect.left + 10; // 10px gap from the button
    let y = rect.top - navRect.top;
    
    // Check if modal would go off-screen horizontally
    const modalWidth = 208; // 52 * 4 = 208px (w-52)
    const screenWidth = window.innerWidth;
    
    if (x + modalWidth > screenWidth) {
      x = rect.left - navRect.left - modalWidth - 10; // Position to the left of the button
    }
    
    // Check if modal would go off-screen vertically
    const modalHeight = 100; // Approximate height
    const screenHeight = window.innerHeight;
    
    if (y + modalHeight > screenHeight) {
      y = screenHeight - modalHeight - 20; // Position near bottom with some padding
    }
    
    setModalPosition({ x, y });
    document.getElementById(modalId).showModal();
  };

  useEffect(() => {
    const mainContent = document.querySelector(".main-content");
    if (mainContent) {
      mainContent.style.marginLeft = isCollapsed ? "64px" : "250px";
    }
  }, [isCollapsed]);

  return (
    <div>

      <div
        className={`hidden lg:block fixed  left-0 top-0 h-full text-white transition-all duration-300 z-50 nav-container font-nunito ${
          isCollapsed ? "w-16" : "w-[250px]"
        }`}
        style={{
          background: "linear-gradient(to top, #000627, #0129F4)",
        }}
      >
        <div className="px-4 py-4">
          {!isCollapsed ? (
            <div className=" flex justify-between items-center">
              <h1 className="text-xl font-lemon" >
                Emothrive Therapy
              </h1>
              <button
                onClick={toggleNav}
                className={`p-2 rounded-md group hover:bg-white hover:text-[#0056F6] transition-all`}
              >
                <IoIosArrowForward className="duration-300 group-hover:rotate-180" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={toggleNav}
                className="w-10 h-10 flex items-center justify-center rounded-md text-xl bg-white text-[#0056F6] transition-colors font-bold"
              >
                E
              </button>
            </div>
          )}
        </div>
        {/* Navigation Content */}
        <div className={`${isCollapsed ? "px-2" : "px-5"} py-2`}>
          <nav id="mainNav" className="space-y-2 flex flex-col gap-3">
            <Link
              href={"/chat"}
              className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} hover:bg-white hover:text-[#0056F6] px-2.5 py-3 rounded-sm font-semibold ${
                pathname === "/chat" ? "bg-white text-[#0056F6]" : ""
              }`}
            >
              <LuMessageCircleMore size={24} className="w-6 flex-shrink-0" />
              {!isCollapsed && <h1>Start New Session</h1>}
            </Link>
            <Link
              href={"/search"}
              className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} hover:bg-white hover:text-[#0056F6] px-2.5 py-3 rounded-sm font-semibold ${
                pathname === "/search" ? "bg-white text-[#0056F6]" : ""
              }`}
            >
              <LuHistory size={24} className="w-6 flex-shrink-0" />
              {!isCollapsed && <h1>Search History</h1>}
            </Link>
            <Link
              href={"/"}
              className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} hover:bg-white hover:text-[#0056F6] px-2.5 py-3 rounded-sm font-semibold ${
                pathname === "/" ? "bg-white text-[#0056F6]" : ""
              }`}
            >
              <BiTargetLock size={24} className="w-6 flex-shrink-0" />
              {!isCollapsed && <h1>Mode Tracker</h1>}
            </Link>
            <Link
              href={"/"}
              className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} hover:bg-white hover:text-[#0056F6] px-2.5 py-3 rounded-sm font-semibold group ${
                pathname === "/" ? "bg-white text-[#0056F6]" : ""
              }`}
            >
              <ReminderIcon
                size={24}
                className={`w-6 flex-shrink-0 ${
                  pathname === "/"
                    ? "fill-[#0056F6]"
                    : "fill-white group-hover:fill-[#0056F6]"
                }`}
              />
              {!isCollapsed && <h1>Reminders</h1>}
            </Link>
            <Link
              href={"/"}
              className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} hover:bg-white hover:text-[#0056F6] px-2.5 py-3 rounded-sm font-semibold group ${
                pathname === "/" ? "bg-white text-[#0056F6]" : ""
              }`}
            >
              <TaskIcon
                size={24}
                className={`w-6 flex-shrink-0 ${
                  pathname === "/"
                    ? "fill-[#0056F6]"
                    : "fill-white group-hover:fill-[#0056F6]"
                }`}
              />
              {!isCollapsed && <h1>Task</h1>}
            </Link>
            <Link
              href={"/chat/music"}
              className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} hover:bg-white hover:text-[#0056F6] px-2.5 py-3 rounded-sm font-semibold ${
                pathname === "/chat/music" ? "bg-white text-[#0056F6]" : ""
              }`}
            >
              <FaHeadphones size={24} className="w-6 flex-shrink-0" />
              {!isCollapsed && <h1>Music</h1>}
            </Link>
            <Link
              href={"/chat/resources"}
              className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} hover:bg-white hover:text-[#0056F6] px-2.5 py-3 rounded-sm font-semibold ${
                pathname === "/chat/resources" ? "bg-white text-[#0056F6]" : ""
              }`}
            >
              <IoBookOutline size={24} className="w-6 flex-shrink-0" />
              {!isCollapsed && <h1>Resources</h1>}
            </Link>
          </nav>
          <nav id="searchNav" className={`${!isCollapsed ? "pt-10" : " hidden"} pb-32 max-h-[400px] overflow-y-auto`}>
            <h1 className=" text-[16px] font-semibold px-3 ">Chats History</h1>
            <form
              onSubmit={onSearchSubmit}
              className="rounded-sm mt-2 flex items-center overflow-hidden"
            >
              <input
                type="text"
                onBlur={toggleSearch}
                name="search"
                className=" rounded-sm bg-white text-blue-800  py-1 focus:outline-none px-2"
              />
              <div
                className={` flex items-center duration-500 transition-all ${
                  !isSearchExpanded
                    ? "-translate-x-[197px]"
                    : "-translate-x-[20px]"
                } `}
              >
                <button type="submit" className=" bg-blue-700 px-2 p-1">
                  <IoSearchOutline size={24} />
                </button>
                <h1
                  onClick={() => toggleSearch()}
                  className=" bg-blue-700 pr-[118px] px-1 text-[16px] font-semibold py-1"
                >
                  Search
                </h1>
              </div>
            </form>
              <h1 className=" mt-5 mb-2 ml-2.5 font-semibold text-[16px]">
                Today
              </h1>
            <div>
              <div className=" px-2.5 py-1 hover:bg-[#00000030] flex justify-between items-center">
                <div>
                  <h1>ACT Therapy...</h1>
                  <p className=" text-[12px] font-normal">
                    {"Today"},{"09:52 pm"}
                  </p>
                </div>
                <BsThreeDots
                  onClick={(e) => handleModalClick(e, "my_modal_7")}
                  size={24}
                  className="cursor-pointer"
                />
                <dialog id="my_modal_7" className="modal">
                  <div
                    className="modal-box bg-[#FFFFFF4D] px-1 py-1 w-52 absolute"
                    style={{
                      left: `${modalPosition.x}px`,
                      top: `${modalPosition.y}px`,
                      transform: 'none',
                      margin: 0
                    }}
                  >
                    <div className=" flex  my-2 rounded-sm items-center gap-1 px-2.5 py-1 hover:bg-[#00112F4D]">
                      {" "}
                      <IoMdShare size={24}/>
                      <p className=" text-[16px] font-semibold ">Share</p>
                    </div>
                    <div className=" flex  my-2 rounded-sm items-center gap-1 px-2.5 py-1 hover:bg-[#00112F4D]">
                      {" "}
                      <RiDeleteBin6Line  size={24}/>
                      <p className=" text-[16px] font-semibold ">Delete</p>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
              <div className=" px-2.5 py-1 hover:bg-[#00000030] flex justify-between items-center">
                <div>
                  <h1>ACT Therapy...</h1>
                  <p className=" text-[12px] font-normal">
                    {"Today"},{"09:52 pm"}
                  </p>
                </div>
                <BsThreeDots
                  onClick={(e) => handleModalClick(e, "my_modal_8")}
                  size={24}
                  className="cursor-pointer"
                />
                <dialog id="my_modal_8" className="modal">
                  <div
                    className="modal-box bg-[#FFFFFF4D] px-1 py-1 w-52 absolute"
                    style={{
                      left: `${modalPosition.x}px`,
                      top: `${modalPosition.y}px`,
                      transform: 'none',
                      margin: 0
                    }}
                  >
                    <div className=" flex  my-2 rounded-sm items-center gap-1 px-2.5 py-1 hover:bg-[#00112F4D]">
                      {" "}
                      <IoMdShare size={24}/>
                      <p className=" text-[16px] font-semibold ">Share</p>
                    </div>
                    <div className=" flex  my-2 rounded-sm items-center gap-1 px-2.5 py-1 hover:bg-[#00112F4D]">
                      {" "}
                      <RiDeleteBin6Line  size={24}/>
                      <p className=" text-[16px] font-semibold ">Delete</p>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            </div>
              <h1 className=" mt-5 mb-2 ml-2.5 font-semibold text-[16px]">
                Yesterday
              </h1>
            <div >
              <div className=" px-2.5 py-1 hover:bg-[#00000030] flex justify-between items-center">
                <div>
                  <h1>ACT Therapy...</h1>
                  <p className=" text-[12px] font-normal">
                    {"Today"},{"09:52 pm"}
                  </p>
                </div>
                {/* modal calling button modal should be called by the iterating array index or the id in the array data */}
                <BsThreeDots
                  onClick={(e) => handleModalClick(e, "my_modal_9")}
                  size={24}
                  className="cursor-pointer"
                />
                {/* Modal starts for the three dots */}
                {/* Modal id should be given by the id or the index of the iterating array */}
                <dialog id="my_modal_9" className="modal">
                  <div
                    className="modal-box bg-[#FFFFFF4D] px-1 py-1 w-52 absolute"
                    style={{
                      left: `${modalPosition.x}px`,
                      top: `${modalPosition.y}px`,
                      transform: 'none',
                      margin: 0
                    }}
                  >
                    <div className=" flex  my-2 rounded-sm items-center gap-1 px-2.5 py-1 hover:bg-[#00112F4D]">
                      {" "}
                      <IoMdShare size={24}/>
                      <p className=" text-[16px] font-semibold ">Share</p>
                    </div>
                    <div className=" flex  my-2 rounded-sm items-center gap-1 px-2.5 py-1 hover:bg-[#00112F4D]">
                      {" "}
                      <RiDeleteBin6Line  size={24}/>
                      <p className=" text-[16px] font-semibold ">Delete</p>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
                {/* modal ends */}
              </div>
              <div className=" px-2.5 py-1 hover:bg-[#00000030] flex justify-between items-center">
                <div>
                  <h1>ACT Therapy...</h1>
                  <p className=" text-[12px] font-normal">
                    {"Today"},{"09:52 pm"}
                  </p>
                </div>
                {/* modal calling button modal should be called by the iterating array index or the id in the array data */}
                <BsThreeDots
                  onClick={(e) => handleModalClick(e, "my_modal_1")}
                  size={24}
                  className="cursor-pointer"
                />
                {/* Modal starts for the three dots */}
                {/* Modal id should be given by the id or the index of the iterating array */}
                <dialog id="my_modal_1" className="modal">
                  <div
                    className="modal-box bg-[#FFFFFF4D] px-1 py-1 w-52 absolute"
                    style={{
                      left: `${modalPosition.x}px`,
                      top: `${modalPosition.y}px`,
                      transform: 'none',
                      margin: 0
                    }}
                  >
                    <div className=" flex  my-2 rounded-sm items-center gap-1 px-2.5 py-1 hover:bg-[#00112F4D]">
                      {" "}
                      <IoMdShare size={24}/>
                      <p className=" text-[16px] font-semibold ">Share</p>
                    </div>
                    <div className=" flex  my-2 rounded-sm items-center gap-1 px-2.5 py-1 hover:bg-[#00112F4D]">
                      {" "}
                      <RiDeleteBin6Line  size={24}/>
                      <p className=" text-[16px] font-semibold ">Delete</p>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
                {/* modal ends */}
              </div>
              <div className=" px-2.5 py-1 hover:bg-[#00000030] flex justify-between items-center">
                <div>
                  <h1>ACT Therapy...</h1>
                  <p className=" text-[12px] font-normal">
                    {"Today"},{"09:52 pm"}
                  </p>
                </div>
                {/* modal calling button modal should be called by the iterating array index or the id in the array data */}
                <BsThreeDots
                  onClick={(e) => handleModalClick(e, "my_modal_10")}
                  size={24}
                  className="cursor-pointer"
                />
                {/* Modal starts for the three dots */}
                {/* Modal id should be given by the id or the index of the iterating array */}
                <dialog id="my_modal_10" className="modal">
                  <div
                    className="modal-box bg-[#FFFFFF4D] px-1 py-1 w-52 absolute"
                    style={{
                      left: `${modalPosition.x}px`,
                      top: `${modalPosition.y}px`,
                      transform: 'none',
                      margin: 0
                    }}
                  >
                    <div className=" flex  my-2 rounded-sm items-center gap-1 px-2.5 py-1 hover:bg-[#00112F4D]">
                      {" "}
                      <IoMdShare size={24}/>
                      <p className=" text-[16px] font-semibold ">Share</p>
                    </div>
                    <div className=" flex  my-2 rounded-sm items-center gap-1 px-2.5 py-1 hover:bg-[#00112F4D]">
                      {" "}
                      <RiDeleteBin6Line  size={24}/>
                      <p className=" text-[16px] font-semibold ">Delete</p>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
                {/* modal ends */}
              </div>
            </div>
          </nav>
        </div>
        <div 
          onClick={() => {
            // First set the flag in localStorage
            localStorage.setItem('scrollToPricing', 'true');
            
            // Navigate to the home page with a hash fragment
            window.location.href = '/';
          }}
          className={`flex items-center rounded-t-xl bg-[#0056F6] cursor-pointer ${!isCollapsed ? "pt-1" : " hidden"} w-full px-5 py-2 gap-3 absolute bottom-0 `}
        >
          <TbArrowBigUpLine size={24} />
          <div>
            <h1 className=" font-semibold text-[16px]">Subscription</h1>
            <p className=" font-normal text-sm">More advanced feature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon Components
const ReminderIcon = ({ size = 24, className = "fill-white" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_604_388)">
      <path
        d="M21.5 1.5H20.75C20.75 1.30109 20.671 1.11032 20.5303 0.96967C20.3897 0.829018 20.1989 0.75 20 0.75C19.8011 0.75 19.6103 0.829018 19.4697 0.96967C19.329 1.11032 19.25 1.30109 19.25 1.5H13.25C13.25 1.30109 13.171 1.11032 13.0303 0.96967C12.8897 0.829018 12.6989 0.75 12.5 0.75C12.3011 0.75 12.1103 0.829018 11.9697 0.96967C11.829 1.11032 11.75 1.30109 11.75 1.5H5.75C5.75 1.30109 5.67098 1.11032 5.53033 0.96967C5.38968 0.829018 5.19891 0.75 5 0.75C4.80109 0.75 4.61032 0.829018 4.46967 0.96967C4.32902 1.11032 4.25 1.30109 4.25 1.5H3.5C2.70463 1.50091 1.9421 1.81728 1.37969 2.37969C0.817277 2.9421 0.500913 3.70463 0.5 4.5L0.5 21C0.500913 21.7954 0.817277 22.5579 1.37969 23.1203C1.9421 23.6827 2.70463 23.9991 3.5 24H21.5C22.2954 23.9991 23.0579 23.6827 23.6203 23.1203C24.1827 22.5579 24.4991 21.7954 24.5 21V4.5C24.4991 3.70463 24.1827 2.9421 23.6203 2.37969C23.0579 1.81728 22.2954 1.50091 21.5 1.5ZM2 4.5C2 4.10218 2.15804 3.72064 2.43934 3.43934C2.72064 3.15804 3.10218 3 3.5 3H4.25V4.5C4.25 4.69891 4.32902 4.88968 4.46967 5.03033C4.61032 5.17098 4.80109 5.25 5 5.25C5.19891 5.25 5.38968 5.17098 5.53033 5.03033C5.67098 4.88968 5.75 4.69891 5.75 4.5V3H11.75V4.5C11.75 4.69891 11.829 4.88968 11.9697 5.03033C12.1103 5.17098 12.3011 5.25 12.5 5.25C12.6989 5.25 12.8897 5.17098 13.0303 5.03033C13.171 4.88968 13.25 4.69891 13.25 4.5V3H19.25V4.5C19.25 4.69891 19.329 4.88968 19.4697 5.03033C19.6103 5.17098 19.8011 5.25 20 5.25C20.1989 5.25 20.3897 5.17098 20.5303 5.03033C20.671 4.88968 20.75 4.69891 20.75 4.5V3H21.5C21.8978 3 22.2794 3.15804 22.5607 3.43934C22.842 3.72064 23 4.10218 23 4.5V6.75H2V4.5ZM23 21C23 21.3978 22.842 21.7794 22.5607 22.0607C22.2794 22.342 21.8978 22.5 21.5 22.5H3.5C3.10218 22.5 2.72064 22.342 2.43934 22.0607C2.15804 21.7794 2 21.3978 2 21V8.25H23V21Z"
        className={className}
      />
      <path
        d="M8.75 14.625V18.375C8.55109 18.375 8.36032 18.454 8.21967 18.5947C8.07902 18.7353 8 18.9261 8 19.125C8 19.3239 8.07902 19.5147 8.21967 19.6553C8.36032 19.796 8.55109 19.875 8.75 19.875H11.75V20.25C11.75 20.4489 11.829 20.6397 11.9697 20.7803C12.1103 20.921 12.3011 21 12.5 21C12.6989 21 12.8897 20.921 13.0303 20.7803C13.171 20.6397 13.25 20.4489 13.25 20.25V19.875H16.25C16.4489 19.875 16.6397 19.796 16.7803 19.6553C16.921 19.5147 17 19.3239 17 19.125C17 18.9261 16.921 18.7353 16.7803 18.5947C16.6397 18.454 16.4489 18.375 16.25 18.375V14.625C16.25 13.6304 15.8549 12.6766 15.1517 11.9733C14.4484 11.2701 13.4946 10.875 12.5 10.875C11.5054 10.875 10.5516 11.2701 9.84835 11.9733C9.14509 12.6766 8.75 13.6304 8.75 14.625ZM10.25 14.625C10.25 14.0283 10.4871 13.456 10.909 13.034C11.331 12.6121 11.9033 12.375 12.5 12.375C13.0967 12.375 13.669 12.6121 14.091 13.034C14.5129 13.456 14.75 14.0283 14.75 14.625V18.375H10.25V14.625Z"
        className={className}
      />
      <path
        d="M6.30046 14.9729C6.49217 15.0259 6.6971 15.0006 6.87016 14.9025C7.04321 14.8045 7.17023 14.6417 7.22326 14.45C7.66604 12.8202 8.62635 11.3784 9.95956 10.3418C10.0415 10.2829 10.1108 10.2082 10.1632 10.1219C10.2156 10.0357 10.2501 9.93978 10.2646 9.83992C10.279 9.74005 10.2732 9.63829 10.2474 9.54074C10.2216 9.44318 10.1764 9.35183 10.1145 9.27215C10.0526 9.19248 9.97522 9.12612 9.88705 9.07705C9.79888 9.02798 9.70171 8.9972 9.60137 8.98657C9.50102 8.97593 9.39956 8.98566 9.30306 9.01516C9.20656 9.04466 9.11701 9.09333 9.03976 9.15826C8.42963 9.63174 7.88139 10.18 7.40791 10.7901C6.65494 11.7589 6.10042 12.8667 5.77606 14.0501C5.74983 14.1451 5.74259 14.2443 5.75476 14.3422C5.76692 14.44 5.79825 14.5345 5.84696 14.6202C5.89566 14.7059 5.96078 14.7811 6.0386 14.8417C6.11642 14.9022 6.2054 14.9468 6.30046 14.9729Z"
        className={className}
      />
      <path
        d="M16.4085 11.7099C17.0404 12.5243 17.5053 13.4555 17.7766 14.45C17.8296 14.6419 17.9567 14.8049 18.1299 14.9031C18.3031 15.0013 18.5082 15.0266 18.7002 14.9736C18.8921 14.9206 19.055 14.7935 19.1533 14.6203C19.2515 14.4471 19.2768 14.242 19.2238 14.0501C18.8994 12.8667 18.3449 11.7589 17.592 10.7901C17.1185 10.18 16.5702 9.63174 15.9601 9.15826C15.8829 9.09333 15.7933 9.04466 15.6968 9.01516C15.6003 8.98566 15.4988 8.97593 15.3985 8.98657C15.2982 8.9972 15.201 9.02798 15.1128 9.07705C15.0246 9.12612 14.9473 9.19248 14.8854 9.27215C14.8234 9.35183 14.7782 9.44318 14.7524 9.54074C14.7267 9.63829 14.7208 9.74005 14.7353 9.83992C14.7498 9.93978 14.7842 10.0357 14.8366 10.1219C14.889 10.2082 14.9583 10.2829 15.0403 10.3418C15.5512 10.7395 16.0107 11.1991 16.4085 11.7099Z"
        className={className}
      />
    </g>
    <defs>
      <clipPath id="clip0_604_388">
        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

const TaskIcon = ({ size = 24, className = "fill-white" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_287_2366)">
      <path
        d="M20.6494 1.81688C20.4265 1.61209 20.1346 1.49893 19.8319 1.50001H13.8319C13.7627 1.15961 13.6019 0.84454 13.3669 0.58876C13.1904 0.400595 12.9768 0.25111 12.7396 0.149767C12.5024 0.0484238 12.2467 -0.00257105 11.9887 1.00559e-05C11.553 -0.00719913 11.1286 0.139136 10.7899 0.413381C10.4512 0.687627 10.2198 1.0723 10.1363 1.50001H4.125C3.82663 1.50001 3.54048 1.61854 3.3295 1.82951C3.11853 2.04049 3 2.32664 3 2.62501V22.875C3 23.1734 3.11853 23.4595 3.3295 23.6705C3.54048 23.8815 3.82663 24 4.125 24H19.875C20.0232 24.0015 20.1701 23.9734 20.3073 23.9174C20.4445 23.8614 20.5691 23.7786 20.6738 23.6739C20.7786 23.5691 20.8614 23.4445 20.9174 23.3073C20.9734 23.1701 21.0015 23.0232 21 22.875V2.62501C21.0006 2.47339 20.9697 2.3233 20.9094 2.1842C20.849 2.04511 20.7605 1.92004 20.6494 1.81688ZM10.4738 2.25001C10.5732 2.25001 10.6686 2.2105 10.7389 2.14018C10.8092 2.06985 10.8488 1.97447 10.8488 1.87501C10.8464 1.72535 10.8744 1.57677 10.9311 1.43824C10.9877 1.2997 11.0718 1.17407 11.1784 1.06894C11.2849 0.963805 11.4116 0.881344 11.5509 0.82653C11.6902 0.771717 11.8391 0.745686 11.9887 0.75001C12.1449 0.745583 12.3002 0.774386 12.4444 0.83451C12.5885 0.894634 12.7183 0.984706 12.825 1.09876C13.0175 1.31153 13.1244 1.58807 13.125 1.87501C13.125 1.97447 13.1645 2.06985 13.2348 2.14018C13.3052 2.2105 13.4005 2.25001 13.5 2.25001H15.75V4.50001H8.25V2.25001H10.4738ZM20.25 22.875C20.25 22.9745 20.2105 23.0698 20.1402 23.1402C20.0698 23.2105 19.9745 23.25 19.875 23.25H4.125C4.02554 23.25 3.93016 23.2105 3.85984 23.1402C3.78951 23.0698 3.75 22.9745 3.75 22.875V2.62501C3.75 2.52555 3.78951 2.43017 3.85984 2.35985C3.93016 2.28952 4.02554 2.25001 4.125 2.25001H7.5V4.87501C7.5 4.97447 7.53951 5.06985 7.60983 5.14017C7.68016 5.2105 7.77554 5.25001 7.875 5.25001H16.125C16.2245 5.25001 16.3198 5.2105 16.3902 5.14017C16.4605 5.06985 16.5 4.97447 16.5 4.87501V2.25001H19.8319C19.9445 2.24818 20.0537 2.28904 20.1375 2.36439C20.1736 2.39744 20.2022 2.43774 20.2216 2.48266C20.241 2.52758 20.2507 2.57609 20.25 2.62501V22.875Z"
        className={className}
      />
      <path
        d="M18.375 3.75H17.625C17.5255 3.75 17.4302 3.78951 17.3598 3.85984C17.2895 3.93016 17.25 4.02554 17.25 4.125C17.25 4.22446 17.2895 4.31984 17.3598 4.39016C17.4302 4.46049 17.5255 4.5 17.625 4.5H18V21H6V4.5H6.375C6.47446 4.5 6.56984 4.46049 6.64017 4.39016C6.71049 4.31984 6.75 4.22446 6.75 4.125C6.75 4.02554 6.71049 3.93016 6.64017 3.85984C6.56984 3.78951 6.47446 3.75 6.375 3.75H5.625C5.52554 3.75 5.43016 3.78951 5.35984 3.85984C5.28951 3.93016 5.25 4.02554 5.25 4.125V21.375C5.25 21.4745 5.28951 21.5698 5.35984 21.6402C5.43016 21.7105 5.52554 21.75 5.625 21.75H18.375C18.4745 21.75 18.5698 21.7105 18.6402 21.6402C18.7105 21.5698 18.75 21.4745 18.75 21.375V4.125C18.75 4.02554 18.7105 3.93016 18.6402 3.85984C18.5698 3.78951 18.4745 3.75 18.375 3.75Z"
        className={className}
      />
      <path
        d="M12.375 9H16.5C16.5995 9 16.6948 8.96049 16.7652 8.89017C16.8355 8.81984 16.875 8.72446 16.875 8.625C16.875 8.52554 16.8355 8.43016 16.7652 8.35983C16.6948 8.28951 16.5995 8.25 16.5 8.25H12.375C12.2755 8.25 12.1802 8.28951 12.1098 8.35983C12.0395 8.43016 12 8.52554 12 8.625C12 8.72446 12.0395 8.81984 12.1098 8.89017C12.1802 8.96049 12.2755 9 12.375 9Z"
        className={className}
      />
      <path
        d="M12.375 11.25H15.375C15.4745 11.25 15.5698 11.2105 15.6402 11.1402C15.7105 11.0698 15.75 10.9745 15.75 10.875C15.75 10.7755 15.7105 10.6802 15.6402 10.6098C15.5698 10.5395 15.4745 10.5 15.375 10.5H12.375C12.2755 10.5 12.1802 10.5395 12.1098 10.6098C12.0395 10.6802 12 10.7755 12 10.875C12 10.9745 12.0395 11.0698 12.1098 11.1402C12.1802 11.2105 12.2755 11.25 12.375 11.25Z"
        className={className}
      />
      <path
        d="M8.62463 11.2125C8.69494 11.2822 8.78998 11.3213 8.88901 11.3212H8.90588C8.95956 11.3205 9.01244 11.3082 9.06097 11.2852C9.10949 11.2623 9.15251 11.2291 9.18713 11.1881L11.1615 8.81249C11.1958 8.77519 11.2221 8.73133 11.239 8.68357C11.2558 8.63581 11.2628 8.58513 11.2595 8.53459C11.2563 8.48405 11.2428 8.4347 11.2199 8.3895C11.1971 8.34431 11.1653 8.30422 11.1265 8.27165C11.0877 8.23908 11.0427 8.2147 10.9943 8.19998C10.9458 8.18527 10.8949 8.18052 10.8445 8.18603C10.7942 8.19154 10.7455 8.20719 10.7013 8.23204C10.6572 8.25689 10.6186 8.29042 10.5878 8.33061L8.86463 10.3931L7.76401 9.29436C7.69256 9.22985 7.59904 9.19528 7.50281 9.19782C7.40658 9.20036 7.31501 9.23981 7.24706 9.308C7.17911 9.37619 7.13999 9.46789 7.13779 9.56413C7.1356 9.66037 7.17049 9.75377 7.23526 9.82499L8.62463 11.2125Z"
        className={className}
      />
      <path
        d="M16.5 14.25H12.375C12.2755 14.25 12.1802 14.2105 12.1098 14.1402C12.0395 14.0698 12 13.9745 12 13.875C12 13.7755 12.0395 13.6802 12.1098 13.6098C12.1802 13.5395 12.2755 13.5 12.375 13.5H16.5C16.5995 13.5 16.6948 13.5395 16.7652 13.6098C16.8355 13.6802 16.875 13.7755 16.875 13.875C16.875 13.9745 16.8355 14.0698 16.7652 14.1402C16.6948 14.2105 16.5995 14.25 16.5 14.25Z"
        className={className}
      />
      <path
        d="M15.375 16.5H12.375C12.2755 16.5 12.1802 16.4605 12.1098 16.3902C12.0395 16.3198 12 16.2245 12 16.125C12 16.0255 12.0395 15.9302 12.1098 15.8598C12.1802 15.7895 12.2755 15.75 12.375 15.75H15.375C15.4745 15.75 15.5698 15.7895 15.6402 15.8598C15.7105 15.9302 15.75 16.0255 15.75 16.125C15.75 16.2245 15.7105 16.3198 15.6402 16.3902C15.5698 16.4605 15.4745 16.5 15.375 16.5Z"
        className={className}
      />
      <path
        d="M8.88974 16.5712C8.79072 16.5713 8.69568 16.5322 8.62537 16.4625L7.23599 15.0731C7.19829 15.0391 7.1679 14.9977 7.14666 14.9516C7.12542 14.9054 7.11377 14.8554 7.11244 14.8047C7.1111 14.7539 7.12009 14.7034 7.13887 14.6562C7.15764 14.609 7.18581 14.5661 7.22167 14.5301C7.25753 14.4941 7.30032 14.4658 7.34745 14.4468C7.39459 14.4279 7.44508 14.4187 7.49587 14.4199C7.54665 14.421 7.59667 14.4325 7.64289 14.4536C7.68911 14.4747 7.73057 14.5049 7.76474 14.5425L8.86537 15.6412L10.5885 13.5787C10.6526 13.5026 10.7444 13.4552 10.8435 13.4467C10.9427 13.4383 11.0412 13.4696 11.1172 13.5337C11.1933 13.5979 11.2408 13.6896 11.2493 13.7888C11.2577 13.8879 11.2264 13.9864 11.1622 14.0625L9.18787 16.4381C9.15429 16.478 9.11277 16.5104 9.06596 16.5333C9.01915 16.5562 8.96807 16.5692 8.91599 16.5712H8.88974Z"
        className={className}
      />
    </g>
    <defs>
      <clipPath id="clip0_287_2366">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default DesktopNav;
