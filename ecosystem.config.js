module.exports = {
  apps: [
    {
      name: 'emothrive-frontend',
      script: 'npm',
      args: 'run start', // or 'start' if you've built already
      cwd: '/var/www/emothrive-frontend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        NEXTAUTH_URL: 'https://emothrive.net',
        NEXT_PUBLIC_API_URL: 'https://emothrive.net/api',

        // Add these only if you're using next-auth or any services in frontend
        GOOGLE_CLIENT_ID:'',
        GOOGLE_CLIENT_SECRET:'',
      },
    },
  ],
};
