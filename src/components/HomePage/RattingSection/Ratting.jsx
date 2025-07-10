import Image from 'next/image';
import React from 'react';
import { MdOutlineStar } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

const Ratting = () => {
    return (
        <div>
            <div className='flex justify-center mt-32'>
                <div className='w-48 h-7 flex justify-center items-center'>
                    <h1 className='text-[#018001] border border-[#018001] px-5 py-0.5 rounded-sm text-center'>
                        What People Say
                    </h1>
                </div>
            </div>
            <h1 className='text-center mt-7 text-4xl font-bold'>Every session matters. Every story counts. <br /> Experience <span className='text-[#018001] italic font-playfair'>safespace</span> impact.</h1>
            <div className='mt-16'>
                {/*Card*/}
                <div className='mt-[60px] lg:flex lg:gap-6 justify-center'>
                    <div className='lg:w-[424px] h-[267px] py-11 px-6 border-1 border-[#C5E2C5] rounded-xl text-center bg-[#C5E2C5] transition duration-300 mb-2'>
                        <Image src='/project-image/ratting1.png'
                            alt='profile'
                            width={50}
                            height={50}
                            className='mx-auto'
                        />
                        <h1 className='font-bold text-xl mt-5 mb-3'>Robert Fox</h1>
                        {/*Star Icon*/}
                        <div className='flex justify-center mb-3'>
                            <MdOutlineStar className='text-xl text-[#018001]' />
                            <MdOutlineStar className='text-xl text-[#018001]' />
                            <MdOutlineStar className='text-xl text-[#018001]' />
                            <MdOutlineStar className='text-xl text-[#018001]' />
                            <MdOutlineStar className='text-xl text-[#018001]' />
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur. Euismod sit et arcu amet sed ultrices quam.</p>
                    </div>
                    <div className='lg:w-[424px] h-[267px] py-11 px-6 border-1 border-[#C5E2C5] rounded-xl text-center bg-[#C5E2C5] transition duration-300 mb-2'>
                        <Image src='/project-image/ratting2.png'
                            alt='profile'
                            width={50}
                            height={50}
                            className='mx-auto'
                        />
                        <h1 className='font-bold text-xl mt-5 mb-3'>Devon Lane</h1>
                        {/*Star Icon*/}
                        <div className='flex justify-center mb-3'>
                            <MdOutlineStar className='text-xl text-[#018001]' />
                            <MdOutlineStar className='text-xl text-[#018001]' />
                            <MdOutlineStar className='text-xl text-[#018001]' />
                            <MdOutlineStar className='text-xl text-[#018001]' />
                            <MdOutlineStar className='text-xl text-[#018001]' />
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur. Euismod sit et arcu amet sed ultrices quam.</p>
                    </div>
                    <div className='lg:w-[424px] h-[267px] py-11 px-6 border-1 border-[#C5E2C5] rounded-xl text-center bg-[#C5E2C5] transition duration-300'>
                        <Image src='/project-image/ratting3.png'
                            alt='profile'
                            width={50}
                            height={50}
                            className='mx-auto'
                        />
                        <h1 className='font-bold text-xl mt-5 mb-3'>Courtney Henry</h1>
                        {/*Star Icon*/}
                        <div className='flex justify-center mb-3'>
                            <MdOutlineStar className='text-xl text-[#018001]' />
                            <MdOutlineStar className='text-xl text-[#018001]' />
                            <MdOutlineStar className='text-xl text-[#018001]' />
                            <MdOutlineStar className='text-xl text-[#018001]' />
                            <MdOutlineStar className='text-xl text-[#018001]' />
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur. Euismod sit et arcu amet sed ultrices quam.</p>
                    </div>
                </div>
            </div>

            {/*Our Pricing Plans*/}
            <div>
                <div className="flex justify-center mt-24">
                    <h1 className="text-[#018001] border border-[#018001] rounded-sm w-32 text-center">
                        Our Pricing Plans
                    </h1>
                </div>
                <h1 className='text-center mt-7 text-4xl font-bold'>Accessible <span className='italic text-[#018001]'>therapy</span> for every mind</h1>

                <div className='mt-16 lg:flex lg:gap-6 justify-center'>
                    <div className='lg:w-[424px] min-h-[520px] bg-[#000F00] rounded-xl'>
                        <h1 className=' lg:mt-12 text-[#00FF00] text-3xl text-center'> Basic Plan</h1>
                        <h3 className='mt-2.5 text-xl text-white text-center'>Casual users needing regular suppor</h3>

                        <div className='flex gap-1.5 items-center mt-12 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Unlimited AI text-based sessions</h3>
                        </div>

                        <div className='flex gap-1.5 items-center mt-5 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Emotion-aware AI responses</h3>
                        </div>

                        <div className='flex gap-1.5 items-center mt-5 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Personalized mental health insights</h3>
                        </div>

                        <div className='flex gap-1.5 items-center mt-5 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Guided meditations & calming audios</h3>
                        </div>

                        <div className='flex gap-1.5 items-center mt-5 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Validity - 7 days</h3>
                        </div>
                        <h1 className='text-center text-white font-bold text-xl mt-12'>$19</h1>
                        <div className="flex justify-center mt-4">
                            <button className="text-white bg-[#018001] cursor-pointer rounded px-24 py-1.5">
                                Choice this plan
                            </button>
                        </div>
                    </div>

                    <div className='lg:w-[424px] min-h-[520px] bg-[#000F00] rounded-xl'>
                        <h1 className='mt-12 text-[#00FF00] text-3xl text-center'>Standard Plan</h1>
                        <h3 className='mt-2.5 text-xl text-white text-center'>Casual users needing regular suppor</h3>

                        <div className='flex gap-1.5 items-center mt-12 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Unlimited AI text-based sessions</h3>
                        </div>

                        <div className='flex gap-1.5 items-center mt-5 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Emotion-aware AI responses</h3>
                        </div>

                        <div className='flex gap-1.5 items-center mt-5 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Personalized mental health insights</h3>
                        </div>

                        <div className='flex gap-1.5 items-center mt-5 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Guided meditations & calming audios</h3>
                        </div>

                        <div className='flex gap-1.5 items-center mt-5 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Validity - 7 days</h3>
                        </div>
                        <h1 className='text-center text-white font-bold text-xl mt-12'>$19</h1>
                        <div className="flex justify-center mt-4">
                            <button className="text-white bg-[#018001] cursor-pointer rounded px-24 py-1.5">
                                Choice this plan
                            </button>
                        </div>
                    </div>

                    <div className='lg:w-[424px] min-h-[520px] bg-[#000F00] rounded-xl'>
                        <h1 className='mt-12 text-[#00FF00] text-3xl text-center'>Premium Plan</h1>
                        <h3 className='mt-2.5 text-xl text-white text-center'>Casual users needing regular suppor</h3>

                        <div className='flex gap-1.5 items-center mt-12 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Unlimited AI text-based sessions</h3>
                        </div>

                        <div className='flex gap-1.5 items-center mt-5 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Emotion-aware AI responses</h3>
                        </div>

                        <div className='flex gap-1.5 items-center mt-5 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Personalized mental health insights</h3>
                        </div>

                        <div className='flex gap-1.5 items-center mt-5 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Guided meditations & calming audios</h3>
                        </div>

                        <div className='flex gap-1.5 items-center mt-5 ml-12'>
                            <FaCheck className='text-[#00FF00] font-bold text-xl' />
                            <h3 className='text-white'>Validity - 7 days</h3>
                        </div>
                        <h1 className='text-center text-white font-bold text-xl mt-12'>$19</h1>
                        <div className="flex justify-center mt-4">
                            <button className="text-white bg-[#018001] cursor-pointer rounded px-24 py-1.5">
                                Choice this plan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ratting;
