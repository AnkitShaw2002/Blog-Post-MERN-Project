import { useState, useCallback } from "react";

const initialState = {
  name: "",
  email: "",
  address: "",
  password: "",
  confirmPassword: "",
  imagePath: ""
};

export const useRegisterForm = () => {
  const [formData, setFormData] = useState(initialState);

  const [successMsg, setSuccessMsg] = useState("");

  const [invalidInput, setInvalidInput] = useState(null)

  const validation = () => {
    let invalidInput = {}

    if (!formData.name) {
      invalidInput.name = 'Enter Your Name'
    }
    if (!formData.email) {
      invalidInput.email = 'Enter Your Email'
    }
    if (!formData.address) {
      invalidInput.address = 'Enter Your Address'
    }
    if (!formData.password) {
      invalidInput.password = 'Enter Your Password'
    }
    if (!formData.confirmPassword) {
      invalidInput.confirmPassword = 'Enter Your Confrim Password'
    }
    if (!formData.imagePath) {
      invalidInput.imagePath = 'Enter Your Profile Image'
    }
    return invalidInput
  }

  const handleChange = useCallback((e) => {
    // Fall back to ID if the name attribute is empty or missing
    const name = e.target.name || e.target.id;
    const value = e.target.files ? e.target.files[0] : e.target.value;

    // A file object is never considered empty if it exists
    const isEmpty = value instanceof File ? !value : !value || value.length === 0;

    if (isEmpty) {
      if (name === "name") {
        setFormData(prev => ({ ...prev, name: "" }));
        setInvalidInput(prev => ({ ...prev, name: "Enter Your Name" }));
      }
      if (name === "email") {
        setFormData(prev => ({ ...prev, email: "" }));
        setInvalidInput(prev => ({ ...prev, email: "Enter Your Email" }));
      }
      if (name === "address") {
        setFormData(prev => ({ ...prev, address: "" }));
        setInvalidInput(prev => ({ ...prev, address: "Enter Your Address" }));
      }
      if (name === "password") {
        setFormData(prev => ({ ...prev, password: "" }));
        setInvalidInput(prev => ({ ...prev, password: "Enter Your Password" }));
      }
      if (name === "confirmPassword") {
        setFormData(prev => ({ ...prev, confirmPassword: "" }));
        setInvalidInput(prev => ({ ...prev, confirmPassword: "Enter Your confirmPassword" }));
      }
      if (name === "profileImage" || name === "imagePath") {
        setFormData(prev => ({ ...prev, imagePath: "" }));
        setInvalidInput(prev => ({ ...prev, imagePath: "Enter Your Profile Image" }));
      }
    }
    else {
      if (name === "name") {
        setFormData(prev => ({ ...prev, name: value }));
        setInvalidInput(prev => ({ ...prev, name: "" }));
      }
      if (name === "email") {
        setFormData(prev => ({ ...prev, email: value }));
        setInvalidInput(prev => ({ ...prev, email: "" }));
      }

      if (name === "address") {
        setFormData(prev => ({ ...prev, address: value }));
        setInvalidInput(prev => ({ ...prev, address: "" }));
      }
      if (name === "password") {
        setFormData(prev => ({ ...prev, password: value }));
        setInvalidInput(prev => ({ ...prev, password: "" }));
      }

      if (name === "confirmPassword") {
        setFormData(prev => ({ ...prev, confirmPassword: value }));
        setInvalidInput(prev => ({ ...prev, confirmPassword: "" }));
      }

      if (name === "profileImage" || name === "imagePath") {
        setFormData(prev => ({ ...prev, imagePath: value }));
        setInvalidInput(prev => ({ ...prev, imagePath: "" }));
      }
    }
  }, []);




  const resetForm = useCallback(() => {
    setFormData(initialState);
    setSuccessMsg("");
  }, []);


  const handleClick = (e) => {
    e.preventDefault()
    const errors = validation();
    setInvalidInput(errors);
    console.log(errors);
    console.log(invalidInput)
    console.log(formData)

  }





  return {
    formData,
    handleChange,
    successMsg,
    setSuccessMsg,
    resetForm,
    invalidInput,
    setInvalidInput,
    handleClick,
    validation
  };
};