import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginChild({
  formData,
  handleChange,
  handleSubmit,
  successMsg,
  loading,
  error,
  invalidInput,
  handleClick
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="w-full max-w-7xl min-h-screen md:min-h-[700px] bg-transparent md:bg-[#050508] md:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/5 md:my-auto">

      {/* LEFT SIDE: Sign In Form View Panel */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 md:py-8 bg-transparent">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-auto space-y-8 text-white"
        >
          {/* Header Identity Branding */}
          <div>
            <h1 className="text-3xl font-bold tracking-wide text-white">Welcome To KVP</h1>
            <p className="text-sm text-gray-400 mt-2">
              Sign in to continue
            </p>
          </div>

          {/* Internal Context Hook Feedback Layouts */}
          {error && (
            <div className="rounded-xl bg-red-600/20 border border-red-500/40 p-3.5 text-xs text-red-200">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="rounded-xl bg-green-600/20 border border-green-500/40 p-3.5 text-xs text-green-200">
              {successMsg}
            </div>
          )}

          {/* Main Action Form Control Matrix */}
          <form onSubmit={handleSubmit} className="space-y-6 text-left">

            {/* Email Input Frame */}
            <div className="space-y-1.5 group">
              <label className="text-xs font-medium text-gray-400">E-mail</label>
              <div className="relative border-b border-gray-700 group-focus-within:border-lime-400 transition-colors py-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  placeholder="Vakopirtska@2002"
                  className="w-full bg-transparent outline-none text-white text-sm placeholder-gray-600 tracking-wide pr-8"
                />
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-light">@</span>
              </div>
              {invalidInput?.email && (
                <span className="text-xs text-red-400 font-medium pl-1 block">{invalidInput.email}</span>
              )}
            </div>

            {/* Password Input Frame */}
            <div className="space-y-1.5 group">
              <label className="text-xs font-medium text-gray-400">Password</label>
              <div className="relative border-b border-gray-700 group-focus-within:border-lime-400 transition-colors py-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  placeholder="6+ strong character"
                  className="w-full bg-transparent outline-none text-white text-sm placeholder-gray-600 tracking-wide pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors text-xs"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {invalidInput?.password && (
                <span className="text-xs text-red-400 font-medium pl-1 block">{invalidInput.password}</span>
              )}
            </div>

            {/* Remember and Reset Link Properties Row */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-400 select-none">
                <input type="checkbox" className="accent-lime-400 w-3.5 h-3.5 bg-transparent rounded border-gray-700" />
                Remember for 30 days
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-xs text-lime-400 hover:text-lime-300 font-medium transition-colors"
              >
                Forgot password
              </Link>
            </div>

            {/* Submit Interactive Button Container */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#161722] border border-gray-800 text-lime-400 hover:text-lime-300 hover:bg-[#1f2130] font-semibold text-sm py-3.5 px-4 rounded-xl transition-all shadow-xl tracking-wide active:scale-[0.99]
                  ${loading ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {loading ? "Processing..." : "Login"}
              </button>
            </div>
          </form>

          {/* Social OAuth Link Triggers */}
          <div className="space-y-3 pt-2">
            <p className="text-xs text-gray-500">Sign Up with</p>
            <div className="flex items-center gap-3">
              <button type="button" className="w-10 h-10 rounded-xl bg-[#161722] hover:bg-[#1f2130] border border-gray-800 transition flex items-center justify-center text-white text-sm">
                <i className="fa-brands fa-apple text-base"></i>
              </button>
              <button type="button" className="w-10 h-10 rounded-xl bg-[#161722] hover:bg-[#1f2130] border border-gray-800 transition flex items-center justify-center text-red-400 text-sm">
                <i className="fa-brands fa-google"></i>
              </button>
              <button type="button" className="w-10 h-10 rounded-xl bg-[#161722] hover:bg-[#1f2130] border border-gray-800 transition flex items-center justify-center text-pink-400 text-sm">
                <i className="fa-brands fa-instagram"></i>
              </button>
            </div>
          </div>

          {/* Form Routing Redirect Reference Footnote */}
          <div className="pt-2 text-xs text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-lime-400 font-semibold hover:underline ml-1">
              Sign Up
            </Link>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE: Interactive UI Showcase Dashboard Display Section (Desktop Splitting Media Layouts Only) */}
      <div className="hidden md:flex w-[55%] bg-[#1a202c] relative flex-col justify-between p-12 lg:p-16 overflow-hidden select-none">

        {/* Showcase Image with Inline Mask Overlay Design */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center scale-105 transition-transform duration-700"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(26, 32, 44, 0.98) 15%, rgba(26, 32, 44, 0.4) 65%), url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80')`
          }}
        />

        {/* Branding Typography Overlay Block */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 space-y-4 max-w-sm mt-6"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Designed for individuals
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed font-light">
            See the analytics and grow your data for Task remotely, from anywhere!
          </p>
        </motion.div>

        {/* Context Gradient Shielding Spacer Base layer */}
        <div className="relative z-10 w-full h-24 bg-gradient-to-t from-[#1a202c] to-transparent pointer-events-none self-end -mb-16"></div>
      </div>

    </main>
  );
}