import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../layouts";
import { PartForm } from "../../../components/part";
import {
  fetchPartById,
  updatePart,
  showNotification,
  showNotificationError,
} from "../../../utils";
import { useParams, useNavigate } from "react-router-dom";
import type { Part } from "../../../types/part";

const EditPart: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<Partial<Part>>({});

  useEffect(() => {
    const fetchPart = async () => {
      try {
        if (!id) return;
        const { data } = await fetchPartById(id);
        console.log("data ini : ",data.response)
        setInitialValues({
          uuid: data.response.uuid,
          no_part: data.response.no_part,
          name_part: data.response.name_part,
          size: data.response.size,
          price:data.response.price,
        });
      } catch (error) {
        showNotificationError("Gagal mengambil data part!");
      }
    };
    fetchPart();
  }, [id]);

  const handleUpdate = async (values: Part) => {
    if (!id) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("no_part", values.no_part);
      formData.append("name_part", values.name_part);
      formData.append("size", values.size);
      formData.append("price", values.price.toString());

      if (values.file) {
        formData.append("file", values.file);
      }

      await updatePart(id, formData);
      showNotification("Part berhasil diperbarui!");
      navigate("/admin/part");
    } catch (error) {
      showNotificationError("Gagal memperbarui part!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <PartForm
        mode="edit"
        initialValues={initialValues}
        onSubmit={handleUpdate}
        loading={loading}
      />
    </AdminLayout>
  );
};

export default EditPart;
