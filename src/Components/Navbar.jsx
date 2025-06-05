import React, { useState } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Simulated auth state
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate("")

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="./vite.svg" alt="Logo" className="h-12 w-12 mr-3" />
          <span className="text-2xl md:text-3xl font-bold text-[#7366ff]">ConnectIQ</span>
        </div>

        <div className="hidden md:flex space-x-8 items-center text-lg">
          <a href="#" className="hover:text-[#7366ff] text-gray-800 font-medium">Home</a>
          <a href="#" className="hover:text-[#7366ff] text-gray-800 font-medium">Features</a>
          <a href="#" className="hover:text-[#7366ff] text-gray-800 font-medium">Pricing</a>
          <a href="#" className="hover:text-[#7366ff] text-gray-800 font-medium">Contact</a>

          {!loggedIn ? (
            <button onClick={()=>navigate("/dashboard")} className="bg-[#7366ff] text-white px-5 py-2 rounded-lg hover:bg-[#5a52d4] transition">
              Login
            </button>
          ) : (
            <div className="relative">
              <button onClick={toggleUserMenu} className="text-2xl text-[#7366ff]">
                <FaUserCircle />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-lg">
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                  <button
                    onClick={() => setLoggedIn(false)}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 text-lg shadow">
          <a href="#" className="block text-gray-700 hover:text-[#7366ff]">Home</a>
          <a href="#" className="block text-gray-700 hover:text-[#7366ff]">Features</a>
          <a href="#" className="block text-gray-700 hover:text-[#7366ff]">Pricing</a>
          <a href="#" className="block text-gray-700 hover:text-[#7366ff]">Contact</a>

          {!loggedIn ? (
            <button onClick={()=>navigate("/dashboard")} className="w-full bg-[#7366ff] text-white px-4 py-2 rounded-lg hover:bg-[#5a52d4]">
              Login
            </button>
          ) : (
            <div>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 text-[#7366ff]"
              >
                <FaUserCircle className="text-2xl" />
                <span>User Menu</span>
              </button>
              {userMenuOpen && (
                <div className="mt-2 space-y-2">
                  <a href="#" className="block text-gray-700 hover:text-[#7366ff]">Profile</a>
                  <a href="#" className="block text-gray-700 hover:text-[#7366ff]">Settings</a>
                  <button
                    onClick={() => setLoggedIn(false)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
