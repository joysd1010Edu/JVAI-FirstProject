"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAxios } from "@/providers/AxiosProvider";
import authenticationImage from "./../../../public/authImage.png";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { AiFillGoogleCircle } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import Swal from "sweetalert2";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios(); // Get axios instance from context

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const commonPasswords = [
    "password",
    "123456",
    "123456789",
    "qwerty",
    "abc123",
    "password123",
    "admin",
    "letmein",
    "welcome",
    "monkey",
    "1234567890",
    "password1",
  ];

  const password = watch("password", "");

  const validatePassword = (passwordValue) => {
    if (!passwordValue) return true;

    const errors = [];

    if (passwordValue.length < 8) {
      errors.push(
        "This password is too short. It must contain at least 8 characters."
      );
    }

    if (/^\d+$/.test(passwordValue)) {
      errors.push("This password is entirely numeric.");
    }

    if (commonPasswords.includes(passwordValue.toLowerCase())) {
      errors.push("This password is too common.");
    }

    return errors.length === 0 ? true : errors.join(" | ");
  };

  const onSubmit = async () => {

    const formData = watch();
    const user={
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirm: formData.confirmPassword,
    }
     console.log("User Data:", user);
     setLoading(true);
    try {
      const response = await axios.post("/users/register/", user); 
      if (response.status === 201||response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Account created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.detail || "Registration failed.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }

   
  };

  return (
    <div>
      <div className="lg:flex items-center ">
        {/* Left div */}
        <div
          className="w-full md:w-1/2 md:block hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 255, 0, 0.40) 0%, rgba(10, 251, 10, 0.30) 76.04%, rgba(0, 255, 0, 0.20) 100%)",
          }}
        >
          <Image
            alt="Authentication image"
            className="w-full  md:h-[1025px] "
            src={authenticationImage}
            priority
          />
        </div>

        <div
          className="md:h-[1025px] px-10   md:w-1/2 py-60 md:py-[308px] flex justify-center items-center"
          style={{
            background: "linear-gradient(180deg, #0F1828 0%, #111111 100%)",
          }}
        >
          <div className="w-96 ">
            <h1 className="text-2xl text-[#F4F4F4] font-nunito font-bold mb-2 text-[26px]">
              Hello!
            </h1>
            <h1 className="text-[#F4F4F4] font-normal text-xl">
              Sign Up to Get Started
            </h1>
            <form
              className="mt-10 w-full text-[#4f565a]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-4 bg-white flex items-center rounded-lg">
                <HiOutlineUserCircle className="mx-2.5" size={24} />
                <input
                  {...register("name", { required: "Name is required" })}
                  className="py-3.5 focus:outline-none font-normal border-none w-full "
                  type="text"
                  placeholder="Name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mb-2 -mt-2">
                  {errors.name.message}
                </p>
              )}

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
                  className="py-3.5 focus:outline-none font-normal border-none w-full "
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
                    validate: validatePassword,
                  })}
                  className="py-3.5 focus:outline-none font-normal border-none w-full "
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="mx-2.5 focus:outline-none"
                >
                  {showPassword ? (
                    <IoMdEyeOff size={24} className="text-gray-500" />
                  ) : (
                    <IoEye size={24} className="text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="mb-4">
                  {errors.password.message.split(" | ").map((error, index) => (
                    <p key={index} className="text-red-500 text-sm mb-1">
                      {error}
                    </p>
                  ))}
                </div>
              )}

              <div className="mb-4 bg-white flex items-center rounded-lg">
                <IoLockClosedOutline className="mx-2.5" size={24} />
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => {
                      const currentPassword = watch("password");
                      return (
                        value === currentPassword || "Passwords do not match"
                      );
                    },
                  })}
                  className="py-3.5 focus:outline-none font-normal border-none w-full "
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="mx-2.5 focus:outline-none"
                >
                  {showPassword ? (
                    <IoMdEyeOff size={24} className="text-gray-500" />
                  ) : (
                    <IoEye size={24} className="text-gray-500" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mb-2 -mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#0056F6] cursor-pointer hover:bg-[#0046d6]"
                } rounded-lg w-full text-white py-3.5 mb-5 transition-colors`}
              >
                {loading ? "Creating Account..." : "Sign up"}
              </button>
              <h3 className="text-center mb-5 text-[#EEEEEE]">
                or continue with
              </h3>
              <button className="bg-white rounded-lg w-full flex justify-center items-center  py-3.5 cursor-pointer mb-4">
                <AiFillGoogleCircle
                  color="#0056F6"
                  size={26}
                  className=" mx-2.5 "
                />{" "}
                <p>Continue with Google</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
