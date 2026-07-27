import { useState, useCallback } from "react";

const initialState = {
  email: "",
  password: "",
};

export const useLoginForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [successMsg, setSuccessMsg] = useState("");
   const [invalidInput, setInvalidInput] = useState(null)

  const validation = () => {
    let invalidInput = {}

   
    if (!formData.email) {
      invalidInput.email = 'Enter Your Email'
    }
   
    if (!formData.password) {
      invalidInput.password = 'Enter Your Password'
    }
     
    return invalidInput
  }



  const handleChange = useCallback((e) => {
    
    const name = e.target.name;
    const value = e.target.value;

    if (value.length === 0) {
      
      if (name === "email") {
        setFormData(prev => ({ ...prev, email: "" }));
        setInvalidInput(prev => ({ ...prev, email: "Enter Your Email" }));
      }
      
      if (name === "password") {
        setFormData(prev => ({ ...prev, password: "" }));
        setInvalidInput(prev => ({ ...prev, password: "Enter Your Password" }));
      }
      
    }
    else {
      
      if (name === "email") {
        setFormData(prev => ({ ...prev, email: value }));
        setInvalidInput(prev => ({ ...prev, email: "" }));
      }

      
      if (name === "password") {
        setFormData(prev => ({ ...prev, password: value }));
        setInvalidInput(prev => ({ ...prev, password: "" }));
      }

      
    }
    
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setSuccessMsg("");
  }, []);



   const handleClick = (e) => {
    e.preventDefault()
    setInvalidInput(validation())
    console.log("Iput validation",invalidInput)
    console.log("Form data",formData)
  }

  return {
    formData,
    handleChange,
    successMsg,
    invalidInput,
    setInvalidInput,
    setSuccessMsg,
    resetForm,
    handleClick,
    validation
  };
};