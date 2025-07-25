import About_Us from '@/components/AboutUs/About_Us'
import React from 'react'

export const metadata = {
  title: "About Us",
  description:
    "Learn about Emothrive's mission to support emotional well-being through personalized tools, expert resources, and a compassionate community.",
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
        <About_Us/>
    </div>
  )
}

export default Page