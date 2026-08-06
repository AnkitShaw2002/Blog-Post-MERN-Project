import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUpdatePassword } from "../../../../customHooks/auth/auth.hook";
import { updatePasswordSchema } from "../../../../validator/UpdatePasswordValidator/UpdatePassword"

import Footer from "../../../../component/layout/Footer";
import Header from "../../../../component/layout/Header";


export default function UpdatePassword() {

    const navigate = useNavigate();

    // const { id } = useParams();

    const { updatePassword, loading } = useUpdatePassword();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(updatePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirm_password: "",
        },
    });

    const onSubmit = useCallback(
        async (data) => {
            const response = await updatePassword({
                oldPassword: data.oldPassword.trim(),
                newPassword: data.newPassword.trim(),
                // confirm_password: data.confirm_password.trim(),
            });

            console.log("API Response:", response); // Check your browser console

            // Update this condition based on what your console log prints
            if (response?.status || response?.success) {
                navigate("/product/product-list");
            }
        },
        [ updatePassword, navigate]
    );

    return (
        <>
            <div className="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#1f2430]">
                {/* Persistent Navigation Header */}
                <div className="relative z-30 w-full">
                    <Header />
                </div>
                <div className="min-h-screen flex items-center justify-center bg-slate-100">
                    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                        <h2 className="text-2xl font-bold text-center mb-6">
                            Update Password
                        </h2>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                        >


                            <div>
                                <label className="block mb-2 font-medium">
                                    Old Password
                                </label>

                                <input
                                    type="password"
                                    {...register("oldPassword")}
                                    className="w-full border rounded-lg p-3"
                                />

                                <p className="text-red-500 text-sm mt-1">
                                    {errors.oldPassword?.message}
                                </p>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    {...register("newPassword")}
                                    className="w-full border rounded-lg p-3"
                                />

                                <p className="text-red-500 text-sm mt-1">
                                    {errors.newPassword?.message}
                                </p>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    {...register("confirm_password")}
                                    className="w-full border rounded-lg p-3"
                                />

                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirm_password?.message}
                                </p>
                            </div>

                            <button
                                disabled={loading || isSubmitting}
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {loading || isSubmitting
                                    ? "Resetting..."
                                    : "Reset Password"}
                            </button>
                        </form>
                    </div>
                </div>


                <div className="relative z-30 w-full">
                    <Footer />
                </div>
            </div>
        </>
    )
}
