'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <InfinitySpin visible={true} color="#ffffff" ariaLabel="infinity-spin-loading" />
        </div>
      }
    >
      <div>
        <Content />
      </div>
    </Suspense>
  );
};

export default page;

import { useForm } from 'react-hook-form';
import { useAxios } from '@/providers/AxiosProvider';
import Swal from 'sweetalert2';

const Content = () => {
  const params = useSearchParams();
  const uid = params.get('uid');
  const token = params.get('token');
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const axios = useAxios();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;
    console.log('New password:', password);
    console.log('Confirm password:', confirmPassword);
    try {
      const response = await axios.post(`/api/users/password/reset/confirm/${uid}/${token}`, { new_password: password, new_password_confirm: confirmPassword });
      console.log('Password reset response:', response);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'Your password has been set successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        router.push('/login');
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to set password. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error setting new password:', error);
    }
  }

if (!uid || !token) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-950 to-black flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">Invalid Request</h2>
          <p className="text-gray-700 text-center">Please check your email for the correct verification link.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-blue-950 to-black flex px-5 items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">Set New Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                })}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                id="confirmPassword"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
                placeholder="Re-enter new password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirm((prev) => !prev)}
                tabIndex={-1}
              >
                {showConfirm ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition-colors duration-200 shadow"
          >
            Set Password
          </button>
        </form>
        </div>
    </div>
  );
};
