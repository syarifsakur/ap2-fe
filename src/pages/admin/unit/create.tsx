import React from "react";
import FormUnit from "../../../components/unit/form";
import { AdminLayout } from "../../../layouts";
import { message } from "antd";
import { createUnit } from "../../../utils";
import { useNavigate } from "react-router-dom";

const CreateUnit: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await createUnit(formData);
      console.log(formData)
      message.success("Unit berhasil ditambahkan!");
      console.log("Res:", res.data);
      navigate("/admin/unit"); 
    } catch (error: any) {
      console.error(error);
      message.error("Gagal menambahkan unit!");
    }
  };

  return (
    <AdminLayout>
      <FormUnit onSubmit={handleSubmit} />
    </AdminLayout>
  );
};

export default CreateUnit;
