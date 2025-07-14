import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens on unauthorized
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
      // Optionally redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// User Service
export const userService = {
  // Regular registration
  register: async (userData) => {
    try {
      const response = await apiClient.post('/users/register/', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Regular login
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/users/login/', credentials);
      
      // Store tokens if they exist in response
      if (response.data.access) {
        localStorage.setItem('access', response.data.access);
      }
      if (response.data.refresh) {
        localStorage.setItem('refresh', response.data.refresh);
      }
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Google OAuth authentication
  googleAuth: async (googleUserData) => {
    try {
      const response = await apiClient.post('/users/google-auth/', {
        email: googleUserData.email,
        name: googleUserData.name,
        google_id: googleUserData.id,
        avatar: googleUserData.image,
        provider: 'google'
      });
      
      // Store tokens if they exist in response
      if (response.data.access) {
        localStorage.setItem('access', response.data.access);
      }
      if (response.data.refresh) {
        localStorage.setItem('refresh', response.data.refresh);
      }
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/users/profile/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put('/users/profile/', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const refresh = localStorage.getItem('refresh');
      if (!refresh) {
        throw new Error('No refresh token available');
      }
      
      const response = await apiClient.post('/users/token/refresh/', {
        refresh: refresh
      });
      
      if (response.data.access) {
        localStorage.setItem('access', response.data.access);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      const refresh = localStorage.getItem('refresh');
      if (refresh) {
        await apiClient.post('/users/logout/', { refresh: refresh });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
    }
  },

  // Get all users (if needed)
  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/users/');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default apiClient;
