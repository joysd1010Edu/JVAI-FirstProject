import Image from "next/image";
import React from "react";
import { FaFacebook, FaYoutube } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { MdEmail, MdOutlineWhatsapp } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";

const Footer = () => {
  return (
    <div className=" bg-[#001338] px-14 py-10 ">
      <div className="grid lg:grid-cols-4">
        <div>
          {/* <Image src='/project-image/Group 1.svg'
            alt='profile'
            width={50}
            height={50}
          /> */}

          <Link href={"/"}>
            <Image src="/sitelogo.png" alt="website_logo" width={50} height={50} />
          </Link>
          <p className="text-white mt-7">
            Crafting mindful experiences with <br /> intelligent therapy. Your
            journey <br /> matters.
          </p>
          <div className="flex gap-2 text-2xl text-white mt-7 ">
            <FaFacebook />
            <FaYoutube />
            <FaInstagramSquare />
            <MdOutlineWhatsapp />
          </div>
        </div>

        <div>
          <h1 className="text-[#0056F6] font-bold text-lg">Quick Links</h1>
          <div className="flex flex-col">
            <Link href="/" className="text-white mb-2.5 mt-5">
              Home
            </Link>
            <Link href="/about-us" className="text-white mb-2.5">
              About Us
            </Link>
            <Link href="/theraphy" className="text-white mb-2.5">
              Types of Therapy
            </Link>
            <Link href="/commonStruggles" className="text-white mb-2.5">
              Common Struggles
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-[#0056F6] font-bold text-lg">Contact Us</h1>

          <div className="flex items-center text-white gap-1 mb-2.5">
            <div>
              <MdEmail />
            </div>
            <div>support@emothrive.health</div>
          </div>

           <div className=' text-white flex item-center gap-2'>
              <div><CiLocationOn /></div>
              <div>I45 Pine Haven Shores Rd. Ste 2213, Shelburne, Vermont, 05482</div>
            </div>
          </div>

        <div>
          <h1 className="text-[#0056F6] font-bold text-lg">Newsletter</h1>
          <p className="text-white mt-5 mb-7">
            Subscribe for travel updates and <br /> exclusive offers
          </p>
          <div className="flex">
            <input
              className="border-1 border-[#0056F6] text-white rounded-l-lg px-3"
              type="text"
              placeholder="Enter your email"
            />
            <button className="bg-[#0056F6] rounded-r-xm text-white px-4 py-2.5 rounded-r-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <hr className="text-white mt-5" />
      <h1 className="text-center text-white mt-6">
        © 2025 <span className="text-primary">Menthal.</span> All Rights
        Reserved.
      </h1>
      <h1 className="text-center text-white mt-2">
        Crafted by &lt; Qbit Coders &gt;Team 
      </h1>
    </div>
  );
};
``;
export default Footer;
