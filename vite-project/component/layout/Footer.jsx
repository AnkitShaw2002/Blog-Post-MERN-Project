import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0f18] text-gray-400 text-sm py-10 mt-auto border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* TOP ROW: Logo and Newsletter Input Area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6">
          <div className="text-xl font-extrabold text-white tracking-wider uppercase select-none">
            Logo
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="w-full sm:max-w-md flex items-center bg-white rounded-md overflow-hidden shadow-inner">
            <div className="pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="email" 
              placeholder="Enter your email to get the latest news..." 
              className="w-full bg-transparent px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            />
            <button type="submit" className="bg-[#007bff] hover:bg-[#0069d9] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shrink-0">
              Search
            </button>
          </form>
        </div>

        {/* HORIZONTAL DIVIDER */}
        <div className="border-t border-gray-800"></div>

        {/* MIDDLE SECTION: 4-Column Navigation Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
          
          {/* Column One */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">Column One</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><Link to="#" className="hover:text-white transition-colors">Twenty One</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Thirty Two</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Fourty Three</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Fifty Four</Link></li>
            </ul>
          </div>

          {/* Column Two */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">Column Two</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><Link to="#" className="hover:text-white transition-colors">Sixty Five</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Seventy Six</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Eighty Seven</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Ninety Eight</Link></li>
            </ul>
          </div>

          {/* Column Three */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">Column Three</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><Link to="#" className="hover:text-white transition-colors">One Two</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Three Four</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Five Six</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Seven Eight</Link></li>
            </ul>
          </div>

          {/* Column Four: Social Network Matrices */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">Column Four</h4>
            <div className="space-y-2">
              <span className="text-xs block text-gray-400 font-medium">Join Us</span>
              <div className="flex items-center space-x-4 text-gray-400 text-base">
                <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-youtube"></i></a>
                <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>

        </div>

        {/* HORIZONTAL DIVIDER */}
        <div className="border-t border-gray-800"></div>

        {/* BOTTOM SECTION: Legal Footnotes and Navigation Shortcuts */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2 text-xs font-light">
          <div>
            Greelogix &copy; {new Date().getFullYear()}. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              <span>Services</span>
              <svg className="w-3 h-3 text-gray-500 pt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link to="/help" className="hover:text-white transition-colors">Help Center</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;