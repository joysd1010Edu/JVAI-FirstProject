"use client";
import React, { useState, useEffect } from "react";
import DesktopNav from "./DesktopNav";
import { RiMenu4Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import MobileNav from "./MobileNav";


const Nav = () => {
  const [isOpened, setIsOpened] = useState(false);
  const toggleOpen = () => {
    setIsOpened(!isOpened);
  };
  return (
    <>
      <DesktopNav />

      <div className=" block lg:hidden ">

        <div className=" flex py-2 items-center justify-between px-4 w-screen bg-gradient-to-br from-[#0129F4] to-[#00062780] ">
          <RiMenu4Line onClick={toggleOpen} size={24}/>
          <h1 className=" text-xl text" style={{fontFamily:"lemon, sans-serif"}}>EmoThrive</h1>
          <CgProfile size={24}/>
        </div>

        <div>
          <MobileNav isOpened={isOpened} toggleOpen={toggleOpen} />
        </div>


      </div>
    </>
  );
};

export default Nav;
