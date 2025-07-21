import React from 'react'
import Image from 'next/image'
import { MdCheck, MdClose } from 'react-icons/md'
import { DialogDemo } from '../ui/edit_profile_dialogue/dialogue'

const ProfileWithActivity = () => {
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
  const activityStatus = ['check', 'check', 'check', 'check', 'check', 'check', 'cross']

  return (
    <div className="min-h-screen bg-[#060F25] px-0 md:px-10 py-8">
      <div className="w-full space-y-6">
        {/* User Profile Card */}
        <div className="bg-[#0E1B38] rounded-none md:rounded-xl px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <Image
                src="/avater.png"
                alt="Profile"
                width={90}
                height={90}
                className="rounded-full border-4 border-blue-500"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Md Sohanur Rahman</h2>
              <p className="text-[#57A3FF] text-sm mt-1">mdsohanurhig316@gmail.com</p>
            </div>
          </div>
          <div className="flex justify-end md:justify-start">
              <DialogDemo/>
          </div>
        </div>

        {/* Activity Card */}
        <div className="bg-[#0E1B38] rounded-none md:rounded-xl px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h3 className="text-xl text-white font-semibold mb-2 sm:mb-0">Your Activity</h3>
            <span className="text-white text-sm cursor-pointer">7 Days ⌄</span>
          </div>
          <div className="flex flex-wrap justify-between sm:justify-around gap-4">
            {days.map((day, index) => {
              const isCheck = activityStatus[index] === 'check'
              return (
                <div key={day} className="flex flex-col items-center text-white text-sm">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      isCheck ? 'bg-[#197BFF]' : 'bg-[#FF4D4D]'
                    }`}
                  >
                    {isCheck ? (
                      <MdCheck className="text-white" size={20} />
                    ) : (
                      <MdClose className="text-white" size={20} />
                    )}
                  </div>
                  <span className="mt-2">{day}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileWithActivity
