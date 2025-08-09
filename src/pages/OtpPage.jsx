import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { variables } from '../constants/constants';
import useAuthStore from '../store/authStore';

const OtpPage = () => {
  const { otp, setOtp } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${variables.BACKEND_URL}/verify-Otp`, {
        email,
        otp
      });

      alert('OTP verified successfully!');
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      alert('Invalid OTP. Please try again.');
      console.error('OTP verification failed:', error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        <p className="mb-4 text-sm">
          OTP sent to <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 rounded bg-black border border-gray-600 placeholder-gray-400 text-white"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
          >
            Verify & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;


/*import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/api/v1/verify-Otp', {
        email,
        otp  // ✅ Correct key: 'otp'
      });

      alert('OTP verified successfully!');
      localStorage.setItem('token', res.data.token); // Save JWT token
      navigate('/home'); // Redirect to homepage
    } catch (error) {
      alert('Invalid OTP. Please try again.');
      console.error('OTP verification failed:', error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        <p className="mb-4 text-sm">
          OTP sent to <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 rounded bg-black border border-gray-600 placeholder-gray-400 text-white"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
          >
            Verify & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;*/