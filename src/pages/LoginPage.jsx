import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isTokenExpired } from '../utils/checkToken';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:4000/api/v1/login', { email });
        setShowOtpInput(true); // Show OTP field on same page
        setShowSignUp(false);
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/v1/verify-Otp', {
        email,
         otp,
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/'); // go to your HomeScreen page
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      alert('Error verifying OTP');
    }
  };

  const handleGoToSignup = () => {
    navigate('/signup', { state: { email } });
  };

 useEffect(() => {
  const token = localStorage.getItem('token');

  // ✅ Only navigate if token exists AND it is NOT expired
  if (token && isTokenExpired(token)) {
    navigate('/');
  }
  }, [navigate]);


  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl flex justify-between items-center p-4 mx-auto'>
        <Link to='/'>
          <img src='./netflix-logo.png' alt='Netflix Logo' className='w-52' />
        </Link>
      </header>

      <div className='flex items-center justify-center mt-24 mx-3'>
        <div className='w-full max-w-xl p-8 space-y-6 bg-black/60 rounded-lg shadow-md text-center'>
          <h1 className='text-white font-bold text-6xl sm:text-5xl'>
            Unlimited movies, TV shows and more
          </h1>
          <p className='text-gray-300 text-base sm:text-lg'>
            Starts at ₹99. Cancel anytime.
          </p>
          <p className='text-gray-300 text-sm sm:text-base mt-2'>
            Ready to watch? Enter your email to create or restart your membership.
          </p>

          <form
            className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4'
            onSubmit={handleLogin}
          >
            <input
              type='email'
              name='email'
              id='email'
              placeholder='you@domain.com'
              className='w-full px-4 py-2 border border-gray-700 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type='submit'
              className='w-full sm:w-auto px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700'
            >
              Get Started
            </button>
          </form>

          {showOtpInput && (
            <div className='mt-4'>
              <input
                type='text'
                placeholder='Enter OTP'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className='w-full px-4 py-2 border border-gray-700 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring mb-2'
              />
              <button
                onClick={handleVerifyOtp}
                className='w-full sm:w-auto px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700'
              >
                Verify OTP
              </button>
            </div>
          )}

          {showSignUp && (
            <div className='mt-4 text-white'>
              <p className='mb-2'>This email is not registered. Please sign up first.</p>
              <button
                onClick={handleGoToSignup}
                className='px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-md'
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
