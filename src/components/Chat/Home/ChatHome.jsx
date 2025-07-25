import ProfileWithActivity from '@/components/Profile/ProfileWithActivity'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'
import { MdArrowUpward, MdOutlineKeyboardVoice } from 'react-icons/md'

const ChatHome = () => {
  return (
    <div>
      <div className='flex justify-end mt-10 '>
           
            <Dialog>
        <DialogTrigger asChild>
          <Image className='rounded-full cursor-pointer ' src={"/avater.png"} alt='Profile_Image' width={50} height={50}/>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1075px] h-[550px] overflow-y-auto bg-blue-950 [&>button]:text-white">
          <DialogHeader>
            <DialogTitle>
              <h1 className='text-center text-2xl font-bold text-white mb-6'>Edit Profile:</h1>
              <ProfileWithActivity/>
            </DialogTitle>
          </DialogHeader>

          
        </DialogContent>
      </Dialog>
      </div>









 <main className="mt-72 w-full bg-gradient-radial  flex items-center justify-center ">
      <div className="text-center text-white ">
        <h1 className="text-3xl font-bold text-[#0059FF] ">
          Emothrive Your AI Therapist      
           </h1>
        <p className="mt-4 text-[#F9F9F9] mb-6 text-2xl">
          I'm Emothrive, your AI Guide to Better Mental Health.
          <br />
          <span className="text-[#C5C5C5] text-xl ">What do you want to talk about?</span>
        </p>
        <div className="relative w-full">
  <Input
    className="py-8 pr-20 bg-[#FFFFFF33] w-[950px]"
    type="text"
    placeholder="Start typing here..."
  />
  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4 text-2xl text-gray-800">
    {/* <MdOutlineKeyboardVoice className="cursor-pointer text-white" /> */}
    <MdArrowUpward className="bg-gray-400 text-white rounded-sm p-1 cursor-pointer" />
  </div>
</div>

      </div>
    </main>
    </div>
    
  )
}

export default ChatHome

