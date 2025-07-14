
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAxios } from '@/providers/AxiosProvider';
import { MdVerified, MdError, MdHourglassEmpty } from 'react-icons/md';
import { HiArrowRight } from 'react-icons/hi';
import Link from 'next/link';

export default function page() {
  const [status, setStatus] = useState('verifying'); 
  const [message, setMessage] = useState('Verifying your email...');
  const [countdown, setCountdown] = useState(3);
  const params = useSearchParams();
  const router = useRouter();
  const axios = useAxios();

  useEffect(() => {
    const uid = params.get('uid');
    const token = params.get('token');

    if (!uid || !token) {
      setStatus('error');
      setMessage('Invalid verification link. Please check your email and try again.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/users/email/verify/${uid}/${token}/`);
        
        if (response.status === 200) {
          setStatus('success');
          setMessage('Email verified successfully!');
          
          // Start countdown for redirect
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                router.push('/login');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      } catch (error) {
        setStatus('error');
        if (error.response?.data?.detail) {
          setMessage(error.response.data.detail);
        } else if (error.response?.status === 400) {
          setMessage('This verification link has expired or is invalid.');
        } else {
          setMessage('Something went wrong. Please try again later.');
        }
        console.error('Email verification error:', error);
      }
    };

    verifyEmail();
  }, [params, router, axios]);

  const getIcon = () => {
    switch (status) {
      case 'verifying':
        return <MdHourglassEmpty className="text-6xl text-yellow-500 animate-pulse" />;
      case 'success':
        return <MdVerified className="text-6xl text-green-500 animate-bounce" />;
      case 'error':
        return <MdError className="text-6xl text-red-500" />;
      default:
        return <MdHourglassEmpty className="text-6xl text-yellow-500" />;
    }
  };

  const getBackgroundGradient = () => {
    switch (status) {
      case 'verifying':
        return 'from-yellow-50 to-orange-50';
      case 'success':
        return 'from-green-50 to-emerald-50';
      case 'error':
        return 'from-red-50 to-pink-50';
      default:
        return 'from-gray-50 to-blue-50';
    }
  };

  const getCardBorder = () => {
    switch (status) {
      case 'verifying':
        return 'border-yellow-200';
      case 'success':
        return 'border-green-200';
      case 'error':
        return 'border-red-200';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} flex items-center justify-center p-4`}>
      <div className={`max-w-md w-full bg-white rounded-2xl shadow-2xl border-2 ${getCardBorder()} p-8 text-center`}>
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          {getIcon()}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {status === 'verifying' && 'Email Verification'}
          {status === 'success' && 'Verification Successful!'}
          {status === 'error' && 'Verification Failed'}
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>

        {/* Success State - Countdown */}
        {status === 'success' && (
          <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700 font-medium">
              Redirecting to login in {countdown} seconds...
            </p>
            <div className="w-full bg-green-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${((3 - countdown) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {status === 'success' && (
            <Link 
              href="/login"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
            >
              Continue to Login
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}

          {status === 'error' && (
            <div className="space-y-3 flex flex-col gap-5">
              <Link 
                href="/signup"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Create New Account
              </Link>
              <Link 
                href="/login"
                className="w-full  bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Back to Login
              </Link>
            </div>
          )}

          {status === 'verifying' && (
            <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-700 text-sm">
                Please wait while we verify your email address...
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <Link href="/support" className="text-blue-500 hover:text-blue-600 font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
