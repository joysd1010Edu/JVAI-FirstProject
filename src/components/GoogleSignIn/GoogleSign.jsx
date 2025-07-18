"use client";
import React, { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AiFillGoogleCircle } from "react-icons/ai";

export const GoogleSign = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    
    if (session?.backendTokens) {
      try {
        // Store backend tokens
        if (session.backendTokens.access) {
          localStorage.setItem('access', session.backendTokens.access);
        }
        if (session.backendTokens.refresh) {
          localStorage.setItem('refresh', session.backendTokens.refresh);
        }
        
        // Store user data
        if (session.backendTokens.user) {
          localStorage.setItem('user', JSON.stringify(session.backendTokens.user));
        }
        
      } catch (error) {
        console.error('Error storing tokens to localStorage:', error);
      }
    }
  }, [session]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', {
        callbackUrl: '/chat', 
        redirect: false, 
      });
      
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      // Clear localStorage tokens
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
      
      await signOut({ callbackUrl: '/login' });
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  if (status === "loading") {
    return (
      <button className="bg-gray-300 rounded-lg w-full flex justify-center items-center py-3.5 cursor-not-allowed mb-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
        <p className="ml-2">Loading...</p>
      </button>
    );
  }

  if (session) {

    return (
      <div className="text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>Signed in as {session.user?.email}</p>
          <p className="text-sm">Welcome, {session.user?.name}!</p>
        </div>
        <button 
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-600 text-white rounded-lg w-full py-3.5 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleGoogleSignIn}
      className="bg-white hover:bg-gray-50 rounded-lg w-full flex justify-center items-center py-3.5 cursor-pointer mb-4 border border-gray-200 transition-colors"
    >
      <AiFillGoogleCircle color="#0056F6" size={26} className="mx-2.5" />
      <p className="text-gray-700 font-medium">Continue with Google</p>
    </button>
  );
};
