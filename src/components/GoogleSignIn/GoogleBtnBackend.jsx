import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

export const GoogleBtnBackend = () => {
  // 1. We call the useGoogleLogin hook
  const login = useGoogleLogin({
    // 2. This onSuccess callback receives the access_token
    onSuccess: async (tokenResponse) => {
      console.log("Received Google access token:", tokenResponse.access_token);

      // 3. We send the access_token to our backend
      try {
        const res = await fetch(
          "http://localhost:8000/users/auth/google/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_token: tokenResponse.access_token,
            }),
          }
        );

        const data = await res.json();
        console.log("Backend response:", data);

        if (res.ok) {
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
        console.error("Error during backend request:", error);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  return (
    // 4. We create our own button to trigger the login function
    <button
      onClick={() => login()}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google icon"
        style={{ width: '20px', height: '20px' }}
      />
      Sign in with Google
    </button>
  );
};
