"use client";
import React, { createContext, useContext } from 'react';
import axios from 'axios';

// Set a default backend URL if the environment variable is not set
const backendUrl = process.env.NEXT_PUBLIC_API_URL_BACKEND || 'https://stirring-camel-exotic.ngrok-free.app';

console.log('Using backend URL:', backendUrl);

const axiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: 15000, // Increased timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // For debugging
    console.log('Making request to:', `${config.baseURL}${config.url}`);
    console.log('Request headers:', config.headers);
    
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    console.log('Response headers:', response.headers);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

const AxiosContext = createContext(null);

export const AxiosProvider = ({ children }) => {
  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error('useAxios must be used within an AxiosProvider');
  }
  return context;
};

export default axiosInstance;
