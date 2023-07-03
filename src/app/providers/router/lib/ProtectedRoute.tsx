import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../../authRouter/ui/AuthContext";

const ProtectedRoute = ({ children }: any) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <div className="h-full">{children}</div>;
};

export default ProtectedRoute;
