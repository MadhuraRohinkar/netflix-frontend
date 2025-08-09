import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Profile from '../pages/Profile'
import useMoviestore from '../store/Moviestore';// adjust path if needed

const Navbar = () => {
  const navigate = useNavigate();
  const {setKey} = useMoviestore()
  const [showProfile, setShowProfile] = useState(false); // 👈 toggle profile view

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-5 bg-black text-white fixed w-full top-0 left-0 z-50 shadow-md">
        {/* Logo + Links */}
        <div className="flex items-center space-x-8">
          <img src="/netflix-logo.png" alt="Netflix Logo" className="w-28" />

          <ul className="flex space-x-8 text-base font-semibold">
            <li><Link to="/">Home</Link></li>
            <li><Link onClick={()=>setKey("movie")}>Movies</Link></li>
            <li><Link onClick={()=>setKey("tv")}>TV Shows</Link></li>
          </ul>
        </div>

        {/* Search + Avatar + Logout */}
        <div className="flex items-center space-x-6 relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* 👇 Avatar triggers profile toggle */}
          <img
            src="/avatar1.png"
            alt="Avatar"
            onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
          />

          {/* Logout Button */}
          <button title="Logout" onClick={handleLogout}>
            <LogOut className="w-7 h-7 text-white hover:text-red-500" />
          </button>

          {/* 👇 Profile Modal (only shows when clicked) */}
          {showProfile && (
            <div className="absolute right-0 top-16 z-50">
              <Profile />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
