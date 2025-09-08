import { Navigate, Routes, Route } from "react-router-dom";
import {
  ChangePassword,
  CreatePart,
  CreateUnit,
  Credit,
  Dashboard,
  EditPart,
  EditUnit,
  Part,
  Service,
  Unit,
} from "../../pages";
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
      <Route path="/service" element={<Service />} />
      <Route path="/part" element={<Part />} />
      <Route path="/part/create" element={<CreatePart />} />
      <Route path="/part/edit/:id" element={<EditPart />} />
      <Route path="/change-password" element={<ChangePassword/>}/>
    </Routes>
  );
};

export default AdminRoute;
