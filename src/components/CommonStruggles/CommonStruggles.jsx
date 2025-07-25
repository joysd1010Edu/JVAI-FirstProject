import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CgArrowTopRightO } from 'react-icons/cg'

const CommonStruggles = () => {
  return (
    <div>
         <div className='pb-10 bg-black text-white lg:px-0 px-4'>
      {/*Section-2*/}
      <div style={{
        background: 'radial-gradient(circle at center, #0129F470 5%, rgba(1, 12, 74, 0.20) 50%, #010C4A33 70%)',
      }} className='h-[532px] flex justify-center items-center text-center px-4'>
        <p className='lg:py-14 text-2xl lg:text-[66px]  font-serif font-bold'>You’re Not Alone and You Don’t Have <br /> to Face it <span className='italic text-blue-600'>Alone</span>.</p>
      </div>

      {/*Section-3*/}
      <div className='lg:flex gap-28 mt-28 justify-center'>
        <div>
          <h1 className="border border-white text-white mb-2 rounded-sm text-center font-semibold py-1 w-28">
            Loneliness
          </h1>
          <h1 className=' text-2xl lg:text-4xl font-semibold mb-3'>Feeling alone, even when you're not? We <span className='text-blue-600 italic'>understand</span></h1>
          <p className='text-lg'>Helps you recognize and reframe unhelpful thoughts and behaviors through <br /> structured tools and real-time AI support</p>
            <Link href={{ pathname: '/commonDetails', query: { type: 'd' } }}>
              <CgArrowTopRightO className='mt-3 text-4xl text-blue-600' />
            </Link>
        </div>
        

        <div>
          <Image src='/longliness.png'
            alt='profile'
            width={550}
            height={550}
          />
        </div>
      </div>

      {/*Section-4*/}
      <div style={{background: "linear-gradient(253deg, rgba(1, 41, 244, 0.20) 0%, rgba(1, 12, 74, 0.20) 100%);"}} className=' lg:h-[388px] lg:flex gap-28 mt-3 lg:mt-28 justify-center items-center'>
        <div>
          <Image src='/bullying.png'
            alt='profile'
            width={550}
            height={550}
          />
        </div>

        <div>
          <h1 className="border border-white text-white mb-2 rounded-sm text-center font-semibold py-1 w-32 mt-2 lg:mt-0">
            Bullying
          </h1>
          <h1 className=' text-2xl lg:text-4xl font-semibold mb-3 mt-2.5'>Words hurt. Silence hurts more. You <br /> don’t have to face it <span className='text-blue-600 italic'>alone.</span></h1>
          <p className='text-lg'>Bullying leaves emotional scars  whether it happens at school, work, online, <br /> or even at home.</p>
           <Link href={{ pathname: '/commonDetails', query: { type: 'e' } }}>
              <CgArrowTopRightO className='mt-3 text-4xl text-blue-600' />
            </Link>
        </div>
      </div>


      
      {/*Section-5*/}
      <div className='lg:flex gap-28 mt-28 justify-center'>
        <div>
          <h1 className="border border-white text-white mb-2 rounded-sm text-center font-semibold py-1 w-50">
            Alcohol & Recovery
          </h1>
          <h1 className=' text-2xl lg:text-4xl font-semibold mb-3'>Every step counts and you <span className='italic text-blue-600'>don’t</span> have to take it alone.</h1>
          <p className='text-lg'>Struggling with alcohol use or walking the path of recovery can feel overwhelming, isolating, and filled with setbacks.</p>
           <Link href={{ pathname: '/commonDetails', query: { type: 'f' } }}>
              <CgArrowTopRightO className='mt-3 text-4xl text-blue-600' />
            </Link>
        </div>

        <div>
          <Image src='/alchole.png'
            alt='profile'
            width={550}
            height={550}
          />
        </div>
      </div>


   
      {/*Section-6*/}
      <div style={{background: "linear-gradient(253deg, rgba(1, 41, 244, 0.20) 0%, rgba(1, 12, 74, 0.20) 100%);"}} className=' lg:h-[388px] lg:flex gap-66 mt-3 lg:mt-28 justify-center items-center'>
        <div>
          <Image src='/work_life.png'
            alt='profile'
            width={550}
            height={550}
          />
        </div>

        <div>
          <h1 className="border border-white text-white mb-2 rounded-sm text-center font-semibold py-1 w-44 mt-2 lg:mt-0">
            Work-Life Balance
          </h1>
          <h1 className=' text-2xl lg:text-4xl font-semibold mb-3 mt-2.5'>When everything feels like too much <br />  it’s time to find your <span className='italic text-blue-600'>balance.</span></h1>
          <p className='text-lg'>Long hours, endless to-do lists, and constant pressure can take a toll on <br /> your mental health. If you're feeling burned out, distracted.</p>
           <Link href={{ pathname: '/commonDetails', query: { type: 'g' } }}>
              <CgArrowTopRightO className='mt-3 text-4xl text-blue-600' />
            </Link>
        </div>
      </div>


      
      {/*Section-7*/}
      <div className='lg:flex gap-66 mt-28 justify-center'>
        <div>
          <h1 className="border border-white text-white mb-2 rounded-sm text-center font-semibold py-1 w-56">
            Relationship Conflicts
          </h1>
          <h1 className=' text-2xl lg:text-4xl font-semibold mb-3'>Every relationship has its <span className='text-blue-600 italic'>challenges</span> <br /> let’s work through them together.</h1>
          <p className='text-lg'>Whether it's tension with a partner, misunderstandings with friends, or <br /> family stress that never seems to ease, relationship struggles can leave you <br /> emotionally drained and confused.</p>
           <Link href={{ pathname: '/commonDetails', query: { type: 'h' } }}>
              <CgArrowTopRightO className='mt-3 text-4xl text-blue-600' />
            </Link>
        </div>

        <div>
          <Image src='/relationship.png'
            alt='profile'
            width={550}
            height={550}
          />
        </div>
      </div>

      {/*Section-8*/}
      <div style={{background: "linear-gradient(253deg, rgba(1, 41, 244, 0.20) 0%, rgba(1, 12, 74, 0.20) 100%);"}} className=' lg:h-[388px] lg:flex lg:gap-66 mt-3 lg:mt-28 justify-center items-center'>
        <div>
          <Image src='/procrastination.png'
            alt='profile'
            width={550}
            height={550}
          />
        </div>

        <div>
          <h1 className="border border-white text-white mb-2 rounded-sm text-center font-semibold py-1 w-32 mt-2 lg:mt-0">
            Procrastination
          </h1>
          <h1 className=' text-2xl lg:text-4xl font-semibold mb-3 mt-2.5'>Stuck, overwhelmed, or <span className='text-blue-600 italic'>always</span> <br /> running out of time.</h1>
          <p className='text-lg'>Procrastination often hides deeper issues like anxiety, perfectionism, or <br /> burnout. Infiheal helps you uncover what’s really going on.</p>
           <Link href={{ pathname: '/commonDetails', query: { type: 'i' } }}>
              <CgArrowTopRightO className='mt-3 text-4xl text-blue-600' />
            </Link>
        </div>
      </div>


      
      {/*Section-9*/}
      <div className='lg:flex gap-28 mt-28 justify-center'>
        <div>
          <h1 className="border border-white text-white mb-2 rounded-sm text-center font-semibold py-1 w-32">
            Low Self-Esteem
          </h1>
          <h1 className=' text-2xl lg:text-4xl font-semibold mb-3'>You are enough even if it <span className='text-blue-600 italic'>doesn’t</span> feel <br /> that way right now.</h1>
          <p className='text-lg'>Low self-esteem can make everyday decisions feel heavy, relationships feel insecure, and life feel <br /> like it’s happening without you.</p>
           <Link href={{ pathname: '/commonDetails', query: { type: 'j' } }}>
              <CgArrowTopRightO className='mt-3 text-4xl text-blue-600' />
            </Link>
        </div>

        <div>
          <Image src='/low_self.png'
            alt='profile'
            width={550}
            height={550}
          />
        </div>
      </div>

      {/*Section-10*/}
      <div style={{background: "linear-gradient(253deg, rgba(1, 41, 244, 0.20) 0%, rgba(1, 12, 74, 0.20) 100%);"}} className=' lg:h-[388px] lg:flex gap-66 mt-3 lg:mt-28 justify-center items-center'>
        <div>
          <Image src='/project-image/rectangle2.png'
            alt='profile'
            width={550}
            height={550}
          />
        </div>

        <div>
          <h1 className="border border-white text-white mb-2 rounded-sm text-center font-semibold py-1 w-32 mt-2 lg:mt-0">
            Life in General
          </h1>
          <h1 className=' text-2xl lg:text-4xl font-semibold mb-3 mt-2.5'>Sometimes, it’s just... everything.</h1>
          <p className='text-lg'>You might not have a specific diagnosis. Maybe it’s not one big issue just <br /> stress, confusion, or feeling stuck.</p>
           <Link href={{ pathname: '/commonDetails', query: { type: 'k' } }}>
              <CgArrowTopRightO className='mt-3 text-4xl text-blue-600' />
            </Link>
        </div>
      </div>

    </div>
    </div>
  )
}

export default CommonStruggles