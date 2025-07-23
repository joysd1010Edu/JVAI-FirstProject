import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>
      <div style={{
        background: 'radial-gradient(circle at center, #0B3B91 0%, #0A1A4F 50%, #000008 100%)',
      }} className='h-[800px] mx-auto text-white'>
        <div className='flex justify-center items-center'>
          <button className='bg-[#F9F9F9] text-[20px] text-[#0056F6] rounded-[50px] px-[20px] py-[2px] mt-6 lg:mt-32'>Mental Health Care</button>
        </div>
        <p className='mt-[40px] text-2xl lg:text-[60px] text-center font-bold'>AI-Powered <span className='italic font-playfair text-[#0056F6]'>Mental Health</span><br />
          Support Anytime, Anywhere.</p>
        <p className='mt-[30px] text-center text-[#D0E0FF] text-2xl'>Experience personalized, text-based therapy sessions guided by <br /> advanced AI designed to support your mental health journey through real <br /> conversations.</p>
        <div className="flex justify-center">
         <Link href={'/chat'} className='bg-[#0056F6] text-white rounded-[38px] py-[10px] px-[20px] outline-none mt-4 hover:bg-sky-500'>Try Free AI Therapy</Link>
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

            <div className='text-xl' >Trusted by <span className='text-[#0056F6]'>1,000+</span> self changers.</div>
          </div>
        </div>
      </div>
      {/*Marquary Tag*/}
     

    </div>
  )
}

export default Header