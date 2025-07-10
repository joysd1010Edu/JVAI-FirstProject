import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div>
      <div style={{
        background: 'linear-gradient(253deg, rgba(2, 191, 2, 0.20) 0%, rgba(0, 68, 0, 0.20) 100%)',
      }} className='h-[800px] mx-auto'>
        <div className='flex justify-center items-center'>
          <button className='bg-[#DCFCE7] text-[20px] rounded-[50px] px-[20px] py-[2px] lg:mt-[107px]'>Mental Health Care</button>
        </div>
        <p className='mt-[40px] text-[60px] text-center font-bold'>AI-Powered <span className='text-[#018001] italic font-playfair'>Mental Health</span><br />
          Support Anytime, Anywhere.</p>
        <p className='mt-[30px] text-center text-[#686F7D] text-2xl'>Experience personalized, text-based therapy sessions guided by <br /> advanced AI designed to support your mental health journey through real <br /> conversations.</p>
        <div className="flex justify-center">
          <button className="mt-[40px] px-[20px] py-[10px] rounded-[38px] bg-[#018001] cursor-pointer text-white">
            Try Free AI Therapy
          </button>
        </div>
        <div className='flex justify-center'>
          <div className='w-[510px] py-2 bg-[#FFFF] rounded-[9999px] text-[#686F7D] font-bold flex gap-4 items-center mt-[30px]'>
            <div className='flex ml-4'>
              <Image className='rounded-full' src='/project-image/1.jpg'
                alt='profile'
                width={30}
                height={30}
              />
              <Image className='rounded-full' src='/project-image/2.jpg'
                alt='profile'
                width={30}
                height={30}
              />
              <Image className='rounded-full' src='/project-image/3.jpg'
                alt='profile'
                width={30}
                height={30}
              />
            </div>

            <div className='text-xl' >Trusted by <span className='text-[#018001] '>1,000+</span> self changers.</div>
          </div>
        </div>
      </div>
      {/*Marquary Tag*/}
      <marquee className="mt-[20px]">
        <div className="flex gap-8 text-[#000F0080] text-xl font-bold justify-center">
          <li>CHILD COUNSELLING</li>
          <li>FAMILY COUNSELLING</li>
          <li>INDIVIDUAL COUNSELLING</li>
          <li>CHILD COUNSELLING</li>
          <li>COUPLE COUNSELLING</li>
          <li>FAMILY COUNSELLING</li>
        </div>
      </marquee>

    </div>
  )
}

export default Header