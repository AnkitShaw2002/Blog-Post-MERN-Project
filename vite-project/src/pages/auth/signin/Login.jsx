import React, { useCallback } from "react";

import Header from "../../../../component/layout/Header";
import Footer from "../../../../component/layout/Footer";

import LoginChild from "../../../../component/LoginChild";

import { useLogin } from "../../../../customHooks/auth/auth.hook";
import { useLoginForm } from "../../../../validator/loginValidator/loginForm.hook";

import foodVideo from "../../../../src/assets/login-DingDong.mp4";

import { useNavigate } from "react-router-dom"; 



export default function Login() {
  const { loginUser, loading, error } = useLogin();
// Inside your component function:
const navigate = useNavigate(); // 2. Initialize the hook
  const {
    formData,
    handleChange,
    successMsg,
    invalidInput,
    setInvalidInput,
    setSuccessMsg,
    resetForm,
    handleClick,
    validation
  } = useLoginForm();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSuccessMsg("");
      setInvalidInput({});

      const localErrors = validation();

      if (Object.keys(localErrors).length > 0) {
        setInvalidInput(localErrors);
        return;
      }

      try {
        const response = await loginUser({
          email: formData.email?.trim(),
          password: formData.password,
        });

        console.log(response);

      if (response && response.status === true) {
        setSuccessMsg(response?.message || "Logged in successfully!");
        resetForm();

        navigate("/product/product-list"); 
      }

      } catch (err) {
        console.error("Login failed:", err);
        if (err.response && err.response.data) {
          console.log("Server error message:", err.response.data);
        }
      }
    },
    [formData, loginUser, resetForm, setSuccessMsg, setInvalidInput, validation]
  );

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#1f2430]">
      {/* Persistent Navigation Header */}
      <div className="relative z-30 w-full">
        <Header />
      </div>

      {/* Background Video Layer with Responsive Backdrop Blurs */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={foodVideo} type="video/mp4" />
        </video>
        {/* Responsive tint layer depending on layout viewports */}
        <div className="absolute inset-0 bg-[#050508]/85 md:bg-black/30 backdrop-blur-[1px] md:backdrop-blur-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
      </div>

      {/* Main Dynamic Viewport Presentational Node */}
      <div className="relative z-20 flex-grow flex items-center justify-center p-0 md:p-6 lg:p-10">
        <LoginChild
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          successMsg={successMsg}
          loading={loading}
          error={error}
          invalidInput={invalidInput}
          handleClick={handleClick}
        />
      </div>

      {/* Persistent Footer Component */}
      <div className="relative z-30 w-full">
        <Footer />
      </div>
    </div>
  );
}