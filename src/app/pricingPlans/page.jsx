

import Ratting from '@/components/HomePage/RattingSection/Ratting';
import React from 'react'

export const metadata = {
  title: "Our Pricing Plans",
  description:
    "Pricing summery for Emothrive's mental health services, offering affordable plans tailored to individual needs. Explore our options for personalized support.",
  keywords: [
    "Emothrive",
    "About Emothrive",
    "mental health",
    "emotional well-being",
    "self-care platform",
    "wellness tools",
    "personal growth",
  ],
  icons: {
    icon: "/favicon.png",
  },
};


const Page = () => {
  return (
    <div>
       <Ratting/>
    </div>
  )
}

export default Page
