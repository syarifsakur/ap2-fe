import React from "react";
import { AdminLayout } from "../../../layouts";
import { PartForm } from "../../../components/part";

const CreatePart: React.FC = () => {
  return (
    <AdminLayout>
      <PartForm />
    </AdminLayout>
  );
};

export default CreatePart;
