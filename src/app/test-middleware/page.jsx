"use client";
import { useEffect, useState } from 'react';

export default function TestMiddleware() {
  const [tokens, setTokens] = useState({ access: null, refresh: null });

  useEffect(() => {
    // Check if tokens exist in localStorage
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    setTokens({ access, refresh });
  }, []);

  const clearTokens = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('tokenTimestamp');
    // Clear cookies
    document.cookie = 'access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'refresh=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setTokens({ access: null, refresh: null });
    alert('Tokens cleared! Now try accessing /chat');
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Middleware Test Page</h1>
      
      <div className="mb-6 p-4 bg-gray-800 rounded">
        <h2 className="text-xl mb-4">Current Authentication Status:</h2>
        <p>Access Token: {tokens.access ? '✅ Present' : '❌ Missing'}</p>
        <p>Refresh Token: {tokens.refresh ? '✅ Present' : '❌ Missing'}</p>
      </div>

      <div className="mb-6">
        <button 
          onClick={clearTokens}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded mr-4"
        >
          Clear All Tokens
        </button>
        
        <a 
          href="/chat" 
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Test Access to /chat
        </a>
      </div>

      <div className="p-4 bg-gray-800 rounded">
        <h3 className="text-lg mb-2">Test Instructions:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click "Clear All Tokens" to remove authentication</li>
          <li>Click "Test Access to /chat" to try accessing protected route</li>
          <li>If middleware works, you should be redirected to home page</li>
          <li>If middleware doesn't work, you'll see the chat page</li>
        </ol>
      </div>
    </div>
  );
}
