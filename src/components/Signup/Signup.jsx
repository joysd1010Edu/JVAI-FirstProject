import Image from 'next/image';
import React from 'react';
import authenticationImage from './../../../public/authImage.png'
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { AiFillGoogleCircle } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi2";



const Signup = () => {
    return (
       <div>
                   <div className='lg:flex items-center '>
                       {/* Left div */}
                       <div
                           className='w-full md:w-1/2 md:block hidden'
                           style={{
                               background:
                                   'linear-gradient(180deg, rgba(0, 255, 0, 0.40) 0%, rgba(10, 251, 10, 0.30) 76.04%, rgba(0, 255, 0, 0.20) 100%)',
                           }}
                       >
                           <Image alt='Authentication image' className='w-full  md:h-[1025px] '  src={authenticationImage}/>
                       </div>
       
                       {/* Right div */}
       
                       <div className='md:h-[1025px] md:w-1/2 py-60 md:py-[308px] flex justify-center items-center'
                           style={{
                               background: 'linear-gradient(180deg, #0F1828 0%, #111111 100%)',
                           }}
                       >
                           <div className='w-96 '>
                               <h1 className='text-2xl text-[#F4F4F4] font-nunito font-bold mb-2 text-[26px]'>Hello!</h1>
                               <h1 className='text-[#F4F4F4] font-normal text-xl'>Sign Up to Get Started</h1>
                               <form className='mt-10 w-full text-[#4f565a]'>
                                   <div className='mb-4 bg-white flex items-center rounded-lg'>
                                       <HiOutlineUserCircle className='mx-2.5' size={24} />
                                       <input
                                           className='py-3.5 font-normal border-none w-full '
                                           type='text'
                                           placeholder='Name'
                                       />
                                   </div>
                                   <div className='mb-4 bg-white flex items-center rounded-lg'>
                                       <CiMail className='mx-2.5' size={24} />
                                       <input
                                           className='py-3.5 font-normal border-none w-full '
                                           type='text'
                                           placeholder='Email address'
                                       />
                                   </div>
                                   <div className='mb-4 bg-white flex items-center rounded-lg'>
                                       <IoLockClosedOutline className='mx-2.5' size={24} />
                                       <input
                                           className='py-3.5 font-normal border-none w-full '
                                           type='text'
                                           placeholder='Password'
                                       />
                                   </div>
                                   
                                   <button type='submit' className='bg-[#0056F6] rounded-lg w-full text-white py-3.5 cursor-pointer mb-5'>
                                       Sign up
                                   </button>
                                   <h3 className='text-center mb-5 text-[#EEEEEE]'>or continue with</h3>
                                   <button  className='bg-white rounded-lg w-full flex justify-center items-center  py-3.5 cursor-pointer mb-4'>
                                      <AiFillGoogleCircle color='#0056F6' size={26} className=' mx-2.5 '/> <p>Continue with Google</p>
                                   </button>
                                  
                               </form>
                           </div>
                       </div>
                   </div>
               </div>
    );
};

export default Signup;
