import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../../pages/auth";
import { getItem } from "../../utils";

const AuthRoute: React.FC = () => {
  const profile = getItem("profile");
  const isAuthenticated = !!profile;

  if (isAuthenticated) return <Navigate to="/admin/dashboard" />;
  return (
    <Routes>
      <Route index element={<Navigate to={"login"} replace />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default AuthRoute;
