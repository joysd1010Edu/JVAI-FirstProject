"use client";
import Image from "next/image";
import React, {  useEffect, useRef, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useAxios } from "@/providers/AxiosProvider";


export const priceRefExport = {current: null};

// Helper function for better scrolling
const scrollToElement = (element) => {
  if (!element) return;
  
  // Try smooth scrolling first
  try {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } catch (error) {
    //for browsers that don't support smooth scrolling
    const y = element.getBoundingClientRect().top + window.pageYOffset - 80; // 80px offset for any headers
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
};

const Ratting = () => {
  const axios = useAxios();
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const priceRef = useRef(null);

  const fetchPlans = async () => {
    const normal = await fetch('http://10.10.12.53:8000/api/subscriptions/plans/');
    const data = await normal.json();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/subscriptions/plans/");

      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setError(error.message || "Failed to fetch plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchPlans();
    priceRefExport.current = priceRef.current;
  }, []);

  // Effect to handle scrolling to the pricing section
  useEffect(() => {
    const checkAndScroll = () => {
      
      const shouldScroll = localStorage.getItem('scrollToPricing') === 'true';
      
      // Check for URL hash (alternative method)
      const urlHash = window.location.hash;
      const hasHashTarget = urlHash === '#pricing' || urlHash === '#pricing-section';
      
      
      if (shouldScroll || hasHashTarget) {
        // Give time for the component to fully render
        const timer = setTimeout(() => {
          if (priceRef.current) {
            scrollToElement(priceRef.current);
          } else {
            // Try to find the element by ID as a fallback
            const pricingSection = document.getElementById('pricing-section');
            if (pricingSection) {
              scrollToElement(pricingSection);
            }
          }
          // Clear the flag after scrolling
          localStorage.removeItem('scrollToPricing');
        }, 800);
        
        return timer;
      }
      return null;
    };
    
    const timerId = checkAndScroll();
    
    // Also listen for popstate events (browser back/forward)
    const handlePopState = () => {
      checkAndScroll();
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      if (timerId) clearTimeout(timerId);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  // Update exported ref when the internal ref changes and also check for scroll after plans loaded
  useEffect(() => {
    if (priceRef.current) {
      priceRefExport.current = priceRef.current;
      
      // Check if we still need to scroll (in case the first attempt failed)
      const shouldScroll = localStorage.getItem('scrollToPricing') === 'true';
      if (shouldScroll) {
        const timer = setTimeout(() => {
          scrollToElement(priceRef.current);
          localStorage.removeItem('scrollToPricing');
        }, 500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [plans]);
  

  const handlePlanClick = async (planId) => {
    const res = await axios.post(
      `/api/subscriptions/create-checkout-session/`,
      { plan_id: planId }
    );

    if (res.status === 200) {
      window.location.href = res.data.url;
    }
  };

  // For testing the scroll functionality
  const scrollToPricing = () => {
    if (priceRef.current) {
      scrollToElement(priceRef.current);
    }
  };

  return (
    <div className=" bg-black lg:px-16 px-5">
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
      <div id="pricing-section">
        <div className="flex justify-center mt-24">
          <h1 className="text-white border border-white rounded-sm w-32 text-center">
            Our Pricing Plans
          </h1>
        </div>
        <h1 className="text-center mt-7 text-4xl font-bold">
          Accessible <span className="italic text-primary">therapy</span> for
          every mind
        </h1>

        <div 
          ref={priceRef}
          id="pricing-container"
          className="mt-16 pb-20 lg:pb-30 lg:flex-row flex flex-col gap-6 justify-center"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative w-24 h-24">
                <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <div
                  className="absolute top-2 left-2 right-2 bottom-2 border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent rounded-full animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "1s",
                  }}
                ></div>
                <div
                  className="absolute top-4 left-4 right-4 bottom-4 border-4 border-t-transparent border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"
                  style={{ animationDuration: "1.5s" }}
                ></div>
              </div>
              <p className="mt-4 text-white text-lg">
                Loading pricing plans...
              </p>
            </div>
          ) : error ? (
            <div className="bg-[#001742] p-8 rounded-xl text-center">
              <p className="text-red-400 mb-2">Unable to load plans</p>
              <p className="text-gray-400 text-sm mb-4">{error}</p>
              <button
                onClick={() => fetchPlans()}
                className="bg-primary px-6 py-2 rounded text-white"
              >
                Retry
              </button>
            </div>
          ) : (
            plans &&
            plans.map((plan, index) => (
              <div
                key={plan.id}
                className="lg:w-[424px] relative hover:border-white border-transparent duration-300 border-2 min-h-[520px] bg-[#001742] rounded-xl flex flex-col justify-between p-6"
              >
                
                <div>
                  <h1 className="lg:mt-8 text-[#3179FF] text-3xl text-center">
                    {plan.name}
                  </h1>
                  <h3 className="mt-2.5 text-xl text-white text-center">
                    {plan.description}
                  </h3>

                  {plan.recommended && (
                    <div className="absolute top-0 right-0 py-2.5 px-2.5 rounded-bl-xl rounded-tr-xl bg-[#216FFF]">
                      Recommended
                    </div>
                  )}

                  {plan.features.length > 0 &&
                    plan?.features?.split("\\n").map((feature, index) => (
                      <div
                        key={index}
                        className="flex gap-1.5 items-center py-3 ml-12"
                      >
                        <FaCheck className="text-[#216FFF] font-bold text-xl" />
                        <h3 className="text-white">{feature}</h3>
                      </div>
                    ))}

                  <div className="flex gap-1.5 items-center mt-5 ml-12">
                    <FaCheck className="text-[#216FFF] font-bold text-xl" />
                    <h3 className="text-white">
                      Validity - {plan.duration_days} days
                    </h3>
                  </div>
                </div>

                
                <div className="mt-8">
                  <h1 className="text-center text-white font-bold text-xl mb-4">
                    {plan.price} $
                  </h1>
                  <button
                    onClick={() => handlePlanClick(plan.id)}
                    className="flex justify-center text-white bg-primary cursor-pointer rounded mx-auto w-2/3 py-1.5"
                  >
                    Choose this plan
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Ratting;
export { Ratting };
