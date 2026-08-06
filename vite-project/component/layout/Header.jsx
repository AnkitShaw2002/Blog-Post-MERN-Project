import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Header = () => {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };


  useEffect((item) => {
    isAuthenticated
  }, [isAuthenticated])

  console.log(isAuthenticated, "isAuthenticated")
  return (
    <header className="w-full sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-3 bg-[#161224]/30 backdrop-blur-md">
      {/* Capsule Outer Wrapper Container from the image */}
      <div className="max-w-7xl mx-auto bg-[#1b172a]/95 border border-white/5 rounded-full px-6 lg:px-8 h-16 flex items-center justify-between shadow-xl">

        {/* Logo Branding Layer */}
        <div className="flex items-center space-x-2 shrink-0">
          <Link to="/product/product-list" className="text-xl font-extrabold tracking-wide flex items-center select-none">
            <span className="text-[#ff5a2b]">GREE</span>
            <span className="text-white ml-1.5 font-bold">LOGIX</span>
          </Link>
        </div>

        {/* Center Inline Navigation (Hidden on small mobile views for cleanliness) */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-gray-300">
          <Link to="/product/product-list" className="hover:text-white transition-colors">Home</Link>
          <div className="relative flex items-center gap-1 group cursor-pointer hover:text-white transition-colors">
            <span>Services</span>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors pt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link to="/help" className="hover:text-white transition-colors">Help Center</Link>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
        </nav>

        {/* Right Section Matrix: Search & Interactive Button Links */}
        <div className="flex items-center space-x-4">

          {/* Integrated Search Input Container */}
          {/* <div className="relative hidden lg:block w-48 xl:w-56">
            <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-[#241f36] border border-transparent focus:border-white/10 focus:outline-none transition-all rounded-full py-2 pl-10 pr-4 text-xs text-white placeholder-gray-500"
            />
          </div> */}

          {/* Action Call to Buttons */}
          <div className="flex items-center space-x-2.5 text-xs tracking-wide uppercase font-bold">
            <Link
              to="/"
              className="border border-[#ff5a2b] text-[#ff5a2b] hover:bg-[#ff5a2b]/10 px-5 py-2.5 rounded-full transition-all duration-200"
            >
              Sign Up
            </Link>


            {isAuthenticated ?
              <Link
                to="/auth/login"
                onClick={handleLogout}
                className="bg-[#ff5a2b] text-white hover:bg-[#e44e22] px-6 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-[#ff5a2b]/10 active:scale-[0.98]"
              >
                Logout
              </Link>

              : <Link
                to=""
                className="bg-[#ff5a2b] text-white hover:bg-[#e44e22] px-6 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-[#ff5a2b]/10 active:scale-[0.98]"
              >
                Login
              </Link>

            }


          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;