"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useAxios } from "@/providers/AxiosProvider";
import { set } from "react-hook-form";

const Ratting = () => {
  const axios = useAxios();
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      setError(null);

      // Approach 1: Using fetch API
      try {
        console.log("Fetching with native fetch API...");
        const response = await fetch(
          "http://localhost:8000/api/subscriptions/plans/",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            // Add these options to handle potential CORS issues
            mode: "cors",
            cache: "no-cache",
          }
        );

        console.log("Fetch response status:", response.status);
        const data = await response.json();
        console.log("Fetch response data:", data);

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        setPlans(data);
        setLoading(false);
        return; // Exit if successful
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        
      }

   
    };

    fetchPlans();
  }, [axios]);

  console.log("Current plans state:", plans);

  return (
    <div className=" bg-black">
      {/* Debug section - you can remove this later */}

      <div className="p-4 mx-auto max-w-4xl bg-gray-900 rounded-lg">
        <h2 className="text-white text-xl mb-2">API Debug:</h2>
        <div className="mb-2">
          <span className="text-white">
            Status: {loading ? "Loading..." : error ? "Error" : "Success"}
          </span>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <pre className="text-xs text-gray-300 bg-gray-800 p-2 rounded overflow-auto max-h-40">
          {plans ? JSON.stringify(plans, null, 2) : "No data yet"}
        </pre>
      </div>

      <div className="flex justify-center pt-32">
        <div className="w-48 h-7 flex justify-center items-center">
          <h1 className="text-primary border border-primary px-5 py-0.5 rounded-sm text-center">
            What People Say
          </h1>
        </div>
      </div>
      <h1 className="text-center mt-7 text-4xl font-bold">
        Every session matters. Every story counts. <br /> Experience{" "}
        <span className="text-primary italic font-playfair">safespace</span>{" "}
        impact.
      </h1>
      <div className="mt-16">
        {/*Card*/}
        <div className="mt-[60px] lg:flex lg:gap-6 justify-center">
          <div className="lg:w-[424px] text-black h-[267px] py-11 px-6 border-1 border-[#76A6FF] rounded-xl text-center bg-[#76A6FF] transition duration-300 mb-2">
            <Image
              src="/project-image/ratting1.png"
              alt="profile"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h1 className="font-bold text-xl mt-5 mb-3">Robert Fox</h1>
            {/*Star Icon*/}
            <div className="flex justify-center mb-3">
              <MdOutlineStar className="text-xl text-primary" />
              <MdOutlineStar className="text-xl text-primary" />
              <MdOutlineStar className="text-xl text-primary" />
              <MdOutlineStar className="text-xl text-primary" />
              <MdOutlineStar className="text-xl text-primary" />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur. Euismod sit et arcu amet
              sed ultrices quam.
            </p>
          </div>
          <div className="lg:w-[424px] h-[267px] text-black py-11 px-6 border-1 border-[#76A6FF] rounded-xl text-center bg-[#76A6FF] transition duration-300 mb-2">
            <Image
              src="/project-image/ratting2.png"
              alt="profile"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h1 className="font-bold text-xl mt-5 mb-3">Devon Lane</h1>
            {/*Star Icon*/}
            <div className="flex justify-center mb-3">
              <MdOutlineStar className="text-xl text-primary" />
              <MdOutlineStar className="text-xl text-primary" />
              <MdOutlineStar className="text-xl text-primary" />
              <MdOutlineStar className="text-xl text-primary" />
              <MdOutlineStar className="text-xl text-primary" />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur. Euismod sit et arcu amet
              sed ultrices quam.
            </p>
          </div>
          <div className="lg:w-[424px] h-[267px] py-11 text-black px-6 border-1 border-[#76A6FF] rounded-xl text-center bg-[#76A6FF] transition duration-300">
            <Image
              src="/project-image/ratting3.png"
              alt="profile"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h1 className="font-bold text-xl mt-5 mb-3">Courtney Henry</h1>
            {/*Star Icon*/}
            <div className="flex justify-center mb-3">
              <MdOutlineStar className="text-xl text-primary" />
              <MdOutlineStar className="text-xl text-primary" />
              <MdOutlineStar className="text-xl text-primary" />
              <MdOutlineStar className="text-xl text-primary" />
              <MdOutlineStar className="text-xl text-primary" />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur. Euismod sit et arcu amet
              sed ultrices quam.
            </p>
          </div>
        </div>
      </div>

      {/*Our Pricing Plans*/}
      <div>
        <div className="flex justify-center mt-24">
          <h1 className="text-white border border-white rounded-sm w-32 text-center">
            Our Pricing Plans
          </h1>
        </div>
        <h1 className="text-center mt-7 text-4xl font-bold">
          Accessible{" "}
          <span className="italic text-primary">therapy</span> for every mind
        </h1>

        <div className="mt-16 pb-20 lg:pb-30 lg:flex lg:gap-6 justify-center">
          <div className="lg:w-[424px] hover:border-white border-transparent duration-300 border-2 min-h-[520px] bg-[#001742] rounded-xl">
            <h1 className=" lg:mt-12 text-[#3179FF] text-3xl text-center">
              {" "}
              Basic Plan
            </h1>
            <h3 className="mt-2.5 text-xl text-white text-center">
              Casual users needing regular suppor
            </h3>

            <div className="flex gap-1.5 items-center mt-12 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">Unlimited AI text-based sessions</h3>
            </div>

            <div className="flex gap-1.5 items-center mt-5 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">Emotion-aware AI responses</h3>
            </div>

            <div className="flex gap-1.5 items-center mt-5 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">
                Personalized mental health insights
              </h3>
            </div>

            <div className="flex gap-1.5 items-center mt-5 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">
                Guided meditations & calming audios
              </h3>
            </div>

            <div className="flex gap-1.5 items-center mt-5 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">Validity - 7 days</h3>
            </div>
            <h1 className="text-center text-white font-bold text-xl mt-12">
              $19
            </h1>
            <div className="flex justify-center mt-4">
              <button className="text-white bg-primary cursor-pointer rounded px-24 py-1.5">
                Choose this plan
              </button>
            </div>
          </div>

          <div className="lg:w-[424px] relative min-h-[520px] hover:border-white border-transparent duration-300 border-2 bg-[#001742] rounded-xl">
            <h1 className="mt-12 text-[#3179FF] text-3xl text-center">
              Standard Plan
            </h1>
            <h3 className="mt-2.5 text-xl text-white text-center">
              Casual users needing regular suppor
            </h3>

            <div className=" absolute top-0 right-0 py-2.5 px-2.5 rounded-bl-xl rounded-tr-xl bg-[#216FFF]">
              Recommended
            </div>

            <div className="flex gap-1.5 items-center mt-12 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">Unlimited AI text-based sessions</h3>
            </div>

            <div className="flex gap-1.5 items-center mt-5 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">Emotion-aware AI responses</h3>
            </div>

            <div className="flex gap-1.5 items-center mt-5 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">
                Personalized mental health insights
              </h3>
            </div>

            <div className="flex gap-1.5 items-center mt-5 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">
                Guided meditations & calming audios
              </h3>
            </div>

            <div className="flex gap-1.5 items-center mt-5 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">Validity - 7 days</h3>
            </div>
            <h1 className="text-center text-white font-bold text-xl mt-12">
              $19
            </h1>
            <div className="flex justify-center mt-4">
              <button className="text-white bg-primary cursor-pointer rounded px-24 py-1.5">
                Choose this plan
              </button>
            </div>
          </div>

          <div className="lg:w-[424px] min-h-[520px] hover:border-white border-transparent duration-300 border-2 bg-[#001742] rounded-xl">
            <h1 className="mt-12 text-[#3179FF] text-3xl text-center">
              Premium Plan
            </h1>
            <h3 className="mt-2.5 text-xl text-white text-center">
              Casual users needing regular suppor
            </h3>

            <div className="flex gap-1.5 items-center mt-12 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">Unlimited AI text-based sessions</h3>
            </div>

            <div className="flex gap-1.5 items-center mt-5 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">Emotion-aware AI responses</h3>
            </div>

            <div className="flex gap-1.5 items-center mt-5 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">
                Personalized mental health insights
              </h3>
            </div>

            <div className="flex gap-1.5 items-center mt-5 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">
                Guided meditations & calming audios
              </h3>
            </div>

            <div className="flex gap-1.5 items-center mt-5 ml-12">
              <FaCheck className="text-[#216FFF] font-bold text-xl" />
              <h3 className="text-white">Validity - 7 days</h3>
            </div>
            <h1 className="text-center text-white font-bold text-xl mt-12">
              $19
            </h1>
            <div className="flex justify-center mt-4">
              <button className="text-white bg-primary cursor-pointer rounded px-24 py-1.5">
                Choose this plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratting;
