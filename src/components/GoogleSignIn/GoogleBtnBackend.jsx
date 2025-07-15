import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleLogin } from "@react-oauth/google";

export const GoogleBtnBackend = () => {

  const handleLoginSuccess = async (response) => {
    const { credential } = response; 
    // This is the JWT token from Google

    console.log("Google Sign-In response:", credential);

    try {
      // Send credential to Django backend using fetch
      const res = await fetch('https://stirring-camel-exotic.ngrok-free.app/users/auth/google/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          
        },
        body: JSON.stringify({ 
          access_token: credential 
        }),
      });
      
      const data = await res.json();
      console.log("Backend response:", data);
      
      if (res.status==200|| res.status==201) {
        console.log("JWT Token:", data.access);
        
        // Save tokens to localStorage
        if (data.access) {
          localStorage.setItem('access', data.access);
        }
        if (data.refresh) {
          localStorage.setItem('refresh', data.refresh);
        }
        
        // Redirect to chat page
        window.location.href = '/chat';
      } else {
        console.error("Backend error:", data);
      }
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <div>
      {" "}
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
};
