import { useState, useCallback } from "react";

const initialState = {
  title: "",
  subtitle: "",
  content: "",
};

export const usePostForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [invalidInput, setInvalidInput] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Check state requirements prior to submit operations
  const validation = () => {
    let errors = {};

    if (!formData.title) {
      errors.title = "Enter Your Title";
    }
    if (!formData.subtitle) {
      errors.subtitle = "Enter Your Subtitle";
    }
    if (!formData.content) {
      errors.content = "Enter Your Content";
    }

    return errors;
  };

  // Generic dynamic input state handler (Optimized using dynamic keys)
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if (value.length === 0) {
      // Capitalize first character for the response text string
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      
      setFormData((prev) => ({ ...prev, [name]: "" }));
      setInvalidInput((prev) => ({ ...prev, [name]: `Enter Your ${formattedName}` }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setInvalidInput((prev) => ({ ...prev, [name]: "" }));
    }
  }, []);

  // Hydrate form when fetching data to update/edit an existing post
  const setFormValues = useCallback((postData) => {
    if (postData) {
      setFormData({
        title: postData.title || "",
        subtitle: postData.subtitle || "",
        content: postData.content || "",
      });
    }
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setInvalidInput(null);
    setSuccessMsg("");
  }, []);

  const handleSubmitCheck = (e) => {
    e.preventDefault();
    const validationErrors = validation();
    setInvalidInput(validationErrors);
    
    // Returns true if there are zero error string paths
    return Object.keys(validationErrors).length === 0;
  };

  return {
    formData,
    setFormData,
    setFormValues,
    handleChange,
    invalidInput,
    setInvalidInput,
    successMsg,
    setSuccessMsg,
    resetForm,
    handleSubmitCheck,
    validation,
  };
};