import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#1f2430] overflow-hidden p-6">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-[120px] pointer-events-none select-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none select-none"></div>

      {/* Main Glassmorphic Display Panel Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-xl text-center bg-[#050508]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8"
      >
        {/* Large Decorative 404 Visual Header */}
        <div className="relative select-none">
          <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10 opacity-90">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold tracking-[0.5em] uppercase text-lime-400 mt-16 sm:mt-24 drop-shadow-md">
              Page Not Found
            </span>
          </div>
        </div>

        {/* Messaging Block */}
        <div className="space-y-2 max-w-sm mx-auto">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Lost in space?
          </h2>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            The destination link you are attempting to reach does not exist or has been shifted to a new route path.
          </p>
        </div>

        {/* Interactive Action Control Interface */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#161722] border border-gray-800 text-gray-300 hover:text-white hover:bg-[#1f2130] font-medium text-sm transition-all tracking-wide active:scale-[0.98]"
          >
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-[#050508] font-bold text-sm shadow-xl shadow-lime-400/10 transition-all tracking-wide active:scale-[0.98]"
          >
            Return Home
          </button>
        </div>
      </motion.div>

      {/* Decorative Branding Footnote */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-600 select-none tracking-widest uppercase pointer-events-none">
        DevPortal Platform System Matrix
      </div>
    </div>
  );
}