"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { useAxios } from '@/providers/AxiosProvider';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-b from-[#010C4A] to-black text-white flex items-center justify-center p-4">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mb-4"></div>
      <p className="text-xl text-[#C5C5C5]">Loading payment verification...</p>
    </div>
  </div>
);

// Main payment success component
const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');
  const axios = useAxios();
  const [verificationStatus, setVerificationStatus] = useState('pending'); // 'pending', 'success', 'failed'


  useEffect(() => {
  if (session_id) {
    let attempts = 0;
    const maxAttempts = 5;

    const interval = setInterval(async () => {
      try {
        const response = await axios.post('/api/subscriptions/verify-subscription/', { session_id });

        if (response.status === 200) {
          clearInterval(interval); // Stop retrying
          setVerificationStatus('success');
        } else {
          attempts++;
          if (attempts >= maxAttempts) {
            clearInterval(interval);
            setVerificationStatus('failed');
          }
        }
      } catch (error) {
        console.error('Error verifying session:', error);
        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          setVerificationStatus('failed');
        }
      }
    }, 2000); // Retry every 2 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  } else {
    setVerificationStatus('failed');
  }
}, [session_id]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010C4A] to-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-[#001742] rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#0056F6] to-[#3179FF] p-8 flex justify-center">
          {verificationStatus === 'pending' ? (
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
          ) : verificationStatus === 'failed' ? (
            <div className="text-red-500 text-7xl">❌</div>
          ) : (
            <FaCheckCircle className="text-white text-7xl" />
          )}
        </div>

        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {verificationStatus === 'pending'
              ? 'Verifying Payment...'
              : verificationStatus === 'failed'
              ? 'Payment Verification Issue'
              : 'Payment Successful!'}
          </h1>

          {verificationStatus === 'pending' ? (
            <p className="mb-8 text-xl">
              Please wait while we confirm your payment...
            </p>
          ) : verificationStatus === 'failed' ? (
            <p className="mb-8 text-xl text-red-400">
              There was an issue verifying your payment. Don't worry, please contact support to resolve this.
            </p>
          ) : (
            <p className="mb-8 text-xl">
              Thank you for choosing our services! Your mental health journey begins now.
            </p>
          )}

          <div className="flex flex-col gap-4">
            {verificationStatus === 'pending' ? (
              <button
                disabled
                className="bg-gray-500 py-3 px-6 rounded-md font-medium text-white cursor-not-allowed"
              >
                Processing...
              </button>
            ) : verificationStatus === 'failed' ? (
              <button
                onClick={() => window.location.reload()}
                className="bg-primary py-3 px-6 rounded-md font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            ) : (
              <Link
                href="/chat"
                className="bg-primary py-3 px-6 rounded-md font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Start Your Therapy Session
              </Link>
            )}

            <Link
              href="/"
              className="text-gray-300 hover:text-primary underline transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
