import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../../component/layout/Header";
import Footer from "../../../../component/layout/Footer";

import RegisterChild from "../../../../component/RegisterChild";

import { useRegister } from "../../../../customHooks/auth/auth.hook";

import { useRegisterForm } from "../../../../validator/registerValidator/registerForm.hook";

export default function Register() {

  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { registerUser, loading, error } = useRegister();
  const { formData, handleChange, successMsg, setSuccessMsg, resetForm, invalidInput, setInvalidInput, handleClick, validation } = useRegisterForm();

  // Automatic 3-Second slider state cycler
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {

      e.preventDefault();
      setSuccessMsg("");
      setInvalidInput({});

      const localErrors = validation();

      if (formData.password !== formData.confirmPassword) {
        localErrors.confirmPassword = "Passwords do not match!";
      }

      if (Object.keys(localErrors).length > 0) {
        setInvalidInput(localErrors);
        return;
      }

      try {
        const dataPayload = new FormData();

        // Text fields matching your Joi schemas
        dataPayload.append("name", formData.name);
        dataPayload.append("email", formData.email);
        dataPayload.append("address", formData.address);
        dataPayload.append("password", formData.password);
        dataPayload.append("confirmPassword", formData.confirmPassword);

        // ✅ FIX: Change key name to "profileImage" so Multer can capture it
        if (formData.imagePath) {
          dataPayload.append("profileImage", formData.imagePath);
        }

        const response = await registerUser(dataPayload);
        
        if (!response) return;

        if (response?.status === true) {
          setSuccessMsg(response?.message || "Registration successful!");
          resetForm();

          const userId = response?.user?.id;
          if (userId) {
            localStorage.setItem("pending_verify_userId", userId);
          }

          setTimeout(() => {
            navigate("/auth/verify-otp", { state: { userId } });
          }, 1000);
        }
      } catch (err) {
        console.error("Submission failed:", err);
      }
    },
    [
      formData,
      registerUser,
      resetForm,
      setSuccessMsg,
      navigate,
      validation,
      setInvalidInput
    ]
  );

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#1f1b29]">
      {/* Header Positioning */}
      <div className="relative z-30 w-full">
        <Header />
      </div>

      {/* Main Container Injecting Interactive States */}
      <div className="relative z-20 flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <RegisterChild
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          successMsg={successMsg}
          loading={loading}
          error={error}
          invalidInput={invalidInput}
          handleClick={handleClick}
          currentSlide={currentSlide}
        />
      </div>

      {/* Footer Positioning */}
      <div className="relative z-30 w-full">
        <Footer />
      </div>
    </div>
  );
}