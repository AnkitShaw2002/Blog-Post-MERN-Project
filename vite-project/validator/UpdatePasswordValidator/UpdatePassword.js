import * as yup from "yup";

export const updatePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .required("Password is required")
    .min(8),

    newPassword: yup
    .string()
    .required("New password is required")
    .min(8),

  confirm_password: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});