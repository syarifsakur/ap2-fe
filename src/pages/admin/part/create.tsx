import React, { useState } from "react";
import { AdminLayout } from "../../../layouts";
import { PartForm } from "../../../components/part";
import { createPart, showNotification, showNotificationError } from "../../../utils";
import { useNavigate } from "react-router-dom";
import type { Part } from "../../../types/part";

const CreatePart: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (values: Part) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("no_part", values.no_part);
      formData.append("name_part", values.name_part);
      formData.append("size", values.size);
      formData.append("price", values.price.toString());
      if (values.file) formData.append("file", values.file);

      await createPart(formData);
      showNotification("Part berhasil ditambahkan!");
      navigate("/admin/part");
    } catch (error) {
      showNotificationError("Gagal menambahkan part!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <PartForm mode="create" onSubmit={handleCreate} loading={loading} />
    </AdminLayout>
  );
};

export default CreatePart;
