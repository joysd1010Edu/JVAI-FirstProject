import Header from '@/components/HomePage/HeroSection/Header'
import MentalHealthHero from '@/components/HomePage/HeroSection/MentalHealthHero/MentalHealthHero'
import React from 'react'

export const metadata = {
  title: "Home",
  description:
    "Emothrive is your trusted platform for enhancing emotional well-being through expert-curated tools, personalized support, and a nurturing digital space.",
  keywords: [
    "Emothrive",
    "mental health platform",
    "emotional support",
    "wellness tools",
    "self-care",
    "online therapy",
    "mental wellness",
    "mindfulness",
    "personal development",
  ],

};


const HomePage = () => {
  return (
    <div>
      
        <Header/>
        <MentalHealthHero/>
    </div>
  )
}

export default HomePage