import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForgetPassword } from "../../../../customHooks/auth/auth.hook";
import { resetPasswordLinkSchema } from "../../../../validator/ResetPasswordLinkValidator/resetPassword";
import Header from "../../../../component/layout/Header";
import Footer from "../../../../component/layout/Footer";

export default function ForgetPassword() {
  

  const navigate = useNavigate();

  const { forgetPasswordLink, loading } = useForgetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(resetPasswordLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      const response = await forgetPasswordLink({
        email: data.email.trim(),
      });

      if (response?.status) {
        reset();
      }
    },
    [forgetPasswordLink, reset]
  );

  return (
    <>
<div className="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#1f2430]">
      {/* Persistent Navigation Header */}
      <div className="relative z-30 w-full">
        <Header />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8">

        <h2 className="text-3xl font-bold text-center text-slate-800">
          Forgot Password
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your registered email address.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 text-sm font-semibold">
              Email Address
            </label>

            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full rounded-lg border px-4 py-3 focus:border-indigo-500 focus:outline-none"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="w-full rounded-lg border border-gray-300 py-3 font-semibold hover:bg-gray-100"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>


    {/* Persistent Footer Component */}
      <div className="relative z-30 w-full">
        <Footer />
      </div>
    </div>
    </>
  )
}
