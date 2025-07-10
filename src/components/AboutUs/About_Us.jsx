import Image from 'next/image'
import React from 'react'
import { MdOutlineStar } from "react-icons/md";

const About_Us = () => {
  return (
    <div>
      <div style={{
        background: 'linear-gradient(253deg, rgba(2, 191, 2, 0.20) 0%, rgba(0, 68, 0, 0.20) 100%)',
      }} className='h-[532px] mx-auto'>
        <p className='lg:py-14 text-[60px] text-center font-serif font-bold'>Mental Health,<span className='text-[#018001] italic font-playfair'> Reimagined</span><br />
          Through AI</p>
        <p className=' text-center text-[#686F7D] text-2xl'>
          we believe that everyone deserves access to mental wellness — anytime, anywhere. <br /> Our platform combines the power of advanced AI with proven therapeutic techniques <br /> to create a safe, supportive, and affordable space for healing.
        </p>
      </div>

      {/*Photo section*/}
      <div className=' mt-[500px] lg:mt-32 lg:flex gap-14 justify-center items-start'>
        <div className='bg-[#01800133] lg:w-[536px] lg:h-[500px] rounded-xl relative'>
          <Image className='absolute lg:right-8 bottom-8' src='/project-image/about.png'
            alt='profile'
            width={550}
            height={550}
          />
        </div>

        <div className='lg:w-[702px]'>
          <div className="mb-2">
            <h1 className="text-[#018001] border border-[#018001] rounded-sm w-32 text-center font-semibold">
              Our Story
            </h1>
          </div>
          <h1 className='text-2xl lg:text-5xl font-semibold mb-2'>From isolation to <span className='italic font-playfair text-[#018001]'>intelligent</span> connection</h1>
          <p className='px-1 lg:px-0 text-justify'>Lorem ipsum dolor sit amet consectetur. Turpis justo pellentesque metus sit. Ac maecenas porta magna enim pellentesque penatibus tincidunt pulvinar fusce. Enim sagittis elementum amet scelerisque. Libero purus aliquam ut lacus cras semper eget fusce ac. Sed id iaculis tristique commodo sit egestas. Sed pulvinar suspendisse imperdiet nulla scelerisque scelerisque fringilla. Accumsan purus feugiat et ut ullamcorper mauris enim.
            Eget consequat egestas mi sit orci dis. Commodo dignissim purus pellentesque condimentum at tellus ipsum ut dictumst. Aliquam turpis nunc magna sit eget vehicula. Adipiscing et enim hendrerit ut mauris faucibus. Morbi pellentesque augue proin interdum vitae. Est cursus gravida posuere pulvinar congue a ac massa. Rhoncus tincidunt in lacus lobortis non consequat risus egestas aliquet. Facilisis duis eu iaculis leo amet. Nulla mauris sed et etiam vel. Tellus sed in nisl nulla est ac vestibulum fermentum. Sagittis vivamus at consequat adipiscing sed.</p>
        </div>
      </div>

      <div>
        <div className="mb-2 mt-28 flex justify-center">
          <h1 className="text-[#018001] border border-[#018001] rounded-sm text-center font-semibold py-1 px-4">
            What People Say
          </h1>
        </div>
        <h1 className='text-4xl font-semibold text-center mt-7'>Every session matters. Every story counts. <br /> Experience <span className='text-[#018001] font-semibold italic'>safespace</span> impact.</h1>
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

    </div>
  )
}

export default About_Us