import Login from '@/components/Login/Login'
import React from 'react'

export const metadata = {
  title: "Login",
  description:
    "Access your Emothrive account to explore personalized mental wellness tools, track progress, and connect with supportive resources.",
  keywords: [
    "Emothrive login",
    "user login",
    "mental health platform access",
    "account login",
    "wellness dashboard",
    "secure login",
    "emotional support tools"
  ],

};


const page = () => {
  return (
    <div>
        <Login/>
    </div>
  )
}

export default page