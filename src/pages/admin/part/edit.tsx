import React from "react";
import { PartForm } from "../../../components/part";
import { AdminLayout } from "../../../layouts";

const EditPart: React.FC = () => {
  return (
    <AdminLayout>
      <PartForm />
    </AdminLayout>
  );
};

export default EditPart;
