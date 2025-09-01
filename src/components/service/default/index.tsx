import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import { serviceColumns } from "../../../columns";
import {
  fetchService,
  deleteService,
  showNotificationError,
  showNotification,
} from "../../../utils";
import type { Service } from "../../../types/service";

const ServiceDefault: React.FC = () => {
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetchService();
      setData(response.data.response);
    } catch (error) {
      showNotificationError("Gagal mengambil data service!");
      console.error("Error fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteService(id);
      showNotification("Service berhasil dihapus!");
      loadData();
    } catch (error) {
      showNotificationError("Gagal menghapus service!");
      console.error("Error delete service:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Daftar Service</h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          rowKey="uuid"
          dataSource={data}
          columns={serviceColumns({
            current: pagination.current,
            pageSize: pagination.pageSize,
            onDelete: handleDelete,
            onEdit: (uuid: string) => {
              console.log("Edit service:", uuid)
            },
          })}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: data.length,
            onChange: (page, pageSize) =>
              setPagination({ current: page, pageSize }),
          }}
        />
      )}
    </div>
  );
};

export default ServiceDefault;
