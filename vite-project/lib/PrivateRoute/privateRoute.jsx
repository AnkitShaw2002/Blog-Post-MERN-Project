import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");


  console.log(token,"token")
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
