import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  console.log("current user", currentUser);
  if (currentUser) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
