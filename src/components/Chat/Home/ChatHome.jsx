import { Input } from '@/components/ui/input'
import React from 'react'
import { MdArrowUpward, MdOutlineKeyboardVoice } from 'react-icons/md'

const ChatHome = () => {
  return (
     <main className="h-screen w-full bg-gradient-radial from-[#00062780] to-[#111111] flex items-center justify-center bg-[#111111]">
      <div className="text-center text-white">
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
    className="py-8 pr-20 bg-[#FFFFFF33] w-full"
    type="email"
    placeholder="Start typing here..."
  />
  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4 text-2xl text-gray-800">
    <MdOutlineKeyboardVoice className="cursor-pointer text-white" />
    <MdArrowUpward className="bg-gray-400 text-white rounded-sm p-1 cursor-pointer" />
  </div>
</div>

      </div>
    </main>
  )
}

export default ChatHome

