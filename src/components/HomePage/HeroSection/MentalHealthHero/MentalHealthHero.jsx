import Image from "next/image";
import React from "react";

const MentalHealthHero = () => {
  return (
    <div className=" bg-black">
      <marquee className="mt-[20px]">
        <div className="flex gap-8 text-primary text-xl font-bold justify-center">
          <li>CHILD COUNSELLING</li>
          <li>FAMILY COUNSELLING</li>
          <li>INDIVIDUAL COUNSELLING</li>
          <li>CHILD COUNSELLING</li>
          <li>COUPLE COUNSELLING</li>
          <li>FAMILY COUNSELLING</li>
        </div>
      </marquee>
      <div className="flex justify-center mt-24">
        <h1 className="text-white border border-white rounded-sm w-32 text-center">
          How We Work
        </h1>
      </div>
      <h1 className="text-center text-white font-bold text-4xl mt-8">
        Nurture Your Mental <span className="italic font-playfair text-[#0056F6]">Health</span> the Holistic Way
      </h1>
      {/*Card*/}
      <div className="mt-[60px] lg:flex lg:gap-6 justify-center">
        <div className=" text-white lg:w-[424px] h-[267px] hover:text-black py-11 px-6 border-1 border-[#76A6FF] hover:bg-[#76A6FF] rounded-xl text-center transition duration-300 mb-2">
          <h1 className="font-bold text-xl">Step 1</h1>
          <h1 className="font-bold text-xl mt-7 mb-5">Choose Your Concern</h1>
          <p>
            Choose a concern to begin your journey toward healing and self-discovery.
          </p>
        </div>
        <div className=" text-white lg:w-[424px] h-[267px] hover:text-black py-11 px-6 border-1 border-[#76A6FF] hover:bg-[#76A6FF] rounded-xl text-center transition duration-300 mb-2">
          <h1 className="font-bold text-xl">Step 1</h1>
          <h1 className="font-bold text-xl mt-7 mb-5">Chat or Speak with AI Therapist</h1>
          <p>
           Choose to chat or speak openly with your AI mental health companion.
          </p>
        </div>
        <div className=" text-white lg:w-[424px] h-[267px] hover:text-black py-11 px-6 border-1  rounded-xl text-center  border-[#76A6FF] hover:bg-[#76A6FF] transition duration-300">
          <h1 className="font-bold text-xl">Step 1</h1>
          <h1 className="font-bold text-xl mt-7 mb-5">Track Progress & Get Daily Guidance</h1>
          <p>
           Monitor your emotional growth over time and receive daily tips to stay on track.
          </p>
        </div>
      </div>
      {/*Video*/}
      <div className="mt-[120px] flex justify-center">
        <Image
          src="/project-image/video.png"
          width={1320}
          height={632}
          alt="Video"
        />
      </div>
    </div>
  );
};

export default MentalHealthHero;
