'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAxios } from '@/providers/AxiosProvider';
import { MdVerified, MdError, MdHourglassEmpty } from 'react-icons/md';
import Link from 'next/link';

function VerifyContent() {
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
      setStatus('check-email');
      setMessage('Please check your email to get the verification link.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/users/email/verify/${uid}/${token}/`);
        console.log('Email verification response:', response.data);
        if (response.status === 200) {
          setStatus('success');
          setMessage('Email verified successfully!');

          localStorage.setItem('access', response.data.access);
          localStorage.setItem('refresh', response.data.refresh);
          
          router.push('/chat'); // Redirect to login after successful verification
          
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
      case 'check-email':
        return <MdHourglassEmpty className="text-6xl text-blue-500" />;
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
      case 'check-email':
        return 'from-blue-50 to-indigo-50';
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
      case 'check-email':
        return 'border-blue-200';
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
          {status === 'check-email' && 'Verify Your Mail'}
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>

        {/* Success State */}
        {status === 'success' && (
          <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700 font-medium">
              Your email has been successfully verified!
            </p>
            <p className="text-green-600 text-sm mt-1">
              You can now proceed to login with your credentials.
            </p>
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
            </Link>
          )}

          {status === 'check-email' && (
            <a 
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Visit Gmail
            </a>
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

export default function page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border-2 border-yellow-200 p-8 text-center">
          <div className="mb-6 flex justify-center">
            <MdHourglassEmpty className="text-6xl text-yellow-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Loading...</h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Please wait while we load the verification page...
          </p>
        </div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
