import { Navigate, Routes, Route } from "react-router-dom";
import { CreateUnit, Credit, Dashboard, EditUnit, Unit } from "../../pages";
import { getItem } from "../../utils";

const AdminRoute = () => {
  const profile = getItem("profile");
  const isAuthenticated = !!profile;

  if (!isAuthenticated) return <Navigate to="/" />;
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"dashboard"} replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="unit" element={<Unit />} />
      <Route path="credit" element={<Credit />} />
      <Route path="unit/create" element={<CreateUnit />} />
      <Route path="/unit/edit/:id" element={<EditUnit />} />
    </Routes>
  );
};

export default AdminRoute;
