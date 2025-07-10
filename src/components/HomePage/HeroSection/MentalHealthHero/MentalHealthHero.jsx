import Image from 'next/image'
import React from 'react'

const MentalHealthHero = () => {
    return (
        <div>
            <div className="flex justify-center mt-24">
                <h1 className="text-[#018001] border border-[#018001] rounded-sm w-32 text-center">
                    How We Work
                </h1>
            </div>
            <h1 className='text-center font-bold text-4xl mt-8'>Nurture Your Mental <span className='text-[#018001] italic'>Health</span> the Holistic Way</h1>
            {/*Card*/}
            <div className='mt-[60px] lg:flex lg:gap-6 justify-center'>
                <div className='lg:w-[424px] h-[267px] py-11 px-6 border-1 border-[#C5E2C5] rounded-xl text-center hover:bg-[#C5E2C5] transition duration-300 mb-2'>
                    <h1 className='font-bold text-xl'>Step 1</h1>
                    <h1 className='font-bold text-xl mt-7 mb-5'>Choose Your Concern</h1>
                    <p>Lorem ipsum dolor sit amet consectetur. Euismod sit et arcu amet sed ultrices quam.</p>
                </div>
                <div className='lg:w-[424px] h-[267px] py-11 px-6 border-1 border-[#C5E2C5] rounded-xl text-center hover:bg-[#C5E2C5] transition duration-300 mb-2'>
                    <h1 className='font-bold text-xl'>Step 1</h1>
                    <h1 className='font-bold text-xl mt-7 mb-5'>Choose Your Concern</h1>
                    <p>Lorem ipsum dolor sit amet consectetur. Euismod sit et arcu amet sed ultrices quam.</p>
                </div>
                <div className='lg:w-[424px] h-[267px] py-11 px-6 border-1 border-[#C5E2C5] rounded-xl text-center hover:bg-[#C5E2C5] transition duration-300'>
                    <h1 className='font-bold text-xl'>Step 1</h1>
                    <h1 className='font-bold text-xl mt-7 mb-5'>Choose Your Concern</h1>
                    <p>Lorem ipsum dolor sit amet consectetur. Euismod sit et arcu amet sed ultrices quam.</p>
                </div>      
            </div>
            {/*Video*/}
            <div className='mt-[120px] flex justify-center'>
                <Image
                src='/project-image/video.png'
                width={1320}
                height={632}
                alt='Video'
                />
            </div>
        </div>
    )
}

export default MentalHealthHero