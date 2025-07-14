"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authenticationImage from "./../../../public/authImage.png";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { AiFillGoogleCircle } from "react-icons/ai";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import Swal from "sweetalert2";
import { useAxios } from "@/providers/AxiosProvider";
import { GoogleSign } from "@/components/GoogleSignIn/GoogleSign";
import Link from "next/link";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      console.log("Access token found:", token);
      window.location.href = "/chat";
    } else {
      console.log("No access token found, user not logged in.");
    }
  }, []);

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log("Login attempt:", { email, password });

    try {
      setLoading(true);
      const response = await axios.post("/users/login/", { email, password });
      console.log("Login response:", response);

      if (response.status === 201 || response.status === 200) {
        const { access, refresh } = response.data;

        if (access) {
          localStorage.setItem("access", access);
          console.log(" Access token saved:", access);
        }

        if (refresh) {
          localStorage.setItem("refresh", refresh);
          console.log(" Refresh token saved:", refresh);
        }

        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back! You have been logged in successfully.",
          icon: "success",
          background: "#091c7c",
          color: "#ffffff",
          confirmButtonColor: "#050714",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            content: "custom-swal-content",
          },
        });

        reset();

        setTimeout(() => {
          window.location.href = "/chat";
        }, 1500);
      }
    } catch (error) {
      console.error("Login failed:", error);
      console.log(" Error response:", error.response?.data);

      let errorMessage = "Invalid email or password. Please try again.";

      if (error.response?.status === 400) {
        errorMessage =
          "Invalid credentials. Please check your email and password.";
      } else if (error.response?.status === 401) {
        errorMessage = "Unauthorized. Invalid email or password.";
      } else if (error.response?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      }

      Swal.fire({
        title: "Login Failed",
        text: errorMessage,
        icon: "error",
        background: "#091c7c",
        color: "#ffffff",
        confirmButtonColor: "#050714",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="lg:flex items-center">
        {/* Left div */}
        <div
          className="w-full md:w-1/2 md:block hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 255, 0, 0.40) 0%, rgba(10, 251, 10, 0.30) 76.04%, rgba(0, 255, 0, 0.20) 100%)",
          }}
        >
          <div className="relative w-full h-[1025px]">
            <Image
              alt="Authentication image"
              src={authenticationImage}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* Right div */}
        <div
          className="md:h-[1025px] px-10 md:w-1/2 py-60 md:py-[308px] flex justify-center items-center"
          style={{
            background: "linear-gradient(180deg, #0F1828 0%, #111111 100%)",
          }}
        >
          <div className="w-96">
            <h1 className="text-2xl text-[#F4F4F4] font-nunito font-bold mb-2 text-[26px]">
              Hello Again!
            </h1>
            <h1 className="text-[#F4F4F4] font-normal text-xl">Welcome Back</h1>
            <form
              className="mt-10 w-full text-[#4f565a]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-4 bg-white flex items-center rounded-lg">
                <CiMail className="mx-2.5" size={24} />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="py-3.5 font-normal focus:outline-none border-none w-full"
                  type="email"
                  placeholder="Email address"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mb-2 -mt-2">
                  {errors.email.message}
                </p>
              )}
              <div className="mb-4 bg-white flex items-center rounded-lg">
                <IoLockClosedOutline className="mx-2.5" size={24} />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="py-3.5 focus:outline-none font-normal border-none w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="mx-2.5 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <IoMdEyeOff size={24} className="text-gray-500" />
                  ) : (
                    <IoEye size={24} className="text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mb-2 -mt-2">
                  {errors.password.message}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#0056F6] cursor-pointer hover:bg-[#0046d6]"
                } rounded-lg w-full text-white py-3.5 mb-2 transition-colors`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <div className="flex items-center gap-3 justify-center"> <p className=" text-white font-normal">Don't have an account ?</p> <Link href={'/signup'} className=" text-primary"> Create an account</Link> </div>
              <h3 className="text-center mb-5 text-[#EEEEEE]">
                or continue with
              </h3>
            </form>
              <GoogleSign />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
