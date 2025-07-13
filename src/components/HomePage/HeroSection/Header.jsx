import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div>
      <div style={{
        background: 'radial-gradient(circle at center, #0129F470 5%, rgba(1, 12, 74, 0.20) 70%, #010C4A33 100%)',
      }} className='h-[800px] mx-auto'>
        <div className='flex justify-center items-center'>
          <button className='bg-[#F9F9F9] text-[20px] text-primary rounded-[50px] px-[20px] py-[2px] lg:mt-[107px]'>Mental Health Care</button>
        </div>
        <p className='mt-[40px] text-[60px] text-center font-bold'>AI-Powered <span className='text-primary italic font-playfair'>Mental Health</span><br />
          Support Anytime, Anywhere.</p>
        <p className='mt-[30px] text-center text-[#D0E0FF] text-2xl'>Experience personalized, text-based therapy sessions guided by <br /> advanced AI designed to support your mental health journey through real <br /> conversations.</p>
        <div className="flex justify-center">
          <button className="mt-[40px] px-[20px] py-[10px] rounded-[38px] bg-primary cursor-pointer text-white">
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

            <div className='text-xl' >Trusted by <span className='text-primary '>1,000+</span> self changers.</div>
          </div>
        </div>
      </div>
      {/*Marquary Tag*/}
     

    </div>
  )
}

export default Header