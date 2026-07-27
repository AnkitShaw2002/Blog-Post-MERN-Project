import React from "react";
import { motion } from "framer-motion";

export default function OtpVerifyChild({
  otpFields,
  handleChange,
  handleKeyDown,
  handleSubmit,
  successMsg,
  loading,
  error,
  isFormValid,
}) {
  return (
    <main className="w-full max-w-7xl min-h-screen md:min-h-[700px] bg-transparent md:bg-[#050508] md:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/5 md:my-auto">

      {/* LEFT SIDE: OTP Security Access Form View Panel */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 md:py-8 bg-transparent">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-auto space-y-8 text-white text-left"
        >
          {/* Header Identity Branding */}
          <div>
            <h1 className="text-3xl font-bold tracking-wide text-white">Verify Your Email</h1>
            <p className="text-sm text-gray-400 mt-2">
              Please enter the 6-digit confirmation code sent to your inbox.
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

          {/* Main Verification Code Input Matrix */}
          <form onSubmit={handleSubmit} className="space-y-8">

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">Security Pin</label>
              {/* 6 Digit Underline Field Grid Row Container */}
              <div className="flex items-center justify-between gap-2 pt-2">
                {otpFields.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    name="otp"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-xl font-bold text-white bg-transparent border-b border-gray-700 focus:outline-none focus:border-lime-400 transition-colors tracking-wide"
                  />
                ))}
              </div>
            </div>

            {/* Submit Action Control Container */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-3.5 px-4 rounded-xl font-bold tracking-wide uppercase transition-all duration-200 text-sm shadow-md
      ${loading
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
                    : "bg-lime-400 text-black hover:bg-lime-300 active:scale-[0.99] shadow-lime-400/10"
                  }`}
              >
                {loading ? "VERIFYING..." : "VERIFY CODE"}
              </button>
            </div>
          </form>

          {/* Optional Footer Resend Information Link */}
          <div className="pt-2 text-xs text-gray-500">
            Didn't receive a security notification?{" "}
            <button type="button" className="text-lime-400 font-semibold hover:underline bg-transparent border-none outline-none cursor-pointer p-0 ml-1">
              Resend Code
            </button>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE: Interactive UI Showcase Dashboard Display Section */}
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
          className="relative z-10 space-y-4 max-w-sm mt-6 text-left"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Securing your credentials
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed font-light">
            We've deployed multi-factor parameters to ensure user access points remain fully guarded.
          </p>
        </motion.div>

        {/* Context Gradient Shielding Spacer Base layer */}
        <div className="relative z-10 w-full h-24 bg-gradient-to-t from-[#1a202c] to-transparent pointer-events-none self-end -mb-16"></div>
      </div>

    </main>
  );
}