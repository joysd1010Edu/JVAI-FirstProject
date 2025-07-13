"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import authenticationImage from './../../../public/authImage.png'
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { AiFillGoogleCircle } from "react-icons/ai";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import Swal from "sweetalert2";                                                                                                                                                     , 


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        const { email, password } = data;
        
        try {
            setLoading(true);
            
            // Simulate API call for login
            console.log("Login attempt:", { email, password });
            
            // Here you would make your actual login API call
            // const response = await userService.login({ email, password });
            
            // Simulate successful login
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            Swal.fire({
                title: "Login Successful!",
                text: `Welcome back!`,
                icon: "success",
                background: "#091c7c",
                color: "#ffffff",
                confirmButtonColor: "#050714",
                customClass: {
                    popup: 'custom-swal-popup',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content'
                }
            });
            
            // Reset form after successful login
            reset();
            
            // Redirect to dashboard or home page
            // window.location.href = '/dashboard';
            
        } catch (error) {
            console.error("Login failed:", error);
            
            Swal.fire({
                title: "Login Failed",
                text: "Invalid email or password. Please try again.",
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
            <div className='lg:flex items-center '>
                {/* Left div */}
                <div
                    className='w-full md:w-1/2 md:block hidden'
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(0, 255, 0, 0.40) 0%, rgba(10, 251, 10, 0.30) 76.04%, rgba(0, 255, 0, 0.20) 100%)',
                    }}
                >
                    <Image alt='Authentication image' className='w-full  md:h-[1025px] '  src={authenticationImage}/>
                </div>

                {/* Right div */}

                <div className='md:h-[1025px] px-10 md:w-1/2 py-60 md:py-[308px] flex justify-center items-center'
                    style={{
                        background: 'linear-gradient(180deg, #0F1828 0%, #111111 100%)',
                    }}
                >
                    <div className='w-96 '>
                        <h1 className='text-2xl text-[#F4F4F4] font-nunito font-bold mb-2 text-[26px]'>Hello Again!</h1>
                        <h1 className='text-[#F4F4F4] font-normal text-xl'>Welcome Back</h1>
                        <form className='mt-10 w-full text-[#4f565a]' onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-4 bg-white flex items-center rounded-lg'>
                                <CiMail className='mx-2.5' size={24} />
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    className='py-3.5 font-normal focus:outline-none border-none w-full '
                                    type='email'
                                    placeholder='Email address'
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mb-2 -mt-2">{errors.email.message}</p>
                            )}
                            
                            <div className='mb-4 bg-white flex items-center rounded-lg'>
                                <IoLockClosedOutline className='mx-2.5' size={24} />
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    className='py-3.5 focus:outline-none font-normal border-none w-full '
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                />
                                <button 
                                    type='button'
                                    onClick={togglePasswordVisibility}
                                    className='mx-2.5 focus:outline-none'
                                >
                                    {showPassword ? (
                                        <IoMdEyeOff size={24} className='text-gray-500' />
                                    ) : (
                                        <IoEye size={24} className='text-gray-500' />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mb-2 -mt-2">{errors.password.message}</p>
                            )}
                            
                            <button 
                                type='submit' 
                                disabled={loading}
                                className={`${
                                    loading 
                                        ? 'bg-gray-500 cursor-not-allowed' 
                                        : 'bg-[#0056F6] cursor-pointer hover:bg-[#0046d6]'
                                } rounded-lg w-full text-white py-3.5 mb-5 transition-colors`}
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                            <h3 className='text-center mb-5 text-[#EEEEEE]'>or continue with</h3>
                            <button  className='bg-white rounded-lg w-full flex justify-center items-center  py-3.5 cursor-pointer mb-4'>
                               <AiFillGoogleCircle color='#0056F6' size={26} className=' mx-2.5 '/> <p>Continue with Google</p>
                            </button>
                           
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
