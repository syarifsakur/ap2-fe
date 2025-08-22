import React from "react";
import FormUnit from "../../../components/unit/form";
import { AdminLayout } from "../../../layouts";
import { createUnit, showNotification, showNotificationError } from "../../../utils";
import { useNavigate } from "react-router-dom";

const CreateUnit: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await createUnit(formData);
      console.log(formData)
      showNotification("Unit berhasil ditambahkan!");
      console.log("Res:", res.data);
      navigate("/admin/unit"); 
    } catch (error: any) {
      console.error(error);
      showNotificationError("Gagal menambahkan unit!");
    }
  };

  return (
    <AdminLayout>
      <FormUnit onSubmit={handleSubmit} />
    </AdminLayout>
  );
};

export default CreateUnit;
