import React from "react";
import { GoogleLogin } from "@react-oauth/google";

export const GoogleBtnBackend = () => {
  const handleLoginSuccess = async (response) => {
    const { code } = response;
    console.log("Google Sign-In response (code):", code);

    try {
      const res = await fetch(
        "https://stirring-camel-exotic.ngrok-free.app/users/auth/google/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );

      const data = await res.json();
      console.log("Backend response:", data);

      if (res.ok) {
        console.log("JWT Token:", data.access);
        if (data.access) {
          localStorage.setItem("access", data.access);
        }
        if (data.refresh) {
          localStorage.setItem("refresh", data.refresh);
        }
        window.location.href = "/chat";
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
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        flow="auth-code"
      />
    </div>
  );
};
