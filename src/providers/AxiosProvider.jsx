"use client";
import  { createContext, useContext } from 'react';
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://10.10.12.53:8000', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    
    const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
    }
    
    // Add current local time to every request
    if (typeof window !== 'undefined') {
      const localTime = new Date().toLocaleDateString();
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Send time data as headers to the backend
      config.headers['X-Local-Time'] = localTime;
      config.headers['X-Timezone'] = userTimezone;
    }
    
    if (config.url && !config.url.startsWith('http') && config.url.startsWith('/api')) {
      
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
    return response;
  },
  (error) => {
    
    console.error('Response error:', error);
    if (error.request && !error.response) {
      console.error('Network error detected - no response received');
    }
    
    
    if (error.response?.status === 401) {
      // Remove the correct token names that match what you're setting in the Login component
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      
      // Check if we're not already on the login page to prevent redirect loops
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
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
