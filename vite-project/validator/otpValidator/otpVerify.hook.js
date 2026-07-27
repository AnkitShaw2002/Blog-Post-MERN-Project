import { useState, useCallback } from "react";

export const useOtpVerifyForm = () => {
  const [otpFields, setOtpFields] = useState(Array(6).fill(""));
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = useCallback((element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Allow numbers only
    if (!value) return;

    setOtpFields((prev) => {
      const updated = [...prev];
      updated[index] = value.substring(value.length - 1); // keep last entered digit
      return updated;
    });

    // Auto focus next input
    if (element.nextSibling && value) {
      element.nextSibling.focus();
    }
  }, []);

  const handleKeyDown = useCallback((e, index) => {
    // If user presses Backspace on an empty field, focus previous box field
    if (e.key === "Backspace" && !otpFields[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    } else if (e.key === "Backspace") {
      setOtpFields((prev) => {
        const updated = [...prev];
        updated[index] = "";
        return updated;
      });
    }
  }, [otpFields]);

  const resetForm = useCallback(() => {
    setOtpFields(Array(6).fill(""));
    setSuccessMsg("");
  }, []);

  return {
    otpFields,
    handleChange,
    handleKeyDown,
    successMsg,
    setSuccessMsg,
    resetForm,
  };
};