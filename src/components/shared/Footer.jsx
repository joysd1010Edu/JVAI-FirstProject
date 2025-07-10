import Image from 'next/image'
import React from 'react'
import { FaFacebook, FaYoutube } from 'react-icons/fa6'
import { FaInstagramSquare } from "react-icons/fa";
import { MdEmail, MdOutlineWhatsapp } from 'react-icons/md';
import { IoMdCall } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
  return (
    <div className=' bg-[#000F00] px-14 py-11 rounded-sm'>
      <div className='grid lg:grid-cols-4'>

        <div>
          <Image src='/project-image/Group 1.svg'
            alt='profile'
            width={50}
            height={50}
          />
          <p className='text-white mt-7'>Crafting mindful experiences with <br /> intelligent therapy. Your journey <br /> matters.</p>
          <div className='flex gap-2 text-2xl text-[#018001] mt-7 '>
            <FaFacebook />
            <FaYoutube />
            <FaInstagramSquare />
            <MdOutlineWhatsapp />
          </div>
        </div>

        <div>
          <h1 className='text-[#018001] font-bold'>Quick Links</h1>
          <div className='flex flex-col'>
            <a href="#" className='text-white mb-2.5 mt-5'>Home</a>
            <a href="#" className='text-white mb-2.5'>About Us</a>
            <a href="#" className='text-white mb-2.5'>Types of Therapy</a>
            <a href="#" className='text-white mb-2.5'>Common Struggles</a>
          </div>
        </div>



        <div>
          <h1 className='text-[#018001] font-bold'>Contact Us</h1>
          <div className='flex items-center text-white gap-1 mt-5 mb-2.5'>
            <div><IoMdCall /></div>
            <div>+1 (555) 123-4567</div>
          </div>

          <div className='flex items-center text-white gap-1 mb-2.5'>
            <div><MdEmail /></div>
            <div>info@menthal.com</div>
          </div>

          <div className='flex items-center text-white gap-1 mb-2.5'>
            <div><CiLocationOn /></div>
            <div>123 Brand Street, NY 10001</div>
          </div>
        </div>


        <div>
          <h1 className='text-[#018001] font-bold'>Newsletter</h1>
          <p className='text-white mt-5 mb-7'>Subscribe for travel updates and <br /> exclusive offers</p>
          <div className='flex'>
            <input className='border-1 border-[#018001] rounded-l-lg' type="text" placeholder='Enter your email' />
            <button className='bg-[#018001] rounded-r-xm text-white px-4 py-2.5 rounded-r-lg'>Subscribe</button>
          </div>
        </div>

      </div>
      <hr className='text-white mt-5' />
      <h1 className='text-center text-white mt-6'>© 2025 <span className='text-[#018801]'>Menthal.</span> All Rights Reserved.</h1>
    </div>
  )
}

export default Footer