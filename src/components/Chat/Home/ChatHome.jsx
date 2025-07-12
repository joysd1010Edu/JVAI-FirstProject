import React from 'react'

const ChatHome = () => {
  return (
    <main className="h-screen w-full bg-gradient-radial from-[#00062780] to-[#111111] flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-3xl font-bold text-[#4285F4]">
          welcome to emothrive       
           </h1>
        <p className="mt-4 text-gray-300">
          I'm Emothrive, your AI Guide to Better Mental Health.
          <br />
          <span className="text-[#4285F4]">Let's start your journey to wellness!</span>
        </p>
      </div>
    </main>
  )
}

export default ChatHome

