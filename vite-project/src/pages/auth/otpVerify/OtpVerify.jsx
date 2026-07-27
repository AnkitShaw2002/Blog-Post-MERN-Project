import React, { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "../../../../component/layout/Header";
import Footer from "../../../../component/layout/Footer";
import OtpVerifyChild from "../../../../component/OtpVerifyChild";

import { useVerifyOtp } from "../../../../customHooks/auth/auth.hook";
import { useOtpVerifyForm } from "../../../../validator/otpValidator/otpVerify.hook";


export default function OtpVerify() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check local storage if state is missing
  const userId = location.state?.userId || localStorage.getItem("pending_verify_userId");

  const { verifyUser, loading, error:authError } = useVerifyOtp();
  const { otpFields, handleChange, handleKeyDown, successMsg, setSuccessMsg, resetForm } = useOtpVerifyForm();

  // Enforce validation: standard 6 digits check
  const isFormValid = useMemo(() => {
    return otpFields.every((digit) => digit.trim() !== "");
  }, [otpFields]);

  // Combine local state error or user presence tracking errors
  const displayError = useMemo(() => {
    if (!userId) return "Session missing user contextual data. Please try registering again.";
    return authError;
  }, [userId, authError]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!userId) return;
      setSuccessMsg("");

      const combinedOtp = otpFields.join("");

      try {
        await verifyUser(userId, combinedOtp); 
        setSuccessMsg("Email verified successfully!");
        resetForm();
        
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    },
    [otpFields, verifyUser, userId, resetForm, setSuccessMsg, navigate]
  );

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#1f2430]">
      {/* Persistent Navigation Header */}
      <div className="relative z-30 w-full">
        <Header />
      </div>

      

      {/* Main Dynamic Viewport Presentational Node */}
      <div className="relative z-20 flex-grow flex items-center justify-center p-0 md:p-6 lg:p-10">
        <OtpVerifyChild
          otpFields={otpFields}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          handleSubmit={handleSubmit}
          successMsg={successMsg}
          loading={loading}
          error={displayError}
          isFormValid={isFormValid && !!userId}
        />
      </div>

      {/* Persistent Footer Component */}
      <div className="relative z-30 w-full">
        <Footer />
      </div>
    </div>
  );
}