import { useState, useCallback } from "react";
import axiosInstance from "../../api/axios/axiosInstance";
import { EndPoints } from "../../api/endpoints/endpoints";
import { toast } from "sonner";

// const [loading, setLoading] = useState(false);
// const [error, setError] = useState("");
const getErrorMessage = (error) =>
  error.response?.data?.message ||
  error.message ||
  "Something went wrong";

export const useRegister = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const registerUser = useCallback(async (userData) => {


    setLoading(true);
    setError("");

    try {
      const { data: registerData } = await axiosInstance.post(
        EndPoints.auth.signUp,
        userData
      );


      if (registerData.status) {
        toast.success(registerData.message);
      } else {
        toast.error(registerData.message);
      }

      return registerData;
    } catch (error) {

      const message = getErrorMessage(error);

      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    registerUser,
    loading,
    error
  };
};

export const useLogin = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = useCallback(async (credentials) => {

    setLoading(true);
    setError("");
    try {
      const { data: loginData } = await axiosInstance.post(
        EndPoints.auth.signIn,
        credentials
      );

      if (loginData.token) {
        localStorage.setItem("token", loginData.token);
      }

      if (loginData.status) {
        toast.success(loginData.message)
      } else {
        toast.error(loginData.message)
      }

      console.log(loginData);
      return loginData;
    } catch (error) {
      const message = getErrorMessage(error);

      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loginUser,
    loading,
    error
  };
}

// ✅ Added OTP Verification API Action
export const useVerifyOtp = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verifyUser = useCallback(async (userId, otpValue) => {


    setLoading(true);
    setError("");
    try {
      const { data: otpData } = await axiosInstance.post(
        EndPoints.auth.otpVerify,
        {
          userId,
          otp: String(otpValue)
        }
      );

      if (otpData.status) {
        toast.success(otpData.message)
      } else {
        toast.error(otpData.message)
      }

      console.log(otpData);
      return otpData;

    } catch (error) {
      const message = getErrorMessage(error);

      setError(message);
      toast.error(message);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    verifyUser,
    loading,
    error
  };
}

export const useForgetPassword = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const forgetPasswordLink = useCallback(async (emailData) => {

    setLoading(true);
    setError("");

    try {
      const { data: forgetPasswordData } = await axiosInstance.post(
        EndPoints.auth.resetPasswordLink,
        emailData
      );

      if (forgetPasswordData.status) {
        toast.success(forgetPasswordData.message);
      } else {
        toast.error(forgetPasswordData.message);
      }

      return forgetPasswordData;
    } catch (error) {

      const message = getErrorMessage(error);

      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    forgetPasswordLink,
    loading,
    error
  };
};

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetPassword = useCallback(async (id, token, passwordData) => {
    setLoading(true);
    setError("");

    try {
      const endpoint = EndPoints.auth.resetPassword
        .replace(":id", id)
        .replace(":token", token);

      const { data } = await axiosInstance.post(endpoint, passwordData);

      if (data.status) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      return data;
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    resetPassword,
    loading,
    error,
  };
};

export const useUserProfile = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const profileDetails = useCallback(async (userData) => {

    setLoading(true);
    setError("");

    try {
      const { data: userProfileData } = await axiosInstance.get(
        EndPoints.auth.userProfile,
      );

      // if (userProfileData.status) {
      //   toast.success(userProfileData.message);
      // } else {
      //   toast.error(userProfileData.message);
      // }

      return userProfileData;
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    profileDetails,
    loading,
    error
  };
};
