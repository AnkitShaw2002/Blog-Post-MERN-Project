import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Defined URLs/Assets mapping to switch images dynamically inside slider
const slideImages = [
  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80"
];

export default function RegisterChild({
  formData,
  handleChange,
  handleSubmit,
  successMsg,
  loading,
  error,
  invalidInput,
  handleClick,
  currentSlide
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl bg-[#252033]/90 rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col-reverse md:flex-row gap-8 items-stretch border border-white/5"
    >

      {/* LEFT SECTION: 3-Image Carousel Panel (Swaps underneath on Mobile Screens) */}
      <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden min-h-[380px] md:min-h-[550px] flex flex-col justify-between p-6 md:p-10 z-10 select-none">

        {/* Animated Slide Backdrops Layer */}
        <div className="absolute inset-0 -z-10 bg-[#161224]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(22, 18, 36, 0.95), rgba(0,0,0,0.2)), url(${slideImages[currentSlide]})`
              }}
            />
          </AnimatePresence>
        </div>

        {/* Brand Banner Navigation Bar */}
        <div className="flex justify-between items-center w-full">
          <span className="text-2xl font-black tracking-[4px] uppercase text-white">CraveNest</span>
          <Link
            to="/"
            className="bg-white/10 hover:bg-white/20 text-xs font-medium py-2 px-4 rounded-full border border-white/10 transition backdrop-blur-sm text-white flex items-center gap-2"
          >
            Back to website &rarr;
          </Link>
        </div>

        {/* Dynamic Static Title Strings with Navigation Progress Nodes */}
        <div className="w-full space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white max-w-xs leading-tight">
            Fresh Food, <br />Delivered Fast.
          </h2>

          {/* Active Navigation Bars Rendering */}
          <div className="flex items-center gap-2.5 pt-2">
            {[0, 1, 2].map((idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? "w-12 bg-lime-400" : "w-6 bg-white/20"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: Operational Application Sign Up Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-1 sm:px-6 py-4 md:py-6">
        <div className="max-w-md w-full mx-auto space-y-6">

          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Create an account</h1>
            <p className="text-sm text-gray-400 mt-1.5">
              Already have an account?
              <Link to="/auth/login" className="text-lime-400 hover:text-lime-300 hover:underline font-semibold transition-colors">
                Log in
              </Link>
            </p>
          </div>

          {/* Core System Error Indicators */}
          {error && (
            <div className="rounded-xl bg-red-600/20 border border-red-500/40 p-3.5 text-xs text-red-200">
              {error}
            </div>
          )}

          {/* Success Submission Indicators */}
          {successMsg && (
            <div className="rounded-xl bg-green-600/20 border border-green-500/40 p-3.5 text-xs text-green-200">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">




            <div className="flex flex-col items-center justify-center bg-transparent">
              <div className="relative group w-32 h-32">

                {/* Image Wrapper / Circular Frame */}
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-lg bg-[#2e283f] flex items-center justify-center">
                  {/* Preview Image */}
                  <img
                    id="profilePreviewImage"
                    src={
                      formData.imagePath instanceof File
                        ? URL.createObjectURL(formData.imagePath) // Converts raw file structure to a visual layout string
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-xl_p7VhmHRfBf2tB--SDWy-5wv_JpfRVDDv1w0Ewtg&s=10"
                    }
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Interactive Overlay Hover State - Points directly to the file input's unique ID */}
                <label
                  htmlFor="profileFileInput"
                  className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                  </svg>
                  <span className="text-xs font-semibold">Change</span>
                </label>

                {/* Hidden Native File Input */}
                <input
                  type="file"
                  name="profileImage"
                  id="profileFileInput"
                  onChange={handleChange}
                  // accept="image/*"
                  className="hidden"
                />
              </div>

              {invalidInput?.imagePath && (
                <span className="text-xs text-red-400 font-medium pl-1 mt-2">{invalidInput.imagePath}</span>
              )}
            </div>








            {/* Split Full Name Row */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Fletcher"
                className="w-full bg-[#2e283f] border border-transparent focus:border-lime-400 focus:outline-none transition-all rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500"
              />
              {invalidInput?.name && (
                <span className="text-xs text-red-400 font-medium pl-1">{invalidInput.name}</span>
              )}
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-[#2e283f] border border-transparent focus:border-lime-400 focus:outline-none transition-all rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500"
              />
              {invalidInput?.email && (
                <span className="text-xs text-red-400 font-medium pl-1">{invalidInput.email}</span>
              )}
            </div>

            {/* Physical Delivery Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">Delivery Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                placeholder="123 Street, City"
                className="w-full bg-[#2e283f] border border-transparent focus:border-lime-400 focus:outline-none transition-all rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500"
              />
              {invalidInput?.address && (
                <span className="text-xs text-red-400 font-medium pl-1">{invalidInput.address}</span>
              )}
            </div>

            {/* Password Layout Field */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#2e283f] border border-transparent focus:border-lime-400 focus:outline-none transition-all rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {invalidInput?.password && (
                <span className="text-xs text-red-400 font-medium pl-1">{invalidInput.password}</span>
              )}
            </div>

            {/* Confirm Password Layout Field */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword || ""}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#2e283f] border border-transparent focus:border-lime-400 focus:outline-none transition-all rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {invalidInput?.confirmPassword && (
                <span className="text-xs text-red-400 font-medium pl-1">{invalidInput.confirmPassword}</span>
              )}
            </div>

            {/* Native Execution Form Buttons */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}

                className={`w-full py-3.5 px-4 rounded-xl font-bold tracking-wide uppercase transition-all duration-200 text-sm shadow-md
                  ${loading
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
                    : "border-gray-800 text-black hover:bg-lime-300 active:scale-[0.99] shadow-lime-400/10"
                  }`
                }
              >
                {loading ? "Processing..." : "Create Account"}
              </button>
            </div>
          </form>

        </div>
      </div>

    </motion.div>
  );
}